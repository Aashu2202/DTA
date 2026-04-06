from fastapi import APIRouter, Depends, BackgroundTasks
from app.schemas.contact import ContactCreate, ContactResponse
from app.repositories import contact_repo
from app.db.mongodb import get_database
from app.services import email_service
from app.core.config import settings
from typing import Any

router = APIRouter()

@router.post("/", response_model=ContactResponse)
async def create_contact(
    *,
    db=Depends(get_database),
    contact_in: ContactCreate,
    background_tasks: BackgroundTasks
) -> Any:
    """
    Submit a contact form.
    """
    # 1. Save to DB first
    contact = await contact_repo.contact.create(db, obj_in=contact_in)
    
    # 2. Send emails to founders (handles multiple recipients)
    from app.utils.logger import logger
    recipients = settings.founder_email_list
    logger.info(f"[DIAGNOSTIC] Contact endpoint started. Found {len(recipients)} recipients in settings.")
    
    if recipients:
        subject = f"New Contact Us Inquiry from {contact_in.name}"
        html_body = f"""
        <html>
            <body>
                <h2>New Contact Inquiry</h2>
                <p><strong>Name:</strong> {contact_in.name}</p>
                <p><strong>Email:</strong> {contact_in.email}</p>
                <p><strong>Company Name:</strong> {contact_in.company_name}</p>
                <p><strong>Location:</strong> {contact_in.location}</p>
                <p><strong>Phone:</strong> {contact_in.phone or 'N/A'}</p>
                <p><strong>Reason:</strong> {contact_in.reason}</p>
                <p><strong>Message:</strong><br>{contact_in.message}</p>
            </body>
        </html>
        """
        # Adding individual background tasks for each recipient for reliability
        for i, recipient in enumerate(recipients):
            logger.info(f"[DIAGNOSTIC] Queueing background task #{i+1} for recipient: {recipient}")
            background_tasks.add_task(
                email_service.send_email,
                to_email=recipient,
                subject=subject,
                html_body=html_body
            )
        logger.info(f"[DIAGNOSTIC] All background tasks ({len(recipients)}) have been queued successfully.")

    return contact
