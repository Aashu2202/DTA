from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.utils.logger import logger

class Database:
    client: AsyncIOMotorClient = None

db = Database()

def get_database():
    return db.client[settings.DATABASE_NAME]

async def connect_to_mongo():
    logger.info("Connecting to MongoDB...")
    db.client = AsyncIOMotorClient(settings.MONGO_DETAILS)
    logger.info("Connected to MongoDB!")

async def close_mongo_connection():
    logger.info("Closing MongoDB connection...")
    db.client.close()
    logger.info("MongoDB connection closed!")
