from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from enum import Enum

class ServiceProblem(BaseModel):
    title: str
    description: str
    icon_name: Optional[str] = "FiAlertCircle"

class ServiceSolution(BaseModel):
    problem: str
    solution: str
    outcome: str

class ServiceProcessStep(BaseModel):
    step: int
    title: str
    description: str

class ServiceUseCase(BaseModel):
    title: str
    scenario: str

class ServiceDetailContent(BaseModel):
    whatIsIt: List[str] = []
    problems: List[ServiceProblem] = []
    howWeHelp: List[ServiceSolution] = []
    processDiagram: List[ServiceProcessStep] = []
    useCases: List[ServiceUseCase] = []

class ServiceStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"

class Service(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    title: str
    slug: str
    icon_name: Optional[str] = None
    shortDesc: str
    fullDesc: Optional[str] = None
    image: Optional[str] = None
    banner: Optional[str] = None
    benefits: List[str] = []
    detailContent: ServiceDetailContent = Field(default_factory=ServiceDetailContent)
    status: ServiceStatus = ServiceStatus.ACTIVE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "title": "Business Process Automation",
                "slug": "business-process-automation",
                "shortDesc": "Optimize operational efficiency and eliminate manual bottlenecks.",
                "status": "Active"
            }
        }
