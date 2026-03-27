import asyncio
import httpx

BASE_URL = "http://localhost:8000/api/v1"

async def test_testimonials():
    async with httpx.AsyncClient() as client:
        # 1. Test Public API
        print("Testing Public Testimonials API...")
        try:
            resp = await client.get(f"{BASE_URL}/testimonials")
            if resp.status_code == 200:
                testimonials = resp.json()
                print(f"  Success: Found {len(testimonials)} active testimonials.")
                for t in testimonials:
                    print(f"    - [{t['order']}] {t['name']} ({t['company']})")
            else:
                print(f"  Failed: Status {resp.status_code}")
        except Exception as e:
            print(f"  Error: {e}")

        # 2. Test Admin Protected Route
        print("\nTesting Admin Protected Route (Expect 401/403)...")
        try:
            resp = await client.get(f"{BASE_URL}/testimonials/admin/all")
            print(f"  Status: {resp.status_code} (Success if 401/403)")
        except Exception as e:
            print(f"  Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_testimonials())
