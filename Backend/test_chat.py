import asyncio
import httpx

async def test_chat():
    async with httpx.AsyncClient() as client:
        try:
            # business scenario
            response = await client.post(
                "http://localhost:8000/api/v1/chat/",
                json={
                    "user_id": "test_user",
                    "message": "Hello, what are your services?",
                    "is_user": False,
                    "purpose": "business"
                },
                timeout=30
            )
            print(f"[Business] Status Code: {response.status_code}")
            print(f"[Business] Response: {response.json()}")

            # hiring scenario - should not refuse
            response2 = await client.post(
                "http://localhost:8000/api/v1/chat/",
                json={
                    "user_id": "test_user",
                    "message": "Are you hiring?",
                    "is_user": False,
                    "purpose": "hiring"
                },
                timeout=30
            )
            print(f"[Hiring] Status Code: {response2.status_code}")
            print(f"[Hiring] Response: {response2.json()}")

        except Exception as e:
            print(f"Error: {e}")


async def test_prompt_contains_purpose():
    """Unit test that directly exercises service prompt construction."""
    from app.services import chat_service

    # create a dummy client that records the messages it receives
    class DummyCompletions:
        def __init__(self):
            self.last_messages = None

        async def create(self, model, messages, temperature, max_tokens, top_p):
            self.last_messages = messages
            # return a dummy response object with the expected structure
            return type(
                "Resp",
                (),
                {"choices": [type("C", (), {"message": type("M", (), {"content": "ok"})})]}
            )()

    dummy = DummyCompletions()
    # monkeypatch the client used by chat_service
    chat_service.client.chat.completions = dummy

    # call the service with hiring purpose
    result = await chat_service.process_chat_message(
        message="Test",
        conversation_history=[],
        user_purpose="hiring"
    )
    # ensure the service returned the dummy content and the system prompt contained the hiring section
    assert result == "ok"
    assert dummy.last_messages is not None
    system_msg = dummy.last_messages[0]
    assert "PURPOSE: HIRING" in system_msg["content"]
    assert "- Prioritize answering questions about current job openings" in system_msg["content"]

asyncio.run(test_chat())
