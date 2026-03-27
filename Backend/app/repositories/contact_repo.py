from motor.motor_asyncio import AsyncIOMotorClient
from app.repositories.base import CRUDBase
from app.schemas.contact import ContactCreate, ContactInDB
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId

class ContactModel(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    name: str
    email: str
    phone: str | None = None
    reason: str
    message: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CRUDContact(CRUDBase[ContactModel, ContactCreate, ContactInDB]):
    async def create(self, db: AsyncIOMotorClient, *, obj_in: ContactCreate) -> ContactInDB:
        db_obj = ContactModel(
            name=obj_in.name,
            email=obj_in.email,
            phone=obj_in.phone,
            reason=obj_in.reason,
            message=obj_in.message,
        )
        collection = db[self.collection_name]
        result = await collection.insert_one(db_obj.model_dump(by_alias=True, exclude={"id"}))
        document = await collection.find_one({"_id": result.inserted_id})
        document["_id"] = str(document["_id"])
        return ContactInDB(**document)

contact = CRUDContact(ContactModel, "contacts")
