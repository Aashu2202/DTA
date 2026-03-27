from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class StatStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"

class StatItem(BaseModel):
    label: str
    value: int
    suffix: Optional[str] = ""
    icon: str  # Icon key (e.g., 'users', 'file', 'check', 'clock')
    highlight: bool = False
    description: Optional[str] = None
    order: int = 0
    status: StatStatus = StatStatus.ACTIVE

class StatsConfig(BaseModel):
    id: str = Field(default="stats_config", alias="_id")
    items: List[StatItem] = []
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "items": [
                    {
                        "label": "Clients",
                        "value": 500,
                        "suffix": "+",
                        "icon": "users",
                        "highlight": False,
                        "order": 1,
                        "status": "Active"
                    }
                ]
            }
        }
