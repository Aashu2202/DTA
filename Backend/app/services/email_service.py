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
    logger.info(f"[DIAGNOSTIC] Entering send_email function for recipient: {to_email}")
    config = _get_smtp_config()

    if not config:
        logger.warning(
            "[DIAGNOSTIC] SMTP not configured. Logging instead of sending.\n"
            f"  TO:      {to_email}\n"
            f"  SUBJECT: {subject}"
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

        logger.info(f"[DIAGNOSTIC] Connecting to SMTP host: {config['host']}:{config['port']}")
        with smtplib.SMTP(config["host"], config["port"]) as server:
            server.ehlo()
            server.starttls()
            logger.info(f"[DIAGNOSTIC] Attempting SMTP Login for user: {config['user']}")
            server.login(config["user"], config["password"])
            logger.info(f"[DIAGNOSTIC] SMTP Login SUCCESS. Sending mail to: {to_email}")
            server.sendmail(config["from"], to_email, msg.as_string())
            logger.info(f"[DIAGNOSTIC] smtplib.sendmail completed for recipient: {to_email}")

        logger.info(f"Email sent successfully to {to_email} — Subject: {subject}")
        return True

    except Exception as exc:
        # Non-blocking: log the error but do not raise so the caller can proceed
        logger.error(f"[DIAGNOSTIC] EXCEPTION in send_email for {to_email}: {exc}")
        return False
