import asyncio
import sys
import os
from datetime import datetime

# Add Backend directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.models.testimonial import Testimonial, TestimonialStatus

TESTIMONIALS_DATA = [
    {
        "name": "Jane Doe",
        "role": "CTO",
        "company": "TechCorp",
        "quote": "D-Table transformed our data pipeline and gave us insights we didn't know existed. Their expertise in analytics is unmatched.",
        "order": 1
    },
    {
        "name": "John Smith",
        "role": "Head of Ops",
        "company": "RetailCo",
        "quote": "The automation saved us countless hours. Support is always responsive and they truly understand our business needs.",
        "order": 2
    },
    {
        "name": "Emily R.",
        "role": "CEO",
        "company": "HealthPlus",
        "quote": "Their analytics dashboards are intuitive and powerful. We can now make data-driven decisions with absolute confidence.",
        "order": 3
    },
    {
        "name": "Michael Chen",
        "role": "Director of IT",
        "company": "Global Logistics",
        "quote": "Implementation was seamless. The level of detail and customization provided by D-Table is exceptional.",
        "order": 4
    }
]

async def migrate():
    print("Starting Testimonials Migration...")
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(settings.MONGO_DETAILS)
    db = client[settings.DATABASE_NAME]
    collection = db["testimonials"]
    
    # Clear existing testimonials (optional, but good for idempotent script)
    # await collection.delete_many({})
    
    count = 0
    for data in TESTIMONIALS_DATA:
        # Check if already exists
        existing = await collection.find_one({"name": data["name"], "company": data["company"]})
        if existing:
            print(f"Skipping {data['name']} (already exists)")
            continue
            
        testimonial = Testimonial(
            name=data["name"],
            role=data["role"],
            company=data["company"],
            quote=data["quote"],
            order=data["order"],
            status=TestimonialStatus.ACTIVE,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        await collection.insert_one(testimonial.dict(by_alias=True))
        print(f"Migrated: {data['name']} from {data['company']}")
        count += 1
        
    print(f"Migration complete! {count} testimonials added.")
    client.close()

if __name__ == "__main__":
    asyncio.run(migrate())
