# app/services/email_service.py

import smtplib
from email.mime.text import MIMEText
from app.utils.logger import logger
# from app.core.config import settings

async def send_email(to_email: str, subject: str, html_body: str) -> bool:
    """
    Sends an email using standard SMTP.
    """
    # TODO: Implement actual SMTP integration here
    logger.info(f"Mock sending email to {to_email} with subject: {subject}")
    return True
