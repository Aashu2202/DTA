from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId
from enum import Enum

class TestimonialStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"

class Testimonial(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    name: str
    role: str
    company: str
    quote: str
    rating: Optional[float] = 5.0
    image: Optional[str] = None
    order: int = 0
    status: TestimonialStatus = TestimonialStatus.ACTIVE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "name": "Jane Doe",
                "role": "CTO",
                "company": "TechCorp",
                "quote": "D-Table transformed our data pipeline.",
                "rating": 5.0,
                "order": 1,
                "status": "Active"
            }
        }
