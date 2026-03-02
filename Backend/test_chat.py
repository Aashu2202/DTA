import asyncio
import httpx

async def test_chat():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "http://localhost:8000/api/v1/chat/",
                json={
                    "user_id": "test_user",
                    "message": "Hello, what are your services?",
                    "is_user": False
                },
                timeout=30
            )
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
        except Exception as e:
            print(f"Error: {e}")

asyncio.run(test_chat())
