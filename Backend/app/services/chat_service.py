import os
from openai import AsyncOpenAI
from app.core.config import settings
from app.core.company_data import COMPANY_INFO
from app.utils.logger import logger
from typing import List, Dict, Any

# Initialize AsyncOpenAI client
# It will automatically use OPENAI_API_KEY from environment variables if not passed explicitly,
# but we are passing it from settings for clarity.
client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

# ============================================================================
# PRODUCTION-GRADE SYSTEM PROMPT FOR D-TABLE ANALYTICS
# ============================================================================
# This prompt ensures:
# 1. Professional and friendly tone
# 2. Structured, detailed responses
# 3. No generic fallback lines
# 4. Proper context maintenance
# 5. Prevention of repetitive answers
# ============================================================================

SYSTEM_PROMPT = f"""You are a professional and friendly AI Assistant for D-Table Analytics.

Your role is to:
1. Provide accurate, detailed, and structured information about D-Table Analytics
2. Answer questions based on the company knowledge base provided below
3. Maintain a professional yet approachable tone
4. Give comprehensive answers with bullet points when listing information
5. Provide complete contact details when explicitly asked
6. Relate general technical questions to D-Table Analytics services

CRITICAL INSTRUCTIONS TO PREVENT POOR RESPONSES:
- NEVER repeat the same sentence in a single response
- NEVER use generic fallback phrases like "Please ask related queries" or "I can help with that"
- NEVER provide vague or evasive answers
- ALWAYS provide useful, specific, and actionable information
- ALWAYS format lists using bullet points (•) for clarity
- ALWAYS include relevant details when providing service information
- When asked about services, provide structured details with benefits
- When asked for contact information, provide complete details: phone, email, website, hours

HANDLING OUT-OF-SCOPE QUESTIONS:
If a user asks a general technical question (e.g., "What is Python?", "Explain machine learning"):
- Provide a brief, accurate explanation (2-3 lines)
- Relate it to how D-Table Analytics uses this technology
- Connect it to relevant services we offer

Only decline to answer if the question is explicitly inappropriate or harmful.

---
COMPANY KNOWLEDGE BASE:
{COMPANY_INFO}
---

Your responses should be:
✓ Clear and well-structured
✓ Professional yet friendly
✓ Detailed when appropriate
✓ Concise for quick questions
✓ Actionable with next steps when relevant
✗ Never repetitive or generic
✗ Never evasive or vague
"""

async def process_chat_message(
    message: str,
    conversation_history: List[Dict[str, str]] | None = None
) -> str:
    """
    Process incoming chat message and return an AI response using OpenAI.
    
    Args:
        message: The current user message to process
        conversation_history: List of previous messages to maintain context.
                             Format: [{"role": "user|assistant", "content": "..."}, ...]
    
    Returns:
        AI-generated response as a string
    
    Production Features:
    - Uses gpt-4o-mini for optimal performance and cost
    - Temperature set to 0.3 for consistent, focused answers
    - Includes conversation history for context awareness
    - Structured error handling and logging
    """
    try:
        # Build messages list: system prompt + conversation history + current message
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT}  # System message first
        ]
        
        # Add conversation history if provided
        if conversation_history:
            messages.extend(conversation_history)
        
        # Add current user message
        messages.append({"role": "user", "content": message})
        
        logger.info(f"Processing message with {len(messages)} total messages (including system)")
        
        # Make request to OpenAI with production settings
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",  # Reliable model (change to gpt-4 or gpt-4-turbo if preferred)
            messages=messages,
            temperature=0.3,  # Low temperature for deterministic, focused responses
            max_tokens=800,  # Increased for detailed, structured responses
            top_p=0.95,  # Slightly conservative for quality
        )
        
        ai_response = response.choices[0].message.content
        logger.info(f"Chat response generated successfully: {len(ai_response)} characters")
        return ai_response
        
    except Exception as e:
        logger.error(f"Error communicating with OpenAI: {e}", exc_info=True)
        logger.error(f"OpenAI API Key configured: {bool(settings.OPENAI_API_KEY)}")
        return (
            "I'm experiencing technical difficulties at the moment. "
            "Please try again in a few moments, or contact our support team at "
            "contact@dtable-analytics.com for immediate assistance."
        )

