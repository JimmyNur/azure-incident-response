from fastapi import APIRouter, Depends, Query
from typing import Optional
from app.core.security import verify_jwt_token

router = APIRouter()


@router.get("/field-health")
async def get_field_health(
    farm_id: str = Query(..., description="Farm identifier"),
    start_date: Optional[str] = Query(None, description="Start date (ISO 8601)"),
    end_date: Optional[str] = Query(None, description="End date (ISO 8601)"),
    user: dict = Depends(verify_jwt_token)
):
    """
    Get field health analytics and monitoring data.
    
    Returns comprehensive field health data as per API contract.
    """
    return {
        "success": True,
        "data": {
            "farm_id": farm_id,
            "farm_name": "Al-Kharj Farm",
            "period": {
                "start": start_date or "2025-01-01T00:00:00Z",
                "end": end_date or "2025-01-25T23:59:59Z"
            },
            "overall_health_score": 82,
            "metrics": {
                "ndvi": {
                    "current": 0.72,
                    "trend": "stable",
                    "status": "good",
                    "history": [
                        {"date": "2025-01-01", "value": 0.68},
                        {"date": "2025-01-08", "value": 0.70},
                        {"date": "2025-01-15", "value": 0.71},
                        {"date": "2025-01-22", "value": 0.72}
                    ]
                },
                "soil_moisture": {
                    "current": 45.2,
                    "unit": "percentage",
                    "trend": "increasing",
                    "status": "optimal",
                    "threshold": {"min": 40, "max": 60}
                },
                "temperature": {
                    "current": 24.5,
                    "unit": "celsius",
                    "trend": "stable",
                    "status": "good"
                }
            },
            "alerts": [
                {
                    "id": "alert_123",
                    "severity": "warning",
                    "type": "irrigation",
                    "message": "Soil moisture approaching lower threshold in zone B",
                    "created_at": "2025-01-24T15:00:00Z"
                }
            ],
            "recommendations": [
                {
                    "type": "irrigation",
                    "priority": "medium",
                    "description": "Increase irrigation frequency in zone B by 10%"
                }
            ]
        }
    }


@router.get("/crop-health")
async def get_crop_health(
    farm_id: str = Query(...),
    crop_type: Optional[str] = Query(None),
    user: dict = Depends(verify_jwt_token)
):
    """Get crop-specific health metrics"""
    return {
        "success": True,
        "data": {
            "farm_id": farm_id,
            "crop_type": crop_type or "wheat",
            "health_score": 85,
            "growth_stage": "vegetative",
            "days_to_harvest": 45
        }
    }
