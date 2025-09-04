from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, HTTPException, status, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from jose import jwt, JWTError
from typing import Optional
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from db_setting import settings

# 建立 FastAPI 應用程式
app = FastAPI(title="RESTful Auth API")
# 設定 CORS 中介軟體，允許前端跨域請求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5137","http://localhost:5173",], 
    # allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 密碼雜湊設定
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
# 連接 MongoDB
client = AsyncIOMotorClient(settings.MONGO_URL)
db = client[settings.DB_NAME]
users = db["users"]

# 啟動時建立唯一索引，避免重複註冊
@app.on_event("startup")
async def startup():
    await users.create_index("username", unique=True)
    

# 使用者註冊資料模型
class UserCreate(BaseModel):
    username: str = Field(min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(min_length=6)

# 使用者登入資料模型
class UserLogin(BaseModel):
    username: str
    password: str

# 使用者輸出資料模型
class UserOut(BaseModel):
    id: str
    username: str
    email: Optional[str] = None

# JWT Token 資料模型
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# 建立 JWT access token
def create_access_token(sub: str):
    expire = datetime.now(tz=timezone.utc) + timedelta(minutes=settings.ACCESS_EXPIRE_MINUTES)
    payload = {"sub": sub, "exp": expire}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)

# 依 email 取得使用者
async def get_user_by_email(email: str):
    return await users.find_one({"email": email})

# 取得目前登入使用者（驗證 JWT）
async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="缺少或無效的 Authorization")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        user_id = payload.get("sub")
        user = await users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=401, detail="無效使用者")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Token 無效或過期")


# 註冊 API（回傳使用者資料）
@app.post("/users", response_model=UserOut, status_code=201)
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
        return {"id": str(res.inserted_id), "username": data.username, "email": data.email}
    except DuplicateKeyError:
        raise HTTPException(status_code=409, detail="使用者名稱或 Email 已被註冊")

# 登入 API（回傳 token）
@app.post("/sessions", response_model=Token)
async def login(data: UserLogin):
    user = await users.find_one({"username": data.username})
    if not user or not pwd.verify(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="帳號或密碼錯誤")
    token = create_access_token(str(user["_id"]))
    return {"access_token": token}

# 取得目前使用者資訊
@app.get("/users/me", response_model=UserOut)
async def me(user=Depends(get_current_user)):
    return {"id": str(user["_id"]), "username": user["username"], "email": user.get("email")}