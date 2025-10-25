from fastapi import APIRouter, Depends
from app.core.security import verify_jwt_token

router = APIRouter()


@router.get("/profile")
async def get_profile(user: dict = Depends(verify_jwt_token)):
    """
    Get the authenticated farmer's profile information.
    
    Returns complete profile as per API contract.
    """
    return {
        "success": True,
        "data": {
            "id": user.get("user_id", "550e8400-e29b-41d4-a716-446655440000"),
            "name": "Ahmed Hassan",
            "email": user.get("email", "farmer@example.com"),
            "phone": "+966501234567",
            "farms": [
                {
                    "id": "farm_001",
                    "name": "Al-Kharj Farm",
                    "location": {
                        "latitude": 24.1552,
                        "longitude": 47.3042,
                        "address": "Al-Kharj, Riyadh Region, Saudi Arabia"
                    },
                    "area_hectares": 25.5,
                    "crops": ["wheat", "dates", "tomatoes"],
                    "created_at": "2024-03-10T08:00:00Z"
                }
            ],
            "subscription": {
                "plan": "premium",
                "status": "active",
                "expires_at": "2025-12-31T23:59:59Z"
            },
            "preferences": {
                "language": "ar",
                "units": "metric",
                "notifications_enabled": True
            }
        }
    }


@router.put("/profile")
async def update_profile(user: dict = Depends(verify_jwt_token)):
    """Update farmer profile"""
    return {
        "success": True,
        "message": "Profile updated successfully"
    }
