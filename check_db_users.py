import asyncio
import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Add Backend to path
sys.path.append(os.path.join(os.getcwd(), 'Backend'))

async def check_users():
    load_dotenv('Backend/.env')
    mongo_url = os.getenv('MONGO_DETAILS')
    db_name = os.getenv('DATABASE_NAME', 'dtable')
    
    print(f"Connecting to MongoDB: {mongo_url}")
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        users = await db["users"].find().to_list(length=100)
        if not users:
            print("No users found in the 'users' collection.")
        else:
            print(f"Found {len(users)} users:")
            for user in users:
                print(f"- Email: {user.get('email')}, Role: {user.get('role')}, Is Active: {user.get('is_active')}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(check_users())
