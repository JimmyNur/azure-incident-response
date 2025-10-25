from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.core.security import verify_jwt_token

router = APIRouter()


class ReportPeriod(BaseModel):
    start_date: str
    end_date: str


class GenerateReportRequest(BaseModel):
    farm_id: str
    report_type: str
    period: ReportPeriod
    sections: List[str]
    format: str = "pdf"
    email_delivery: bool = False


@router.post("/generate")
async def generate_report(
    request: GenerateReportRequest,
    user: dict = Depends(verify_jwt_token)
):
    """
    Generate a comprehensive farm report.
    
    Returns report generation status as per API contract.
    """
    report_id = f"report_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    return {
        "success": True,
        "data": {
            "report_id": report_id,
            "status": "processing",
            "estimated_completion_time": datetime.utcnow().isoformat() + "Z",
            "report_type": request.report_type,
            "period": {
                "start_date": request.period.start_date,
                "end_date": request.period.end_date
            },
            "sections_included": request.sections,
            "format": request.format,
            "email_delivery": request.email_delivery
        },
        "message": "Report generation started. You will be notified when ready."
    }


@router.get("/{report_id}/status")
async def get_report_status(
    report_id: str,
    user: dict = Depends(verify_jwt_token)
):
    """Get report generation status"""
    return {
        "success": True,
        "data": {
            "report_id": report_id,
            "status": "completed",
            "progress": 100,
            "download_url": f"https://api.agrovision.app/reports/{report_id}/download"
        }
    }


@router.get("/{report_id}/download")
async def download_report(
    report_id: str,
    user: dict = Depends(verify_jwt_token)
):
    """Download generated report"""
    return {
        "success": True,
        "message": "Report download link",
        "data": {
            "report_id": report_id,
            "download_url": f"https://storage.agrovision.app/reports/{report_id}.pdf",
            "expires_at": datetime.utcnow().isoformat() + "Z"
        }
    }


@router.get("/")
async def list_reports(
    farm_id: Optional[str] = None,
    user: dict = Depends(verify_jwt_token)
):
    """List all reports for a user or farm"""
    return {
        "success": True,
        "data": {
            "reports": [
                {
                    "report_id": "report_001",
                    "farm_id": farm_id or "farm_001",
                    "report_type": "comprehensive",
                    "created_at": "2025-01-20T10:00:00Z",
                    "status": "completed"
                }
            ]
        }
    }
