import asyncio
import os
import sys

# Ensure backend root is in sys path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.core.security import get_password_hash
from app.schemas.user import UserInDB
from datetime import datetime

async def create_first_admin():
    print("========================================")
    print("   D-Table Analytics - Create Admin     ")
    print("========================================")
    
    email = input("Enter Admin Email: ").strip()
    full_name = input("Enter Admin Full Name: ").strip()
    password = input("Enter Admin Password: ").strip()
    
    if not (email and full_name and password):
        print("Error: All fields are required.")
        return
        
    print("\nConnecting to MongoDB...")
    client = AsyncIOMotorClient(settings.MONGO_DETAILS)
    db = client[settings.DATABASE_NAME]
    
    try:
        existing = await db["users"].find_one({"email": email})
        if existing:
            print(f"Error: A user with email '{email}' already exists in the database.")
            return
            
        hashed_password = get_password_hash(password)
        
        db_obj = {
            "email": email,
            "hashed_password": hashed_password,
            "full_name": full_name,
            "role": "Admin",
            "is_active": True,
            "created_at": datetime.utcnow()
        }
        
        result = await db["users"].insert_one(db_obj)
        print(f"\n[SUCCESS] Admin user '{email}' created successfully! (ID: {result.inserted_id})")
        print("You can now log in to the admin panel using these credentials.")
    except Exception as e:
        print(f"\n[ERROR] Failed to create admin user: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(create_first_admin())
