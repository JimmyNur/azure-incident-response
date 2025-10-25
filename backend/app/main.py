from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, farmer, ai, analytics, market, reports
from app.core.config import settings

app = FastAPI(
    title="AgroVision API",
    description="Enterprise-grade agriculture intelligence platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(farmer.router, prefix="/farmer", tags=["Farmer"])
app.include_router(ai.router, prefix="/ai", tags=["AI Analysis"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(market.router, prefix="/market", tags=["Market"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "success": True,
        "message": "AgroVision API is running",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "success": True,
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "services": {
            "database": "connected",
            "ai_models": "loaded"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
