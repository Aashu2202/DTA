from motor.motor_asyncio import AsyncIOMotorClient
from app.repositories.base import CRUDBase
from app.schemas.chat import ChatMessageCreate, ChatMessageInDB
from app.models.chat import ChatMessage
from typing import List

class CRUDChat(CRUDBase[ChatMessage, ChatMessageCreate, ChatMessageInDB]):
    """
    CRUD operations for Chat messages with production-grade features.
    Supports conversation history retrieval for context-aware responses.
    """
    
    async def create(self, db: AsyncIOMotorClient, *, obj_in: ChatMessageCreate) -> ChatMessageInDB:
        """Create a new chat message."""
        db_obj = ChatMessageInDB(
            user_id=obj_in.user_id,
            message=obj_in.message,
            is_user=obj_in.is_user,
            purpose=obj_in.purpose,
        )
        collection = db[self.collection_name]
        result = await collection.insert_one(db_obj.model_dump(by_alias=True, exclude={"id"}))
        document = await collection.find_one({"_id": result.inserted_id})
        document["_id"] = str(document["_id"])
        return ChatMessageInDB(**document)

    async def get_by_user(
        self,
        db: AsyncIOMotorClient,
        *,
        user_id: str,
        skip: int = 0,
        limit: int = 50
    ) -> List[ChatMessageInDB]:
        """
        Retrieve chat messages for a specific user.
        
        PRODUCTION FEATURE: Used to fetch conversation history for context awareness.
        Messages are ordered by creation time to maintain conversation flow.
        
        Args:
            db: Database connection
            user_id: User ID to fetch messages for
            skip: Number of messages to skip (pagination)
            limit: Maximum number of messages to return
        
        Returns:
            List of ChatMessageInDB objects ordered by creation time
        """
        collection = db[self.collection_name]
        cursor = collection.find(
            {"user_id": user_id}
        ).sort("created_at", 1).skip(skip).limit(limit)
        
        documents = await cursor.to_list(length=limit)
        return [
            ChatMessageInDB(**{**doc, "_id": str(doc["_id"])})
            for doc in documents
        ]

chat = CRUDChat(ChatMessage, "chats")
