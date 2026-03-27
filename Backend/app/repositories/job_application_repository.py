# app/repositories/job_application_repository.py

from app.db.mongodb import get_database
from app.utils.logger import logger


async def create_application(data: dict) -> str:
    """
    Inserts a job application document into the 'job_applications' collection.
    Returns the string representation of the inserted document's _id.
    """
    db = get_database()
    collection = db["job_applications"]
    result = await collection.insert_one(data)
    logger.info(f"Job application inserted with id: {result.inserted_id}")
    return str(result.inserted_id)
