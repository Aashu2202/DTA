# app/schemas/job_application.py

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class JobApplicationCreate(BaseModel):
    """
    Schema representing the expected fields when creating a job application.
    Note: The actual endpoint uses Form() fields with multipart/form-data,
    so this schema is used primarily for documentation and type reference.
    """
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


class JobApplicationResponse(BaseModel):
    """Response schema after a successful application submission."""
    success: bool
    message: str
    application_id: str
