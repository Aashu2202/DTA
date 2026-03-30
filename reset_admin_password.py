import asyncio
import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from dotenv import load_dotenv

# Setup path and environment
sys.path.append(os.path.join(os.getcwd(), 'Backend'))
load_dotenv('Backend/.env')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

async def reset_password(email: str, new_password: str):
    mongo_url = os.getenv('MONGO_DETAILS')
    db_name = os.getenv('DATABASE_NAME', 'dtable')
    
    print(f"Connecting to MongoDB...")
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        user = await db["users"].find_one({"email": email})
        if not user:
            print(f"Error: User with email '{email}' not found.")
            return
            
        hashed_password = get_password_hash(new_password)
        
        result = await db["users"].update_one(
            {"email": email},
            {"$set": {"hashed_password": hashed_password}}
        )
        
        if result.modified_count > 0:
            print(f"\n[SUCCESS] Password for '{email}' has been reset to: {new_password}")
        else:
            print(f"\n[INFO] No changes were made (is it the same password?)")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    email_to_reset = "hr@dtable.com"
    new_password_to_set = "Admin123!" # Default reset password
    
    asyncio.run(reset_password(email_to_reset, new_password_to_set))
