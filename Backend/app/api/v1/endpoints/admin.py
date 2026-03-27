from fastapi import APIRouter, Depends, HTTPException, status
from typing import Any
from app.db.mongodb import get_database
from app.api.deps import get_current_admin

router = APIRouter()

@router.get("/users")
async def list_all_users(
    db=Depends(get_database),
    current_admin=Depends(get_current_admin)
) -> Any:
    """
    Admin only: List all registered system users
    """
    cursor = db["users"].find({}, {"hashed_password": 0})
    users = await cursor.to_list(length=100)
    for u in users:
        u["id"] = str(u.pop("_id"))
    return users

@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: str,
    role: str,
    db=Depends(get_database),
    current_admin=Depends(get_current_admin)
) -> Any:
    """
    Admin only: Upgrade or modify user role
    """
    valid_roles = ["Admin", "HR", "User"]
    if role not in valid_roles:
        raise HTTPException(status_code=400, detail="Invalid role. Must be 'Admin', 'HR', or 'User'.")
        
    # Check if user exists
    user = await db["users"].find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    await db["users"].update_one(
        {"_id": user_id},
        {"$set": {"role": role}}
    )
        
    return {"message": f"Updated user {user_id} to role {role}"}
