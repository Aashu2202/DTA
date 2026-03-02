# D-Table Analytics Backend API

This backend provides the REST APIs and logic for D-Table Analytics built with FastAPI and MongoDB (Motor). It is designed dynamically using Clean Architecture principles to allow easy navigation and future scalability.

## Tech Stack
- Python 3.11+
- FastAPI
- MongoDB (Motor async driver)
- JWT Authentication / Passlib

## Local Development Setup

1. **Clone and Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment**
   Set up your `.env` file referencing the structure found in `.env.example` or the base `.env`.

4. **Run Server**
   ```bash
   python run.py
   # OR
   uvicorn app.main:app --reload
   ```

5. **Access**
   - API Status: [http://localhost:8000/](http://localhost:8000/)
   - Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## AWS EC2 Deployment Guide

For a production level deployment, we recommend setting up this FastAPI app behind an Nginx reverse proxy using Gunicorn with Uvicorn workers.

1. **Setup Server Basics**
   ```bash
   sudo apt update
   sudo apt install python3-pip python3-venv nginx
   ```

2. **Project Setup on Server**
   - Clone repo into `/var/www/dtable-backend`
   - Setup VENV and `pip install -r requirements.txt`

3. **Systemd Service (`/etc/systemd/system/dtable.service`)**
   ```ini
   [Unit]
   Description=Gunicorn daemon for DTable FastAPI
   After=network.target

   [Service]
   User=ubuntu
   Group=www-data
   WorkingDirectory=/var/www/dtable-backend
   Environment="PATH=/var/www/dtable-backend/venv/bin"
   ExecStart=/var/www/dtable-backend/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app

   [Install]
   WantedBy=multi-user.target
   ```
   *Run: `sudo systemctl start dtable` and `sudo systemctl enable dtable`*

4. **Nginx Config (`/etc/nginx/sites-available/dtable`)**
   ```nginx
   server {
       listen 80;
       server_name api.dtableanalytics.com;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
   *Run: `sudo ln -s /etc/nginx/sites-available/dtable /etc/nginx/sites-enabled/` and `sudo systemctl restart nginx`*

5. Remember to set up SSL with Let's Encrypt! (Certbot)
