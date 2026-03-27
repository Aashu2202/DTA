from fastapi import APIRouter, Depends, HTTPException, status
from app.db.mongodb import get_database
from app.models.stats import StatsConfig, StatStatus
from app.schemas.stats import StatsUpdate, StatsResponse
from app.api.deps import get_current_admin
from datetime import datetime

router = APIRouter()

STATS_DOC_ID = "stats_config"

@router.get("", response_model=StatsResponse)
async def list_active_stats(db=Depends(get_database)):
    """Public endpoint: Returns active stats section."""
    config = await db["stats"].find_one({"_id": STATS_DOC_ID})
    if not config:
        # Fallback if not seeded yet
        return {"items": [], "updated_at": datetime.utcnow()}
    
    # Filter only active items and sort by order
    active_items = [item for item in config.get("items", []) if item.get("status") == "Active"]
    active_items.sort(key=lambda x: x.get("order", 0))
    
    return {
        "items": active_items,
        "updated_at": config.get("updated_at", datetime.utcnow())
    }

@router.get("/admin", response_model=StatsResponse)
async def get_stats_admin(
    db=Depends(get_database),
    current_admin=Depends(get_current_admin)
):
    """Admin endpoint: Get full stats configuration."""
    config = await db["stats"].find_one({"_id": STATS_DOC_ID})
    if not config:
        return {"items": [], "updated_at": datetime.utcnow()}
    
    # Sort all items by order for admin view
    items = config.get("items", [])
    items.sort(key=lambda x: x.get("order", 0))
    
    return {
        "items": items,
        "updated_at": config.get("updated_at", datetime.utcnow())
    }

@router.put("/admin", response_model=StatsResponse)
async def update_stats_admin(
    stats_in: StatsUpdate,
    db=Depends(get_database),
    current_admin=Depends(get_current_admin)
):
    """Admin endpoint: Update stats configuration."""
    updated_at = datetime.utcnow()
    
    stats_data = {
        "items": [item.dict() for item in stats_in.items],
        "updated_at": updated_at
    }
    
    await db["stats"].update_one(
        {"_id": STATS_DOC_ID},
        {"$set": stats_data},
        upsert=True
    )
    
    return stats_data
