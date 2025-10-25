from fastapi import APIRouter, Depends, UploadFile, File, Form
from typing import Optional
from datetime import datetime
from app.core.security import verify_jwt_token
from app.services.ai_service import analyze_image

router = APIRouter()


@router.post("/analyze-leaf")
async def analyze_leaf(
    image: UploadFile = File(...),
    crop_type: Optional[str] = Form(None),
    user: dict = Depends(verify_jwt_token)
):
    """
    Analyze a leaf image for disease detection using AI.
    
    Returns comprehensive analysis as per API contract.
    """
    # Validate image
    if not image.content_type.startswith("image/"):
        return {
            "success": False,
            "error": {
                "code": "INVALID_IMAGE",
                "message": "Image file is corrupted or format not supported"
            }
        }
    
    # Perform AI analysis (mock for now)
    analysis_result = await analyze_image(image, crop_type)
    
    return {
        "success": True,
        "data": {
            "analysis_id": f"analysis_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "image_url": f"https://storage.agrovision.app/analyses/analysis_789.jpg",
            "results": {
                "disease_detected": True,
                "disease_name": "Early Blight",
                "scientific_name": "Alternaria solani",
                "confidence": 0.94,
                "severity": "moderate",
                "affected_area_percentage": 15.5
            },
            "recommendations": [
                {
                    "action": "treatment",
                    "description": "Apply fungicide containing chlorothalonil",
                    "timing": "immediate",
                    "priority": "high"
                },
                {
                    "action": "prevention",
                    "description": "Improve air circulation between plants",
                    "timing": "ongoing",
                    "priority": "medium"
                },
                {
                    "action": "monitoring",
                    "description": "Check plants daily for spread",
                    "timing": "daily for 2 weeks",
                    "priority": "high"
                }
            ],
            "similar_cases": 127,
            "processing_time_ms": 1245
        }
    }


@router.get("/models")
async def list_models(user: dict = Depends(verify_jwt_token)):
    """List available AI models"""
    return {
        "success": True,
        "data": {
            "models": [
                {
                    "id": "crop_disease_v1",
                    "name": "Crop Disease Detector",
                    "version": "1.0",
                    "diseases": 20,
                    "accuracy": 0.94
                }
            ]
        }
    }
