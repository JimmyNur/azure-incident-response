from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.core.security import create_jwt_token

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    success: bool
    data: dict
    message: str


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Authenticate a user and return a JWT token.
    
    Example response as per API contract:
    {
        "success": true,
        "data": {
            "user": {...},
            "token": "...",
            "expires_at": "..."
        },
        "message": "Login successful"
    }
    """
    # Mock authentication - In production, verify against Supabase
    # For demo purposes, accept any valid email format
    
    if not request.email or not request.password:
        raise HTTPException(
            status_code=401,
            detail={
                "success": False,
                "error": {
                    "code": "INVALID_CREDENTIALS",
                    "message": "Invalid email or password"
                }
            }
        )
    
    # Mock user data
    user_id = "550e8400-e29b-41d4-a716-446655440000"
    user_data = {
        "id": user_id,
        "email": request.email,
        "name": "Ahmed Hassan",
        "role": "farmer",
        "created_at": "2025-01-15T10:30:00Z"
    }
    
    # Create JWT token
    token_data = create_jwt_token(user_id, request.email)
    
    return LoginResponse(
        success=True,
        data={
            "user": user_data,
            "token": token_data["token"],
            "expires_at": token_data["expires_at"]
        },
        message="Login successful"
    )


@router.post("/register")
async def register(request: LoginRequest):
    """Register a new user"""
    # Mock registration
    return {
        "success": True,
        "message": "User registered successfully",
        "data": {
            "email": request.email
        }
    }
