from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class User(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    email: EmailStr
    full_name: str
    role: str
    hashed_password: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "email": "janedoe@example.com",
                "full_name": "Jane Doe",
                "role": "User"
            }
        }
