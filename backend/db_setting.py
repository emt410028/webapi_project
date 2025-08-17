from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URL: str = "mongodb://localhost:27017"
    DB_NAME: str = "user_rg_data"
    JWT_SECRET: str = "CHANGE_ME_TO_A_LONG_RANDOM_SECRET"
    JWT_ALG: str = "HS256"
    ACCESS_EXPIRE_MINUTES: int = 60 * 24

settings = Settings()