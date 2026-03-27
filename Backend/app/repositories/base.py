from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

ModelType = TypeVar("ModelType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType], collection_name: str):
        self.model = model
        self.collection_name = collection_name

    async def get(self, db: AsyncIOMotorClient, id: str) -> Optional[ModelType]:
        collection = db[self.collection_name]
        document = await collection.find_one({"_id": ObjectId(id)})
        if document:
            document["_id"] = str(document["_id"])
            return self.model(**document)
        return None

    async def get_multi(
        self, db: AsyncIOMotorClient, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        collection = db[self.collection_name]
        cursor = collection.find().skip(skip).limit(limit)
        documents = await cursor.to_list(length=limit)
        return [self.model(**{**doc, "_id": str(doc["_id"])}) for doc in documents]

    async def create(self, db: AsyncIOMotorClient, *, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        collection = db[self.collection_name]
        result = await collection.insert_one(obj_in_data)
        document = await collection.find_one({"_id": result.inserted_id})
        document["_id"] = str(document["_id"])
        return self.model(**document)

    async def update(
        self, db: AsyncIOMotorClient, *, db_obj: ModelType, obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        
        collection = db[self.collection_name]
        await collection.update_one(
            {"_id": ObjectId(db_obj.id)}, {"$set": update_data}
        )
        
        updated_doc = await collection.find_one({"_id": ObjectId(db_obj.id)})
        updated_doc["_id"] = str(updated_doc["_id"])
        return self.model(**updated_doc)

    async def remove(self, db: AsyncIOMotorClient, *, id: str) -> Optional[ModelType]:
        collection = db[self.collection_name]
        document = await collection.find_one({"_id": ObjectId(id)})
        if document:
            await collection.delete_one({"_id": ObjectId(id)})
            document["_id"] = str(document["_id"])
            return self.model(**document)
        return None
