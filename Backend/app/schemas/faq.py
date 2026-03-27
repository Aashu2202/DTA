from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.models.faq import FAQStatus

class FAQBase(BaseModel):
    question: str
    answer: str
    order: Optional[int] = 0
    status: Optional[FAQStatus] = FAQStatus.ACTIVE

class FAQCreate(FAQBase):
    pass

class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    order: Optional[int] = None
    status: Optional[FAQStatus] = None

class FAQResponse(FAQBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
