import asyncio
import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import ValidationError

# Add Backend to path
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(SCRIPT_DIR, 'Backend')
if BACKEND_DIR not in sys.path:
    sys.path.append(BACKEND_DIR)

# --- REPRODUCE BACKEND LOGIC ---
from app.schemas.user import UserInDB
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def simulate_verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def simulate_create_access_token(subject: str) -> str:
    # Use exact logic from app/core/security.py
    from datetime import datetime, timedelta
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": str(subject)}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

async def diagnose_production_admin():
    # Load production env relative to script location
    ENV_PATH = os.path.join(BACKEND_DIR, '.env')
    load_dotenv(ENV_PATH)
    
    print("=== D-Table Analytics: Production Login Diagnosis ===\n")
    print(f"[*] Configuration Check:")
    print(f"    - MONGO_DETAILS: {'PRESENT' if os.getenv('MONGO_DETAILS') else 'MISSING'}")
    print(f"    - SECRET_KEY: {'PRESENT' if os.getenv('SECRET_KEY') else 'MISSING'}")
    print(f"    - DATABASE_NAME: {os.getenv('DATABASE_NAME')}")
    
    mongo_url = os.getenv('MONGO_DETAILS')
    db_name = os.getenv('DATABASE_NAME', 'dtable')
    email = "hr@dtable.com"
    input_password = "Admin123!" # Default assumption - change if known

    if not mongo_url:
        print("\n[ERROR] MONGO_DETAILS is not set in Backend/.env")
        return

    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # --- STAGE 1: DB LOOKUP ---
        print(f"\n[1] STAGE: DB Lookup for '{email}'...")
        document = await db["users"].find_one({"email": email})
        if not document:
            print("    [FAIL] User not found.")
            return
        print("    [SUCCESS] User record retrieved from MongoDB.")

        # --- STAGE 2: MODEL CREATION ---
        print(f"\n[2] STAGE: UserInDB Model Instantiation...")
        # Reproduce user_repo logic: 
        document["_id"] = str(document["_id"]) 
        try:
            user = UserInDB(**document)
            print("    [SUCCESS] UserInDB model created without validation errors.")
        except ValidationError as e:
            print(f"    [FAIL] Pydantic ValidationError: {e}")
            return
        except Exception as e:
            print(f"    [CRASH] Unexpected error during model creation: {type(e).__name__}: {e}")
            return

        # --- STAGE 3: PASSWORD VERIFICATION ---
        print(f"\n[3] STAGE: Password Verification...")
        try:
            # We don't need real password to check if the function crashes
            # but we use the stored hash to see if bcrypt backend is OK
            stored_hash = document.get('hashed_password')
            if not stored_hash:
                print("    [FAIL] Missing 'hashed_password' in DB record.")
                return
            
            # This is the most likely crash point if bcrypt is missing/mismatched
            matches = simulate_verify_password(input_password, stored_hash)
            print(f"    [SUCCESS] verify_password executed. Match: {matches}")
        except ValueError as e:
            print(f"    [FAIL] Passlib/Bcrypt ValueError: {e}")
            print("    (This often means the stored hash format is invalid/corrupted)")
            return
        except Exception as e:
            print(f"    [CRASH] Unexpected error during verification: {type(e).__name__}: {e}")
            return

        # --- STAGE 4: TOKEN CREATION ---
        print(f"\n[4] STAGE: JWT Token Generation...")
        try:
            token = simulate_create_access_token(user.id)
            print(f"    [SUCCESS] JWT created successfully. Token (prefix): {token[:10]}...")
        except JWTError as e:
            print(f"    [FAIL] Jose JWTError: {e}")
            return
        except Exception as e:
            print(f"    [CRASH] Unexpected error during token creation: {type(e).__name__}: {e}")
            return

        print("\n=== DIAGNOSIS COMPLETE: ALL STEPS PASSED LOCALLY ===")
        print("If production still fails with 500, check for Environment/Permission differences.")

    except Exception as e:
        print(f"\n[ERROR] Overall Diagnostic Failure: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(diagnose_production_admin())
