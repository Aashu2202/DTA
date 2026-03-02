from fastapi import APIRouter, Depends
from typing import Any
from app.services import analytics_service
from app.db.mongodb import get_database

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_stats(
    db=Depends(get_database),
    # TODO: Add dependency for Admin/SuperAdmin check
) -> Any:
    """
    Get dashboard metrics for the Admin view.
    """
    metrics = await analytics_service.get_dashboard_metrics(db)
    return metrics
