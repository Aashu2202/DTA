from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from enum import Enum

class JobStatus(str, Enum):
    ACTIVE = "Active"
    CLOSED = "Closed"

class Job(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    title: str
    department: str
    location: str
    experience: str
    employment_type: str
    description: str
    requirements: List[str] = []
    status: JobStatus = JobStatus.ACTIVE
    apply_link_or_email: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "title": "Data Scientist",
                "department": "Engineering",
                "location": "Remote",
                "experience": "3+ Years",
                "employment_type": "Full-Time",
                "description": "We are looking for a Data Scientist...",
                "requirements": ["Python", "Machine Learning"],
                "status": "Active",
                "apply_link_or_email": "hr@example.com"
            }
        }
