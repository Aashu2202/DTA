from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # App Settings
    PROJECT_NAME: str = "D-Table Analytics API"
    API_V1_STR: str = "/api/v1"
    
    # DB Settings
    MONGO_DETAILS: str
    DATABASE_NAME: str

    # Security Settings
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    # OpenAI Settings
    OPENAI_API_KEY: str

    # Email / SMTP Settings (optional — if not set, emails are logged instead of sent)
    HR_EMAIL: Optional[str] = "hr@dtableanalytics.com"
    FOUNDER_EMAIL: Optional[str] = "rahulyadav@dtableanalytics.com"
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SMTP_FROM: Optional[str] = None

    # Model Config to read from .env file
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
