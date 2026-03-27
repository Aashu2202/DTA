from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.job import JobStatus

class JobCreate(BaseModel):
    title: str
    department: str
    location: str
    experience: str
    employment_type: str
    description: str
    requirements: List[str] = []
    status: JobStatus = JobStatus.ACTIVE
    apply_link_or_email: str

class JobUpdate(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    experience: Optional[str] = None
    employment_type: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[List[str]] = None
    status: Optional[JobStatus] = None
    apply_link_or_email: Optional[str] = None

class JobResponse(JobCreate):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
