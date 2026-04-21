import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGO_DETAILS: str
    DATABASE_NAME: str
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()

async def check_users():
    client = AsyncIOMotorClient(settings.MONGO_DETAILS)
    db = client[settings.DATABASE_NAME]
    users = await db["users"].find().to_list(100)
    print(f"Total users found: {len(users)}")
    for user in users:
        print(f"Email: {user.get('email')}, Role: {user.get('role')}, Is Active: {user.get('is_active')}")
    client.close()

if __name__ == "__main__":
    asyncio.run(check_users())
