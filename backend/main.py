from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from jose import jwt, JWTError
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from db_setting import settings

app = FastAPI(title="Auth API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5137","http://localhost:5173",], 
    # allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
client = AsyncIOMotorClient(settings.MONGO_URL)
db = client[settings.DB_NAME]
users = db["users"]

@app.on_event("startup")
async def startup():
    await users.create_index("username", unique=True)
    

class UserCreate(BaseModel):
    username: str = Field(min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(min_length=6)

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

def create_access_token(sub: str):
    expire = datetime.now(tz=timezone.utc) + timedelta(minutes=settings.ACCESS_EXPIRE_MINUTES)
    payload = {"sub": sub, "exp": expire}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)

async def get_user_by_email(email: str):
    return await users.find_one({"email": email})

@app.post("/auth/register", status_code=201)
async def register(data: UserCreate):
    try:
        hashed = pwd.hash(data.password)
        doc = {
            "username": data.username,
            "password": hashed,
            "email": (data.email.lower() if data.email else None),
            "created_at": datetime.now(tz=timezone.utc),
        }
        res = await users.insert_one(doc)
        return {"id": str(res.inserted_id), "username": data.username}

    except DuplicateKeyError as e:
        # 解析是哪個索引衝突
        msg = "使用者名稱已被註冊" if "username" in str(e) else "Email 已被註冊"
        raise HTTPException(status_code=400, detail=msg)

    except Exception as e:
        # 暫時把真正的錯誤拋出來便於除錯（穩定後再改成通用訊息）
        raise HTTPException(status_code=500, detail=f"Unexpected error: {type(e).__name__}: {e}")

@app.post("/auth/login", response_model=Token)
async def login(data: UserLogin):
    user = await users.find_one({"username": data.username})
    if not user or not pwd.verify(data.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="帳號或密碼錯誤")
    token = create_access_token(str(user["_id"]))
    return {"access_token": token}


@app.get("/auth/me")
async def me(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="缺少 Authorization")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        user_id = payload.get("sub")
        user = await users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=401, detail="無效使用者")
        return {"id": str(user["_id"]), "name": user["name"], "email": user["email"]}
    except JWTError:
        raise HTTPException(status_code=401, detail="Token 無效或過期")