import asyncio
import os
import sys
from datetime import datetime

# Add the project root to sys.path to allow importing app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database

async def seed_stats():
    await connect_to_mongo()
    db = get_database()
    
    stats_collection = db["stats"]
    
    # Check if already seeded
    existing = await stats_collection.find_one({"_id": "stats_config"})
    if existing:
        print("Stats already seeded. Skipping...")
        await close_mongo_connection()
        return

    initial_stats = {
        "_id": "stats_config",
        "items": [
            {
                "label": "Clients",
                "value": 500,
                "suffix": "+",
                "icon": "users",
                "highlight": False,
                "description": "Satisfied enterprise and individual clients.",
                "order": 1,
                "status": "Active"
            },
            {
                "label": "Reports Generated",
                "value": 1200,
                "suffix": "+",
                "icon": "file",
                "highlight": False,
                "description": "Comprehensive data reports delivered.",
                "order": 2,
                "status": "Active"
            },
            {
                "label": "Accuracy",
                "value": 99,
                "suffix": "%",
                "icon": "check",
                "highlight": True,
                "description": "Precision in data processing and analytics.",
                "order": 3,
                "status": "Active"
            },
            {
                "label": "Automation Uptime",
                "value": 24,
                "suffix": "/7",
                "icon": "clock",
                "highlight": False,
                "description": "Round-the-clock automated systems.",
                "order": 4,
                "status": "Active"
            }
        ],
        "updated_at": datetime.utcnow()
    }
    
    await stats_collection.insert_one(initial_stats)
    print("Stats seeded successfully!")
    
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_stats())
