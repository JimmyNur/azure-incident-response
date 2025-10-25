from fastapi import APIRouter, Depends, Query
from typing import Optional
from app.core.security import verify_jwt_token

router = APIRouter()


@router.get("/prices")
async def get_market_prices(
    crop: Optional[str] = Query(None, description="Filter by crop type"),
    region: Optional[str] = Query(None, description="Filter by region"),
    days: Optional[int] = Query(30, ge=1, le=365, description="Days of historical data"),
    user: dict = Depends(verify_jwt_token)
):
    """
    Get current market prices and trends for crops.
    
    Returns comprehensive market data as per API contract.
    """
    return {
        "success": True,
        "data": {
            "crop": crop or "wheat",
            "region": region or "Riyadh, Saudi Arabia",
            "currency": "SAR",
            "unit": "per_ton",
            "current_price": 1250.00,
            "price_change": {
                "amount": 25.00,
                "percentage": 2.04,
                "direction": "up"
            },
            "market_status": "strong",
            "historical_data": [
                {"date": "2025-01-01", "price": 1200.00, "volume": 450},
                {"date": "2025-01-08", "price": 1215.00, "volume": 480},
                {"date": "2025-01-15", "price": 1230.00, "volume": 520},
                {"date": "2025-01-22", "price": 1250.00, "volume": 510}
            ],
            "forecast": {
                "next_7_days": "stable",
                "next_30_days": "slight_increase",
                "confidence": 0.78
            },
            "recommendations": [
                {
                    "action": "hold",
                    "reasoning": "Prices trending upward, wait 2-3 weeks for optimal selling price",
                    "potential_gain_percentage": 5.5
                }
            ],
            "demand_indicators": {
                "local_demand": "high",
                "export_opportunities": True,
                "competition_level": "moderate"
            }
        }
    }


@router.get("/trends")
async def get_market_trends(
    crop: Optional[str] = Query(None),
    user: dict = Depends(verify_jwt_token)
):
    """Get market trends and forecasts"""
    return {
        "success": True,
        "data": {
            "crop": crop or "wheat",
            "trend": "upward",
            "forecast_confidence": 0.85,
            "key_factors": [
                "Increased demand",
                "Supply shortage",
                "Weather conditions"
            ]
        }
    }
