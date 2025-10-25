# AgroVision API Contract

## Base URL
- **Production**: `https://api.agrovision.app`
- **Staging**: `https://api-staging.agrovision.app`
- **Development**: `http://localhost:8000`

## Authentication

All API requests (except `/auth/login` and `/auth/register`) require authentication using JWT Bearer tokens.

### Header Format
```
Authorization: Bearer <jwt_token>
```

## API Endpoints

### 1. Authentication

#### POST /auth/login
Authenticate a user and return a JWT token.

**Request Body**:
```json
{
  "email": "farmer@example.com",
  "password": "securepassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "farmer@example.com",
      "name": "Ahmed Hassan",
      "role": "farmer",
      "created_at": "2025-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2025-01-16T10:30:00Z"
  },
  "message": "Login successful"
}
```

**Error Response** (401 Unauthorized):
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

### 2. Farmer Profile

#### GET /farmer/profile
Get the authenticated farmer's profile information.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Ahmed Hassan",
    "email": "farmer@example.com",
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
      "notifications_enabled": true
    }
  }
}
```

---

### 3. AI Analysis

#### POST /ai/analyze-leaf
Analyze a leaf image for disease detection using AI.

**Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body** (multipart/form-data):
```
image: <file> (JPG, PNG, max 10MB)
crop_type: "tomato" (optional)
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "analysis_id": "analysis_789",
    "timestamp": "2025-01-25T14:30:00Z",
    "image_url": "https://storage.agrovision.app/analyses/analysis_789.jpg",
    "results": {
      "disease_detected": true,
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
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "error": {
    "code": "INVALID_IMAGE",
    "message": "Image file is corrupted or format not supported"
  }
}
```

---

### 4. Analytics

#### GET /analytics/field-health
Get field health analytics and monitoring data.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Query Parameters**:
- `farm_id` (required): Farm identifier
- `start_date` (optional): Start date (ISO 8601 format)
- `end_date` (optional): End date (ISO 8601 format)

**Example Request**:
```
GET /analytics/field-health?farm_id=farm_001&start_date=2025-01-01&end_date=2025-01-25
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "farm_id": "farm_001",
    "farm_name": "Al-Kharj Farm",
    "period": {
      "start": "2025-01-01T00:00:00Z",
      "end": "2025-01-25T23:59:59Z"
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
```

---

### 5. Market Intelligence

#### GET /market/prices
Get current market prices and trends for crops.

**Headers**:
```
Authorization: Bearer <jwt_token>
```

**Query Parameters**:
- `crop` (optional): Filter by crop type (e.g., "wheat", "tomato")
- `region` (optional): Filter by region
- `days` (optional): Number of days of historical data (default: 30, max: 365)

**Example Request**:
```
GET /market/prices?crop=wheat&region=riyadh&days=30
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "crop": "wheat",
    "region": "Riyadh, Saudi Arabia",
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
      "export_opportunities": true,
      "competition_level": "moderate"
    }
  }
}
```

---

### 6. Reports

#### POST /reports/generate
Generate a comprehensive farm report.

**Headers**:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "farm_id": "farm_001",
  "report_type": "comprehensive",
  "period": {
    "start_date": "2025-01-01",
    "end_date": "2025-01-31"
  },
  "sections": [
    "field_health",
    "disease_incidents",
    "irrigation",
    "market_analysis",
    "recommendations"
  ],
  "format": "pdf",
  "email_delivery": true
}
```

**Response** (202 Accepted):
```json
{
  "success": true,
  "data": {
    "report_id": "report_456",
    "status": "processing",
    "estimated_completion_time": "2025-01-25T14:35:00Z",
    "report_type": "comprehensive",
    "period": {
      "start_date": "2025-01-01",
      "end_date": "2025-01-31"
    },
    "sections_included": [
      "field_health",
      "disease_incidents",
      "irrigation",
      "market_analysis",
      "recommendations"
    ],
    "format": "pdf",
    "email_delivery": true
  },
  "message": "Report generation started. You will be notified when ready."
}
```

**Get Report Status**:
```
GET /reports/report_456/status
```

**Download Report**:
```
GET /reports/report_456/download
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_CREDENTIALS` | 401 | Invalid email or password |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `INVALID_INPUT` | 400 | Invalid request parameters |
| `INVALID_IMAGE` | 400 | Invalid or corrupted image file |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

## Rate Limiting

- **Standard Plan**: 1000 requests per hour
- **Premium Plan**: 5000 requests per hour
- **Enterprise Plan**: Unlimited

Rate limit headers included in all responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1706194800
```

## Pagination

For endpoints that return lists, use these query parameters:
- `page` (default: 1): Page number
- `per_page` (default: 20, max: 100): Items per page

Response includes pagination metadata:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total_items": 150,
    "total_pages": 8,
    "has_next": true,
    "has_previous": false
  }
}
```

## Webhooks

Configure webhooks to receive real-time notifications for events:

### Events
- `disease.detected`: New disease detection
- `alert.created`: New field alert
- `report.completed`: Report generation complete
- `price.significant_change`: Major price movement

### Webhook Payload Format
```json
{
  "event": "disease.detected",
  "timestamp": "2025-01-25T14:30:00Z",
  "data": {
    "analysis_id": "analysis_789",
    "farm_id": "farm_001",
    "disease_name": "Early Blight",
    "confidence": 0.94,
    "severity": "moderate"
  }
}
```

## SDK Support

Official SDKs available:
- **JavaScript/TypeScript**: `npm install @agrovision/sdk`
- **Python**: `pip install agrovision-sdk`
- **Dart/Flutter**: `flutter pub add agrovision_sdk`

## Versioning

API version is specified in the URL path:
- Current version: `v1`
- Deprecated versions supported for 12 months

## Support

For API support:
- Email: api-support@agrovision.app
- Documentation: https://docs.agrovision.app
- Status Page: https://status.agrovision.app
