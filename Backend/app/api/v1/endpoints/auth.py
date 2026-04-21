from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserResponse, Token
from app.repositories import user_repo
from app.core.security import verify_password, create_access_token
from app.db.mongodb import get_database
from app.utils.logger import logger
from typing import Any

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(
    *,
    db=Depends(get_database),
    user_in: UserCreate
) -> Any:
    """
    Register a new user.
    """
    user = await user_repo.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = await user_repo.user.create(db, obj_in=user_in)
    return user

@router.post("/login", response_model=Token)
async def login(
    db=Depends(get_database),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    logger.info(f"[DIAGNOSTIC] Login attempt for username: {form_data.username}")
    
    user = await user_repo.user.get_by_email(db, email=form_data.username)
    
    if not user:
        logger.warning(f"[DIAGNOSTIC] User not found in DB: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    
    logger.info(f"[DIAGNOSTIC] User found in DB. Verifying password for {form_data.username}")
    if not verify_password(form_data.password, user.hashed_password):
        logger.warning(f"[DIAGNOSTIC] Password verification failed for {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
        
    if not user.is_active:
        logger.warning(f"[DIAGNOSTIC] User is inactive: {form_data.username}")
        raise HTTPException(status_code=400, detail="Inactive user")
    
    logger.info(f"[DIAGNOSTIC] Login successful for user: {form_data.username}")
    
    return {
        "access_token": create_access_token(subject=str(user.id)),
        "token_type": "bearer",
    }
