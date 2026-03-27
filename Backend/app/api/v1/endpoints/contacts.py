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
    
    # 2. Send email to founder
    if settings.FOUNDER_EMAIL:
        subject = f"New Contact Us Inquiry from {contact_in.name}"
        html_body = f"""
        <html>
            <body>
                <h2>New Contact Inquiry</h2>
                <p><strong>Name:</strong> {contact_in.name}</p>
                <p><strong>Email:</strong> {contact_in.email}</p>
                <p><strong>Company Name:</strong> {contact_in.company_name or 'N/A'}</p>
                <p><strong>Phone:</strong> {contact_in.phone or 'N/A'}</p>
                <p><strong>Reason:</strong> {contact_in.reason}</p>
                <p><strong>Message:</strong><br>{contact_in.message}</p>
            </body>
        </html>
        """
        # Using background tasks ensures the API response is not delayed and failures do not crash the request
        background_tasks.add_task(
            email_service.send_email,
            to_email=settings.FOUNDER_EMAIL,
            subject=subject,
            html_body=html_body
        )

    return contact
