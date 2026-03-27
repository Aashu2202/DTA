from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.models.service import ServiceStatus, ServiceDetailContent

class ServiceBase(BaseModel):
    title: str
    slug: str
    icon_name: Optional[str] = None
    shortDesc: str
    fullDesc: Optional[str] = None
    image: Optional[str] = None
    banner: Optional[str] = None
    benefits: List[str] = []
    detailContent: Optional[ServiceDetailContent] = None
    status: Optional[ServiceStatus] = ServiceStatus.ACTIVE

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    icon_name: Optional[str] = None
    shortDesc: Optional[str] = None
    fullDesc: Optional[str] = None
    image: Optional[str] = None
    banner: Optional[str] = None
    benefits: Optional[List[str]] = None
    detailContent: Optional[ServiceDetailContent] = None
    status: Optional[ServiceStatus] = None

class ServiceResponse(ServiceBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
