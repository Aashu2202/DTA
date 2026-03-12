from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId

class ChatMessage(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    user_id: str | None = None  # Or a session ID if not logged in
    message: str
    is_user: bool = True  # True if from the user, False if from the AI bot
    purpose: str | None = None  # business/hiring if provided by user
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
