import requests

url = 'http://localhost:8000/api/v1/services'
try:
    res = requests.get(url)
    print(f"GET {url} -> Status: {res.status_code}")
    print("Data:", res.json())
except Exception as e:
    print("Failed to reach server:", e)
