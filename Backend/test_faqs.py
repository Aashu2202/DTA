import asyncio
import httpx

BASE_URL = "http://localhost:8000/api/v1"

async def test_faqs():
    async with httpx.AsyncClient() as client:
        # 1. Test Public API
        print("Testing Public FAQ API...")
        try:
            resp = await client.get(f"{BASE_URL}/faqs")
            if resp.status_code == 200:
                faqs = resp.json()
                print(f"  Success: Found {len(faqs)} active FAQs.")
                for f in faqs:
                    print(f"    - [{f['order']}] {f['question']}")
            else:
                print(f"  Failed: Status {resp.status_code}")
        except Exception as e:
            print(f"  Error: {e}")

        # Note: Admin APIs require valid token. Since I can't easily get one here without login,
        # I'll rely on the manual verification for admin routes.
        # But I can check if they are protected.
        print("\nTesting Admin Protected Route (Expect 401/403)...")
        try:
            resp = await client.get(f"{BASE_URL}/faqs/admin/all")
            print(f"  Status: {resp.status_code} (Success if 401/403)")
        except Exception as e:
            print(f"  Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_faqs())
