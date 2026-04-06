import asyncio
from unittest.mock import MagicMock, patch
from app.core.config import settings
from app.api.v1.endpoints.contacts import create_contact
from app.schemas.contact import ContactCreate
from fastapi import BackgroundTasks

async def test_emails():
    print("Testing FOUNDER_EMAILS logic...")
    
    # 1. Check config property
    print(f"Current FOUNDER_EMAILS in settings: {settings.FOUNDER_EMAILS}")
    print(f"Computed recipient list: {settings.founder_email_list}")
    
    # Mock database and repository
    mock_db = MagicMock()
    mock_contact = MagicMock()
    mock_contact.name = "Test User"
    mock_contact.email = "test@example.com"
    mock_contact.company_name = "Test Co"
    mock_contact.phone = "1234567890"
    mock_contact.reason = "Test Reason"
    mock_contact.message = "Test Message"
    
    contact_in = ContactCreate(
        name="Test User",
        email="test@example.com",
        reason="Test Reason",
        message="Test Message",
        company_name="Test Co",
        phone="1234567890"
    )
    
    background_tasks = BackgroundTasks()
    
    with patch("app.repositories.contact_repo.contact.create", return_value=mock_contact):
        with patch("app.services.email_service.send_email") as mock_send:
            await create_contact(
                db=mock_db,
                contact_in=contact_in,
                background_tasks=background_tasks
            )
            
            # Execute background tasks
            for task in background_tasks.tasks:
                print(f"Executing task: {task.func.__name__} with args: {task.args}, kwargs: {task.kwargs}")
                # We don't actually run it because it's a mock, 
                # but we can check if they were added
            
            print(f"Number of emails queued: {len(background_tasks.tasks)}")
            
            recipients = settings.founder_email_list
            for recipient in recipients:
                 # Check if any task has this recipient
                 found = any(t.kwargs.get('to_email') == recipient for t in background_tasks.tasks)
                 print(f"Email for {recipient} queued: {found}")

if __name__ == "__main__":
    asyncio.run(test_emails())
