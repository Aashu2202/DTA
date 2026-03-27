from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from app.models.stats import StatItem, StatStatus

class StatItemCreate(BaseModel):
    label: str
    value: int
    suffix: Optional[str] = ""
    icon: str
    highlight: bool = False
    description: Optional[str] = None
    order: int = 0
    status: StatStatus = StatStatus.ACTIVE

class StatsUpdate(BaseModel):
    items: List[StatItemCreate]

class StatItemResponse(StatItem):
    pass

class StatsResponse(BaseModel):
    items: List[StatItemResponse]
    updated_at: datetime
