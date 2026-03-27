from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId
from enum import Enum

class FAQStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"

class FAQ(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    question: str
    answer: str
    order: int = 0
    status: FAQStatus = FAQStatus.ACTIVE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "question": "How do I get started?",
                "answer": "Click the 'Get Started' button or contact us through the form.",
                "order": 1,
                "status": "Active"
            }
        }
