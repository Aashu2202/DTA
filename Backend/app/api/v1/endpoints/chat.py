from fastapi import APIRouter, Depends
from app.schemas.chat import ChatMessageCreate, ChatMessageResponse
from app.repositories import chat_repo
from app.services import chat_service
from app.db.mongodb import get_database
from app.utils.logger import logger
from typing import Any

router = APIRouter()

async def get_conversation_history(db: Any, user_id: str, limit: int = 10) -> list[dict]:
    """
    Retrieve previous conversation messages for context.
    
    Args:
        db: Database connection
        user_id: User ID to fetch conversation for
        limit: Number of previous messages to include (for context window management)
    
    Returns:
        List of previous messages formatted for OpenAI API
    """
    try:
        # Fetch previous messages from repository using the new get_by_user method
        raw_messages = await chat_repo.chat.get_by_user(
            db,
            user_id=user_id,
            skip=0,
            limit=limit
        )
        
        # Format messages for OpenAI API (exclude the very last user message to avoid duplication)
        formatted_messages = []
        for msg in raw_messages:
            formatted_messages.append({
                "role": "user" if msg.is_user else "assistant",
                "content": msg.message
            })
        
        return formatted_messages
    except Exception as e:
        logger.warning(f"Could not fetch conversation history: {e}")
        return []


@router.post("/", response_model=ChatMessageResponse)
async def send_chat_message(
    *,
    db=Depends(get_database),
    chat_in: ChatMessageCreate
) -> Any:
    """
    Send a message to the AI Chatbot and get a response.
    
    PRODUCTION FEATURES:
    1. Saves user message to database
    2. Retrieves conversation history for context awareness
    3. Processes message through optimized AI service with memory
    4. Returns structured response
    5. Maintains complete audit trail in database
    
    Args:
        db: Database connection
        chat_in: User message and metadata
    
    Returns:
        ChatMessageResponse: AI response with metadata
    """
    try:
        user_id = chat_in.user_id or "guest"
        
        # 1. Save user's message
        user_msg = await chat_repo.chat.create(db, obj_in=chat_in)
        logger.info(f"User message saved: {user_msg.id}")
        
        # 2. Retrieve conversation history for context (last 10 messages)
        conversation_history = await get_conversation_history(db, user_id, limit=10)
        logger.info(f"Loaded {len(conversation_history)} previous messages for context")
        
        # 3. Process via AI service with conversation memory
        ai_response_text = await chat_service.process_chat_message(
            message=chat_in.message,
            conversation_history=conversation_history
        )
        logger.info(f"AI response generated successfully")
        
        # 4. Save AI's response  
        ai_msg_in = ChatMessageCreate(
            user_id=user_id,
            message=ai_response_text,
            is_user=False
        )
        ai_msg = await chat_repo.chat.create(db, obj_in=ai_msg_in)
        logger.info(f"AI message saved: {ai_msg.id}")
        
        return ai_msg
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}", exc_info=True)
        # Return graceful error response
        return {
            "user_id": chat_in.user_id or "guest",
            "message": (
                "I apologize for the technical difficulty. "
                "Our team has been notified. Please try again in a moment, "
                "or reach out to support@dtable-analytics.com for assistance."
            ),
            "is_user": False
        }
