import requests

url = 'http://localhost:8000/api/v1/services/business-process-automation'
try:
    res = requests.get(url)
    print(f"GET {url} -> Status: {res.status_code}")
    data = res.json()
    print("Title:", data.get('title'))
    print("ShortDesc:", data.get('shortDesc'))
    print("DetailContent Keys:", data.get('detailContent').keys())
    print("Problems count:", len(data.get('detailContent', {}).get('problems', [])))
except Exception as e:
    print("Failed to reach server:", e)
