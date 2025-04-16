from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    openai_api_key: str
    environment: str = "development"
    debug: bool = False

    class Config:
        env_file = ".env"

settings = Settings()
