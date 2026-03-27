# app/api/v1/endpoints/careers.py

from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from typing import Optional

from app.services.career_service import submit_job_application
from app.schemas.job_application import JobApplicationResponse
from app.utils.logger import logger

router = APIRouter()

VALID_MIME_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


@router.post("/apply", response_model=JobApplicationResponse, status_code=200)
async def apply_for_job(
    job_title: str = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    experience: str = Form(...),
    current_role: Optional[str] = Form(None),
    skills: Optional[str] = Form(None),
    linkedin_url: Optional[str] = Form(None),
    portfolio_url: Optional[str] = Form(None),
    cover_letter: Optional[str] = Form(None),
    resume: Optional[UploadFile] = File(None),
):
    """
    POST /api/v1/careers/apply
    Accepts multipart/form-data with applicant details and an optional resume file.
    """

    # ── Field validation ──────────────────────────────────────────────────────
    errors = {}
    if not job_title.strip():
        errors["job_title"] = "Job title is required."
    if not first_name.strip():
        errors["first_name"] = "First name is required."
    if not last_name.strip():
        errors["last_name"] = "Last name is required."
    if not email.strip():
        errors["email"] = "Email is required."
    if not phone.strip():
        errors["phone"] = "Phone number is required."
    if not experience.strip():
        errors["experience"] = "Years of experience is required."

    # Basic email format check
    import re
    if email and not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email):
        errors["email"] = "Please enter a valid email address."

    # Phone validation: strictly 10-digit Indian mobile number
    if phone and not re.fullmatch(r"[6-9]\d{9}", phone.strip()):
        errors["phone"] = "Please enter a valid 10-digit Indian mobile number."

    if errors:
        raise HTTPException(
            status_code=422,
            detail={"message": "Validation failed.", "errors": errors},
        )

    # ── Resume validation ─────────────────────────────────────────────────────
    if resume and resume.filename:
        if resume.content_type not in VALID_MIME_TYPES:
            raise HTTPException(
                status_code=422,
                detail={
                    "message": "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
                    "errors": {"resume": "Only PDF, DOC, and DOCX files are allowed."},
                },
            )

    # format phone with +91 prefix
    formatted_phone = f"+91{phone.strip()}"

    try:
        application_id = await submit_job_application(
            job_title=job_title.strip(),
            first_name=first_name.strip(),
            last_name=last_name.strip(),
            email=email.strip(),
            phone=formatted_phone,
            experience=experience.strip(),
            current_role=current_role,
            skills=skills,
            linkedin_url=linkedin_url,
            portfolio_url=portfolio_url,
            cover_letter=cover_letter,
            resume=resume,
        )
    except ValueError as exc:
        # Raised by save_resume_file for size violations
        raise HTTPException(
            status_code=422,
            detail={"message": str(exc), "errors": {"resume": str(exc)}},
        )
    except Exception as exc:
        logger.error(f"Error submitting job application: {exc}")
        raise HTTPException(
            status_code=500,
            detail={"message": "Something went wrong. Please try again later."},
        )

    return JobApplicationResponse(
        success=True,
        message="Application submitted successfully.",
        application_id=application_id,
    )
