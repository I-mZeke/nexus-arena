from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"])
SECRET_KEY = os.getenv("SECRET_KEY", "nexus-secret-key-2024")

# Usuarios en memoria (para la demo — en prod usa BD)
fake_users = {
    "admin": {
        "username": "admin",
        "hashed_password": pwd_context.hash("nexus123"),
        "role": "admin"
    }
}

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    user = fake_users.get(data.username)
    if not user or not pwd_context.verify(data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = jwt.encode({"sub": data.username, "role": user["role"]}, SECRET_KEY, algorithm="HS256")
    return {"access_token": token, "token_type": "bearer", "username": data.username}