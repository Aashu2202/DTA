# app/services/career_service.py

import os
import re
import asyncio
from datetime import datetime, timezone, timedelta
from typing import Optional

import aiofiles
from fastapi import UploadFile

from app.repositories.job_application_repository import create_application
from app.services.email_service import send_email
from app.utils.logger import logger


# Path relative to the Backend/ working directory (where run.py lives)
UPLOAD_DIR = os.path.join("uploads", "resumes")


def _sanitize_filename(name: str) -> str:
    """Strip dangerous characters from a filename, preserving extension."""
    # Keep only alphanumeric, dots, underscores, hyphens
    name = os.path.basename(name)  # prevent path traversal
    name = re.sub(r"[^\w.\-]", "_", name)
    return name


async def save_resume_file(upload: UploadFile) -> str:
    """
    Reads the uploaded file, validates size, writes it to UPLOAD_DIR.
    Returns the relative path where the file was saved.
    Raises ValueError if the file exceeds 10 MB.
    """
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    contents = await upload.read()
    max_size = 10 * 1024 * 1024  # 10 MB
    if len(contents) > max_size:
        raise ValueError("Resume file exceeds the maximum allowed size of 10 MB.")

    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    safe_name = _sanitize_filename(upload.filename or "resume")
    filename = f"{timestamp}_{safe_name}"
    dest = os.path.join(UPLOAD_DIR, filename)

    async with aiofiles.open(dest, "wb") as f:
        await f.write(contents)

    logger.info(f"Resume saved to: {dest}")
    return dest

def _build_hr_email_html(data: dict, resume_path: Optional[str]) -> str:
    """Renders a nicely formatted HTML table with the applicant's details."""
    

    created_at = data.get("created_at", datetime.utcnow())

    # Treat naive datetime as UTC
    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)

    # Convert UTC → IST
    ist = timezone(timedelta(hours=5, minutes=30))
    submitted_at_ist = created_at.astimezone(ist).strftime("%d %b %Y, %I:%M %p IST")

    rows = [
        ("Job Title", data.get("job_title", "")),
        ("Name", f"{data.get('first_name', '')} {data.get('last_name', '')}"),
        ("Email", data.get("email", "")),
        ("Phone", data.get("phone", "")),
        ("Experience", data.get("experience", "")),
        ("Current Role", data.get("current_role") or "—"),
        ("Skills", data.get("skills") or "—"),
        ("LinkedIn", data.get("linkedin_url") or "—"),
        ("Portfolio / GitHub", data.get("portfolio_url") or "—"),
        ("Cover Letter", data.get("cover_letter") or "—"),
        ("Resume Path", resume_path or "Not uploaded"),
        ("Submitted At", submitted_at_ist),
    ]

    table_rows = "".join(
        f"<tr><td style='padding:8px 12px;font-weight:bold;background:#f3f4f6;border:1px solid #e5e7eb'>{label}</td>"
        f"<td style='padding:8px 12px;border:1px solid #e5e7eb'>{value}</td></tr>"
        for label, value in rows
    )

    return f"""
    <html>
    <body style="font-family:Arial,sans-serif;color:#111827;">
      <h2 style="color:#4f46e5;">New Job Application Received</h2>
      <p>A new application has been submitted on the D-Table Analytics careers portal.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">
        {table_rows}
      </table>
      <p style="margin-top:24px;color:#6b7280;font-size:12px;">
        This is an automated notification from the D-Table Analytics Careers Portal.
      </p>
    </body>
    </html>
    """

async def submit_job_application(
    job_title: str,
    first_name: str,
    last_name: str,
    email: str,
    phone: str,
    experience: str,
    current_role: Optional[str],
    skills: Optional[str],
    linkedin_url: Optional[str],
    portfolio_url: Optional[str],
    cover_letter: Optional[str],
    resume: Optional[UploadFile],
) -> str:
    """
    Core business logic:
      1. Save resume file (if provided).
      2. Insert application document in MongoDB.
      3. Send HR notification email (non-blocking).
    Returns the application_id string.
    """
    # 1. Save resume
    resume_path = None
    if resume and resume.filename:
        resume_path = await save_resume_file(resume)

    # 2. Build document
    now = datetime.utcnow()
    doc = {
        "job_title": job_title,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": phone,
        "experience": experience,
        "current_role": current_role or None,
        "skills": skills or None,
        "linkedin_url": linkedin_url or None,
        "portfolio_url": portfolio_url or None,
        "cover_letter": cover_letter or None,
        "resume_path": resume_path,
        "status": "new",
        "created_at": now,
    }

    # 3. Insert into MongoDB
    application_id = await create_application(doc)
    doc["created_at"] = now  # keep datetime for email rendering

    # 4. Send HR email (non-blocking — schedule as background task)
    try:
        from app.core.config import settings
        hr_email = getattr(settings, "HR_EMAIL", None) or "hr@dtableanalytics.com"
    except Exception:
        hr_email = "hr@dtableanalytics.com"

    subject = f"New Job Application – {job_title} – {first_name} {last_name}"
    html_body = _build_hr_email_html(doc, resume_path)

    # Fire and forget — failure is logged inside send_email, not raised
    asyncio.ensure_future(
        send_email(hr_email, subject, html_body, attachment_path=resume_path)
    )

    return application_id
