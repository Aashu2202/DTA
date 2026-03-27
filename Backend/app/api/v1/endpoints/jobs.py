from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Any
from bson import ObjectId
from datetime import datetime
from app.db.mongodb import get_database
from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate, JobResponse
from app.api.deps import get_current_admin

router = APIRouter()

@router.get("", response_model=List[JobResponse])
async def list_active_jobs(db=Depends(get_database)):
    """Public endpoint to list all active jobs."""
    cursor = db["jobs"].find({"status": "Active"}).sort("created_at", -1)
    jobs = await cursor.to_list(length=100)
    # Map _id back to id to match schema
    for job in jobs:
        job["id"] = str(job.pop("_id"))
    return jobs

@router.get("/admin", response_model=List[JobResponse])
async def list_all_jobs_admin(
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin endpoint to list all jobs."""
    cursor = db["jobs"].find({}).sort("created_at", -1)
    jobs = await cursor.to_list(length=100)
    for job in jobs:
        job["id"] = str(job.pop("_id"))
    return jobs

@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job(
    job_in: JobCreate,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Create new job."""
    job_obj = Job(**job_in.dict())
    job_dict = job_obj.dict(by_alias=True)
    await db["jobs"].insert_one(job_dict)
    
    job_dict["id"] = str(job_dict.pop("_id"))
    return job_dict

@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: str, db=Depends(get_database)):
    """Public: Get a specific job."""
    job = await db["jobs"].find_one({"_id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    job["id"] = str(job.pop("_id"))
    return job

@router.put("/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: str,
    job_in: JobUpdate,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Update an existing job."""
    job = await db["jobs"].find_one({"_id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    update_data = {k: v for k, v in job_in.dict(exclude_unset=True).items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db["jobs"].update_one(
        {"_id": job_id},
        {"$set": update_data}
    )
    
    updated_job = await db["jobs"].find_one({"_id": job_id})
    updated_job["id"] = str(updated_job.pop("_id"))
    return updated_job

@router.delete("/{job_id}")
async def delete_job(
    job_id: str,
    db=Depends(get_database),
    current_admin: dict = Depends(get_current_admin)
):
    """Admin: Delete a job."""
    result = await db["jobs"].delete_one({"_id": job_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"detail": "Job deleted successfully"}
