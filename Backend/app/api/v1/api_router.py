from fastapi import APIRouter
from app.api.v1.endpoints import auth, contacts, chat, admin, analytics, careers, jobs, services, faqs, testimonials, stats

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(contacts.router, prefix="/contacts", tags=["contacts"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(careers.router, prefix="/careers", tags=["careers"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
api_router.include_router(services.router, prefix="/services", tags=["services"])
api_router.include_router(faqs.router, prefix="/faqs", tags=["faqs"])
api_router.include_router(testimonials.router, prefix="/testimonials", tags=["testimonials"])
api_router.include_router(stats.router, prefix="/stats", tags=["stats"])
