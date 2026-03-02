# app/services/whatsapp_service.py

from app.utils.logger import logger

async def send_whatsapp_message(phone_number: str, message: str) -> bool:
    """
    Sends a WhatsApp message via standard WhatsApp Cloud API.
    """
    # TODO: Implement WhatsApp API call here (e.g. using httpx to Meta Cloud API)
    logger.info(f"Mock sending WhatsApp message to {phone_number}")
    return True
