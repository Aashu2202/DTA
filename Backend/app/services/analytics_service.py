# app/services/analytics_service.py

from app.utils.logger import logger
from motor.motor_asyncio import AsyncIOMotorClient

async def get_dashboard_metrics(db: AsyncIOMotorClient) -> dict:
    """
    Fetch analytics and stats for the admin dashboard.
    """
    logger.info("Fetching dashboard metrics")
    
    # Mock examples: Replace with actual database aggregation queries
    users_collection = db["users"]
    contacts_collection = db["contacts"]
    
    total_users = await users_collection.count_documents({})
    new_contacts = await contacts_collection.count_documents({"is_read": False})

    return {
        "total_users": total_users,
        "new_leads": new_contacts,
        "active_services": 5
    }
