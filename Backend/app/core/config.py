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
    FOUNDER_EMAILS: Optional[str] = None

    @property
    def founder_email_list(self) -> list[str]:
        """
        Returns a list of unique email addresses for contact inquiries.
        FOUNDER_EMAILS takes precedence over FOUNDER_EMAIL.
        """
        from app.utils.logger import logger
        emails = []
        if self.FOUNDER_EMAILS:
            # Diagnostic Log: Raw value
            logger.info(f"[DIAGNOSTIC] FOUNDER_EMAILS raw: '{self.FOUNDER_EMAILS}'")
            
            # 1. Use the new comma-separated list
            raw_emails = [e.strip() for e in self.FOUNDER_EMAILS.split(",") if e.strip()]
            emails.extend(raw_emails)
            
            # Diagnostic Log: Parsed list
            logger.info(f"[DIAGNOSTIC] FOUNDER_EMAILS parsed list: {emails}")
            
            # 2. Log if we are overriding the old variable
            if self.FOUNDER_EMAIL:
                logger.info(f"FOUNDER_EMAILS is set. Using it over FOUNDER_EMAIL: {self.FOUNDER_EMAIL}")
        elif self.FOUNDER_EMAIL:
            # 3. Fallback to the single email address
            logger.info(f"[DIAGNOSTIC] Falling back to single FOUNDER_EMAIL: '{self.FOUNDER_EMAIL}'")
            emails.append(self.FOUNDER_EMAIL.strip())
            
        # 4. Remove duplicates while preserving original order
        final_list = list(dict.fromkeys(emails))
        if final_list:
            logger.info(f"[DIAGNOSTIC] Final recipient list: {final_list}")
        else:
            logger.warning("[DIAGNOSTIC] No recipients found for contact query.")
            
        return final_list
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SMTP_FROM: Optional[str] = None

    # Model Config to read from .env file
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
