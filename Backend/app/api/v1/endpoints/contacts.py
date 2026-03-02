from fastapi import APIRouter, Depends
from app.schemas.contact import ContactCreate, ContactResponse
from app.repositories import contact_repo
from app.db.mongodb import get_database
from typing import Any

router = APIRouter()

@router.post("/", response_model=ContactResponse)
async def create_contact(
    *,
    db=Depends(get_database),
    contact_in: ContactCreate
) -> Any:
    """
    Submit a contact form.
    """
    contact = await contact_repo.contact.create(db, obj_in=contact_in)
    return contact
