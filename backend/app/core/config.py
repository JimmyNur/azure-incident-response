from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    ENVIRONMENT: str = "production"
    DEBUG: bool = False
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "https://agrovision.app",
        "https://www.agrovision.app",
        "http://localhost:3000",
        "http://localhost:5173"
    ]
    
    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    
    # JWT
    JWT_SECRET: str = ""
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24
    
    # AI Models
    MODEL_PATH: str = "/app/ai/models"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
