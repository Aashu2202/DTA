from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.db.mongodb import get_database
from app.models.faq import FAQ, FAQStatus
from app.schemas.faq import FAQCreate, FAQUpdate, FAQResponse
from app.api.deps import get_current_admin
from datetime import datetime

router = APIRouter()

@router.get("", response_model=List[FAQResponse])
async def list_active_faqs(db=Depends(get_database)):
    """Public endpoint to list all active FAQs sorted by order."""
    cursor = db["faqs"].find({"status": "Active"}).sort("order", 1)
    faqs = await cursor.to_list(length=100)
    for faq in faqs:
        faq["id"] = str(faq.pop("_id"))
    return faqs

@router.get("/admin/all", response_model=List[FAQResponse])
async def list_all_faqs_admin(
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin endpoint to list all FAQs including inactive ones."""
    cursor = db["faqs"].find({}).sort("order", 1)
    faqs = await cursor.to_list(length=100)
    for faq in faqs:
        faq["id"] = str(faq.pop("_id"))
    return faqs

@router.post("", response_model=FAQResponse, status_code=status.HTTP_201_CREATED)
async def create_faq(
    faq_in: FAQCreate,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Create new FAQ."""
    faq_obj = FAQ(**faq_in.dict())
    faq_dict = faq_obj.dict(by_alias=True)
    await db["faqs"].insert_one(faq_dict)
    
    faq_dict["id"] = str(faq_dict.pop("_id"))
    return faq_dict

@router.get("/{faq_id}", response_model=FAQResponse)
async def get_faq(faq_id: str, db=Depends(get_database)):
    """Get a specific FAQ by ID."""
    faq = await db["faqs"].find_one({"_id": faq_id})
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    faq["id"] = str(faq.pop("_id"))
    return faq

@router.put("/{faq_id}", response_model=FAQResponse)
async def update_faq(
    faq_id: str,
    faq_in: FAQUpdate,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Update an existing FAQ."""
    faq = await db["faqs"].find_one({"_id": faq_id})
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    update_data = {k: v for k, v in faq_in.dict(exclude_unset=True).items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db["faqs"].update_one(
        {"_id": faq_id},
        {"$set": update_data}
    )
    
    updated_faq = await db["faqs"].find_one({"_id": faq_id})
    updated_faq["id"] = str(updated_faq.pop("_id"))
    return updated_faq

@router.delete("/{faq_id}")
async def delete_faq(
    faq_id: str,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Delete an FAQ."""
    result = await db["faqs"].delete_one({"_id": faq_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"detail": "FAQ deleted successfully"}
