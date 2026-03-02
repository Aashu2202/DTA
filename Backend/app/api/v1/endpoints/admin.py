from fastapi import APIRouter, Depends
from typing import Any
from app.db.mongodb import get_database

router = APIRouter()

@router.get("/users")
async def list_all_users(
    db=Depends(get_database),
    # TODO: Add role-based access control dependency here (e.g. current_admin_user)
) -> Any:
    """
    Admin only: List all registered system users
    """
    # Mock return 
    return {"message": "Admin users list"}

@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: str,
    role: str,
    db=Depends(get_database),
) -> Any:
    """
    Admin only: Upgrade or modify user role
    """
    return {"message": f"Updated user {user_id} to role {role}"}
