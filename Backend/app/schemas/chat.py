from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from bson import ObjectId

class ChatMessageCreate(BaseModel):
    user_id: str | None = None
    message: str
    is_user: bool = True

class ChatMessageInDB(ChatMessageCreate):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = ConfigDict(populate_by_name=True)

class ChatMessageResponse(ChatMessageCreate):
    id: str = Field(alias="_id")
    created_at: datetime
    
    model_config = ConfigDict(populate_by_name=True)
