# app/services/email_service.py

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from app.utils.logger import logger


def _get_smtp_config():
    """Read SMTP config from settings. Returns None if not configured."""
    try:
        from app.core.config import settings
        host = getattr(settings, "SMTP_HOST", None)
        port = getattr(settings, "SMTP_PORT", 587)
        user = getattr(settings, "SMTP_USER", None)
        password = getattr(settings, "SMTP_PASSWORD", None)
        from_addr = getattr(settings, "SMTP_FROM", None)

        if not host or not user or not password or not from_addr:
            return None
        return {"host": host, "port": port, "user": user, "password": password, "from": from_addr}
    except Exception:
        return None


async def send_email(
    to_email: str,
    subject: str,
    html_body: str,
    attachment_path: str = None,
) -> bool:
    """
    Sends an HTML email via SMTP.
    - If SMTP credentials are not configured, logs the email content instead (non-failing).
    - attachment_path is optional; if provided the file will be attached to the email.
    - Email sending is non-blocking: any SMTP error is logged but not re-raised.
    """
    config = _get_smtp_config()

    if not config:
        logger.warning(
            "SMTP not configured. Logging email instead of sending.\n"
            f"  TO:      {to_email}\n"
            f"  SUBJECT: {subject}\n"
            f"  BODY:    {html_body}\n"
            f"  ATTACH:  {attachment_path}"
        )
        return False

    try:
        msg = MIMEMultipart("mixed")
        msg["From"] = config["from"]
        msg["To"] = to_email
        msg["Subject"] = subject

        msg.attach(MIMEText(html_body, "html"))

        # Attach file if provided and it exists on disk
        if attachment_path and os.path.exists(attachment_path):
            filename = os.path.basename(attachment_path)
            with open(attachment_path, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f'attachment; filename="{filename}"')
            msg.attach(part)

        with smtplib.SMTP(config["host"], config["port"]) as server:
            server.ehlo()
            server.starttls()
            server.login(config["user"], config["password"])
            server.sendmail(config["from"], to_email, msg.as_string())

        logger.info(f"Email sent successfully to {to_email} — Subject: {subject}")
        return True

    except Exception as exc:
        # Non-blocking: log the error but do not raise so the caller can proceed
        logger.error(f"Failed to send email to {to_email}: {exc}")
        return False
