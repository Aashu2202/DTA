from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.db.mongodb import get_database
from app.models.testimonial import Testimonial, TestimonialStatus
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate, TestimonialResponse
from app.api.deps import get_current_admin
from datetime import datetime

router = APIRouter()

@router.get("", response_model=List[TestimonialResponse])
async def list_active_testimonials(db=Depends(get_database)):
    """Public endpoint to list all active testimonials sorted by order."""
    cursor = db["testimonials"].find({"status": "Active"}).sort("order", 1)
    testimonials = await cursor.to_list(length=100)
    for t in testimonials:
        t["id"] = str(t.pop("_id"))
    return testimonials

@router.get("/admin/all", response_model=List[TestimonialResponse])
async def list_all_testimonials_admin(
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin endpoint to list all testimonials including inactive ones."""
    cursor = db["testimonials"].find({}).sort("order", 1)
    testimonials = await cursor.to_list(length=100)
    for t in testimonials:
        t["id"] = str(t.pop("_id"))
    return testimonials

@router.post("", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
async def create_testimonial(
    testimonial_in: TestimonialCreate,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Create new testimonial."""
    testimonial_obj = Testimonial(**testimonial_in.dict())
    testimonial_dict = testimonial_obj.dict(by_alias=True)
    await db["testimonials"].insert_one(testimonial_dict)
    
    testimonial_dict["id"] = str(testimonial_dict.pop("_id"))
    return testimonial_dict

@router.get("/{testimonial_id}", response_model=TestimonialResponse)
async def get_testimonial(testimonial_id: str, db=Depends(get_database)):
    """Get a specific testimonial by ID."""
    testimonial = await db["testimonials"].find_one({"_id": testimonial_id})
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    testimonial["id"] = str(testimonial.pop("_id"))
    return testimonial

@router.put("/{testimonial_id}", response_model=TestimonialResponse)
async def update_testimonial(
    testimonial_id: str,
    testimonial_in: TestimonialUpdate,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Update an existing testimonial."""
    testimonial = await db["testimonials"].find_one({"_id": testimonial_id})
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    update_data = {k: v for k, v in testimonial_in.dict(exclude_unset=True).items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db["testimonials"].update_one(
        {"_id": testimonial_id},
        {"$set": update_data}
    )
    
    updated_testimonial = await db["testimonials"].find_one({"_id": testimonial_id})
    updated_testimonial["id"] = str(updated_testimonial.pop("_id"))
    return updated_testimonial

@router.delete("/{testimonial_id}")
async def delete_testimonial(
    testimonial_id: str,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Delete a testimonial."""
    result = await db["testimonials"].delete_one({"_id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"detail": "Testimonial deleted successfully"}
