import asyncio
import os
import sys
from datetime import datetime
from bson import ObjectId

# Add the Backend folder to path so we can import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

faqs_data = [
    {
        "question": "How do I get started?",
        "answer": "Click the \"Get Started\" button or contact us through the form to schedule a consultation. We will help you identify the best data solutions for your business needs.",
        "order": 1,
        "status": "Active"
    },
    {
        "question": "What services do you offer?",
        "answer": "We provide a comprehensive suite of data services including data management, business intelligence, WhatsApp automation, custom software development, and AI-driven analytics.",
        "order": 2,
        "status": "Active"
    },
    {
        "question": "Do you support custom integrations?",
        "answer": "Absolutely. We specialize in tailoring our solutions to fit your existing infrastructure and building custom integrations that streamline your specific workflows.",
        "order": 3,
        "status": "Active"
    },
    {
        "question": "Is there a trial period?",
        "answer": "We offer customized pilot programs for many of our services. Please reach out to our sales team to discuss a trial that makes sense for your project scope.",
        "order": 4,
        "status": "Active"
    }
]

async def run_migration():
    db_name = settings.DATABASE_NAME
    client = AsyncIOMotorClient(settings.MONGO_DETAILS)
    db = client[db_name]
    faqs_col = db["faqs"]
    
    # Check if there are faqs already.
    count = await faqs_col.count_documents({})
    if count > 0:
        print(f"Found {count} existing FAQs. Clearing them to ensure a fresh migration.")
        await faqs_col.delete_many({})

    for faq in faqs_data:
        faq["_id"] = str(ObjectId())
        faq["created_at"] = datetime.utcnow()
        faq["updated_at"] = datetime.utcnow()
        
        await faqs_col.insert_one(faq)
        print(f"Inserted FAQ: {faq['question']} (Order: {faq['order']})")
        
    client.close()
    print("Migration complete.")

if __name__ == "__main__":
    asyncio.run(run_migration())
