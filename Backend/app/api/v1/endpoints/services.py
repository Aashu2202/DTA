from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Any
from bson import ObjectId
from datetime import datetime
from app.db.mongodb import get_database
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from app.api.deps import get_current_admin

router = APIRouter()

@router.get("", response_model=List[ServiceResponse])
async def list_active_services(db=Depends(get_database)):
    """Public endpoint to list all active services."""
    cursor = db["services"].find({"status": "Active"})
    services = await cursor.to_list(length=100)
    for service in services:
        service["id"] = str(service.pop("_id"))
    return services

@router.get("/admin/all", response_model=List[ServiceResponse])
async def list_all_services_admin(
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin endpoint to list all services."""
    cursor = db["services"].find({})
    services = await cursor.to_list(length=100)
    for service in services:
        service["id"] = str(service.pop("_id"))
    return services

@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
async def create_service(
    service_in: ServiceCreate,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Create new service."""
    # Check for slug uniqueness
    existing_service = await db["services"].find_one({"slug": service_in.slug})
    if existing_service:
        raise HTTPException(status_code=400, detail="Service with this slug already exists")
        
    service_obj = Service(**service_in.dict())
    service_dict = service_obj.dict(by_alias=True)
    await db["services"].insert_one(service_dict)
    
    service_dict["id"] = str(service_dict.pop("_id"))
    return service_dict

@router.get("/{slug}", response_model=ServiceResponse)
async def get_service(slug: str, db=Depends(get_database)):
    """Public: Get a specific service by slug."""
    service = await db["services"].find_one({"slug": slug})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    service["id"] = str(service.pop("_id"))
    return service

@router.put("/{service_id}", response_model=ServiceResponse)
async def update_service(
    service_id: str,
    service_in: ServiceUpdate,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Update an existing service."""
    service = await db["services"].find_one({"_id": service_id})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
        
    # Check for slug uniqueness if slug is being updated
    if service_in.slug and service_in.slug != service.get("slug"):
        existing_service = await db["services"].find_one({"slug": service_in.slug})
        if existing_service:
            raise HTTPException(status_code=400, detail="Service with this slug already exists")
    
    update_data = {k: v for k, v in service_in.dict(exclude_unset=True).items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db["services"].update_one(
        {"_id": service_id},
        {"$set": update_data}
    )
    
    updated_service = await db["services"].find_one({"_id": service_id})
    updated_service["id"] = str(updated_service.pop("_id"))
    return updated_service

@router.delete("/{service_id}")
async def delete_service(
    service_id: str,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Delete a service."""
    result = await db["services"].delete_one({"_id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"detail": "Service deleted successfully"}
