from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.models.testimonial import TestimonialStatus

class TestimonialBase(BaseModel):
    name: str
    role: str
    company: str
    quote: str
    rating: Optional[float] = 5.0
    image: Optional[str] = None
    order: Optional[int] = 0
    status: Optional[TestimonialStatus] = TestimonialStatus.ACTIVE

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    company: Optional[str] = None
    quote: Optional[str] = None
    rating: Optional[float] = None
    image: Optional[str] = None
    order: Optional[int] = None
    status: Optional[TestimonialStatus] = None

class TestimonialResponse(TestimonialBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
