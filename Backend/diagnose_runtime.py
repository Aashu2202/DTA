import requests

def check_service():
    url = "http://localhost:8000"
    try:
        response = requests.get(url)
        print(f"GET / Status: {response.status_code}")
        print(f"GET / Response: {response.json()}")
        
        # Check login with both Form and JSON
        login_url = f"{url}/api/v1/auth/login"
        
        print("\n--- Testing Form Data (application/x-www-form-urlencoded) ---")
        form_data = {"username": "test@example.com", "password": "password"}
        resp_form = requests.post(login_url, data=form_data)
        print(f"Form Status: {resp_form.status_code}")
        print(f"Form Response: {resp_form.text}")
        
        print("\n--- Testing JSON Data (application/json) ---")
        json_data = {"username": "test@example.com", "password": "password"}
        resp_json = requests.post(login_url, json=json_data)
        print(f"JSON Status: {resp_json.status_code}")
        print(f"JSON Response: {resp_json.text}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_service()
