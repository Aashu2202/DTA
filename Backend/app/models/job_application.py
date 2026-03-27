# app/models/job_application.py

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId


class JobApplication(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    job_title: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    experience: str
    current_role: Optional[str] = None
    skills: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    cover_letter: Optional[str] = None
    resume_path: Optional[str] = None
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "job_title": "Python Developer",
                "first_name": "John",
                "last_name": "Doe",
                "email": "john@example.com",
                "phone": "9876543210",
                "experience": "1-3",
            }
        }
