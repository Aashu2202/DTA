from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.core.config import settings
from app.models.user import User
from app.db.mongodb import get_database
from typing import Any
from bson import ObjectId
from bson.errors import InvalidId

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

async def get_current_user(
    db=Depends(get_database), token: str = Depends(oauth2_scheme)
) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    try:
        obj_id = ObjectId(user_id)
    except InvalidId:
        raise credentials_exception

    user = await db["users"].find_one({"_id": obj_id})
    if user is None:
        raise credentials_exception
    return user

async def get_current_admin(
    current_user: dict = Depends(get_current_user),
) -> dict:
    role = current_user.get("role", "").lower()
    if role not in ["admin", "hr"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges"
        )
    return current_user
