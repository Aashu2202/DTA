from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    company_name: str
    location: str
    phone: Optional[str] = None
    reason: str
    message: str

class ContactCreate(ContactBase):
    pass

class ContactInDB(ContactBase):
    id: str = Field(alias="_id")
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactResponse(ContactBase):
    id: str = Field(alias="_id")
    is_read: bool
    created_at: datetime

    model_config = {"populate_by_name": True}
