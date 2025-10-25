# AgroVision Backend

FastAPI backend service for the AgroVision agriculture intelligence platform.

## Features

- **Authentication**: JWT-based authentication with Supabase
- **AI Analysis**: ONNX-powered crop disease detection
- **Analytics**: Field health monitoring and insights
- **Market Intelligence**: Real-time crop pricing and trends
- **Reports**: Automated report generation

## Tech Stack

- **Framework**: FastAPI
- **Database**: Supabase (PostgreSQL)
- **AI**: ONNX Runtime
- **Authentication**: JWT tokens
- **Deployment**: Google Cloud Run

## Setup

### Local Development

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```env
ENVIRONMENT=development
DEBUG=true
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
MODEL_PATH=../ai/models
```

4. Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

5. Access API docs:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Docker

Build and run with Docker:
```bash
docker build -t agrovision-backend .
docker run -p 8000:8000 --env-file .env agrovision-backend
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Farmer
- `GET /farmer/profile` - Get farmer profile
- `PUT /farmer/profile` - Update profile

### AI Analysis
- `POST /ai/analyze-leaf` - Analyze leaf image for diseases
- `GET /ai/models` - List available models

### Analytics
- `GET /analytics/field-health` - Get field health metrics
- `GET /analytics/crop-health` - Get crop-specific health

### Market
- `GET /market/prices` - Get market prices and trends
- `GET /market/trends` - Get market forecasts

### Reports
- `POST /reports/generate` - Generate farm report
- `GET /reports/{id}/status` - Check report status
- `GET /reports/{id}/download` - Download report
- `GET /reports/` - List reports

## Testing

Run tests:
```bash
pytest tests/ -v
```

Run with coverage:
```bash
pytest tests/ --cov=app --cov-report=html
```

## Linting

```bash
flake8 app/ --max-line-length=120
black app/ --check
```

## Deployment

Deploy to Google Cloud Run:
```bash
gcloud builds submit --tag gcr.io/$PROJECT_ID/agrovision-backend
gcloud run deploy agrovision-backend \
  --image gcr.io/$PROJECT_ID/agrovision-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ENVIRONMENT` | Environment (development/production) | Yes |
| `DEBUG` | Enable debug mode | No |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `JWT_SECRET` | Secret for JWT signing | Yes |
| `JWT_ALGORITHM` | JWT algorithm (default: HS256) | No |
| `MODEL_PATH` | Path to AI models | Yes |
| `CORS_ORIGINS` | Allowed CORS origins | No |

## Project Structure

```
backend/
├── app/
│   ├── api/              # API endpoints
│   │   ├── auth.py
│   │   ├── farmer.py
│   │   ├── ai.py
│   │   ├── analytics.py
│   │   ├── market.py
│   │   └── reports.py
│   ├── core/             # Core utilities
│   │   ├── config.py
│   │   └── security.py
│   ├── models/           # Database models
│   ├── services/         # Business logic
│   │   └── ai_service.py
│   └── main.py           # Application entry point
├── tests/                # Test files
├── requirements.txt      # Python dependencies
├── Dockerfile           # Docker configuration
└── README.md            # This file
```

## Contributing

1. Follow PEP 8 style guidelines
2. Write tests for new features
3. Update documentation
4. Run linting and tests before committing

## License

Copyright © 2025 AgroVision. All rights reserved.
