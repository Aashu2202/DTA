from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from app.repositories.base import CRUDBase
from app.schemas.user import UserCreate, UserInDB
from app.core.security import get_password_hash
from app.models.user import User
from pydantic import ValidationError
from app.utils.logger import logger

class CRUDUser(CRUDBase[User, UserCreate, UserInDB]):
    async def get_by_email(self, db: AsyncIOMotorClient, *, email: str) -> Optional[UserInDB]:
        collection = db[self.collection_name]
        document = await collection.find_one({"email": email})
        if document:
            document["_id"] = str(document["_id"])
            try:
                return UserInDB(**document)
            except ValidationError as e:
                logger.error(f"Data Integrity Error for user {email}: {e}")
                return None
        return None

    async def create(self, db: AsyncIOMotorClient, *, obj_in: UserCreate) -> UserInDB:
        hashed_password = get_password_hash(obj_in.password)
        db_obj = UserInDB(
            email=obj_in.email,
            hashed_password=hashed_password,
            full_name=obj_in.full_name,
            role="User"
        )
        collection = db[self.collection_name]
        result = await collection.insert_one(db_obj.model_dump(by_alias=True, exclude={"id"}))
        document = await collection.find_one({"_id": result.inserted_id})
        document["_id"] = str(document["_id"])
        try:
            return UserInDB(**document)
        except ValidationError as e:
            logger.error(f"Data Integrity Error for user {obj_in.email}: {e}")
            return None

user = CRUDUser(UserInDB, "users")
