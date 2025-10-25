# AgroVision Autonomous Build Manual

## Overview

This document provides comprehensive instructions for building, deploying, and maintaining the AgroVision platform using automated CI/CD pipelines.

## Repository Structure

```
agrovision/
├── backend/                 # FastAPI backend service
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── core/           # Core utilities
│   ├── tests/              # Backend tests
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend container
│   └── README.md
│
├── web/                    # React 19 web application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   ├── locales/       # i18n translations
│   │   └── styles/        # Tailwind config
│   ├── public/            # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── mobile/                 # React Native mobile app
│   ├── src/
│   │   ├── screens/       # Mobile screens
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API client
│   │   └── locales/       # i18n translations
│   ├── android/           # Android native code
│   ├── ios/               # iOS native code
│   ├── app.json           # Expo config
│   ├── eas.json           # EAS Build config
│   └── README.md
│
├── ai/                     # AI models and logic
│   └── models/
│       └── crop_disease/
│           └── model.onnx # ONNX model file
│
├── infra/                  # Infrastructure as code
│   └── github-actions/    # CI/CD workflows
│       ├── backend-deploy.yml
│       ├── web-deploy.yml
│       ├── android-build.yml
│       ├── ios-build.yml
│       └── release-tag.yml
│
└── docs/                   # Documentation
    ├── PDR.md
    ├── AUTOBUILD_MANUAL.md
    ├── API_CONTRACT.md
    ├── PRIVACY_DRAFT.md
    └── TERMS_DRAFT.md
```

## Prerequisites

### Development Environment
- Node.js 20+ (for web and mobile)
- Python 3.11+ (for backend)
- Docker and Docker Compose
- Git
- Google Cloud SDK (for deployment)

### Required Accounts
- GitHub account with Actions enabled
- Google Cloud Platform account
- Supabase account
- Firebase account (for web hosting)
- Expo account (for mobile builds)

## Environment Setup

### Backend Environment Variables
```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT Configuration
JWT_SECRET=your-jwt-secret
JWT_ALGORITHM=HS256

# Application Settings
ENVIRONMENT=production
DEBUG=false
CORS_ORIGINS=https://agrovision.app,https://www.agrovision.app

# AI Model Settings
MODEL_PATH=/app/ai/models
```

### Web Environment Variables
```bash
VITE_API_BASE_URL=https://api.agrovision.app
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_TOLGEE_API_KEY=your-tolgee-key
```

### Mobile Environment Variables
```bash
EXPO_PUBLIC_API_BASE_URL=https://api.agrovision.app
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Local Development

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Web
```bash
cd web
npm install
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

## GitHub Actions Workflows

### 1. Backend Deploy (`backend-deploy.yml`)

**Trigger**: Push to `main` branch with changes in `backend/` directory

**Steps**:
1. Checkout code
2. Set up Python environment
3. Install dependencies
4. Run tests
5. Build Docker image
6. Push to Google Container Registry
7. Deploy to Cloud Run
8. Run smoke tests

**Required Secrets**:
- `GCP_PROJECT_ID`
- `GCP_SA_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

### 2. Web Deploy (`web-deploy.yml`)

**Trigger**: Push to `main` branch with changes in `web/` directory

**Steps**:
1. Checkout code
2. Set up Node.js environment
3. Install dependencies
4. Run linting
5. Build production bundle
6. Deploy to Firebase Hosting

**Required Secrets**:
- `FIREBASE_TOKEN`
- `VITE_API_BASE_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 3. Android Build (`android-build.yml`)

**Trigger**: Push to `main` branch with changes in `mobile/` directory

**Steps**:
1. Checkout code
2. Set up Node.js environment
3. Install dependencies
4. Set up Expo CLI
5. Build APK using EAS Build
6. Upload artifact to GitHub
7. Create release if tagged

**Required Secrets**:
- `EXPO_TOKEN`
- `ANDROID_KEYSTORE`
- `ANDROID_KEYSTORE_PASSWORD`

### 4. iOS Build (`ios-build.yml`)

**Trigger**: Push to `main` branch with changes in `mobile/` directory

**Steps**:
1. Checkout code
2. Set up Node.js environment
3. Install dependencies
4. Set up Expo CLI
5. Build IPA using EAS Build
6. Upload artifact to GitHub
7. Create release if tagged

**Required Secrets**:
- `EXPO_TOKEN`
- `APPLE_TEAM_ID`
- `APPLE_DIST_CERTIFICATE`
- `APPLE_PROVISIONING_PROFILE`

### 5. Release Tag (`release-tag.yml`)

**Trigger**: Manual workflow dispatch or successful completion of all builds

**Steps**:
1. Generate version tag (`v1.YYYYMMDD.HHMM`)
2. Create Git tag
3. Create GitHub Release
4. Attach build artifacts (APK, IPA)
5. Post release notes

**Version Format**: `v1.20250125.1430` (v1.YYYYMMDD.HHMM)

## Build Commands

### Backend
```bash
# Run tests
pytest tests/ -v

# Run linter
flake8 app/ --max-line-length=120

# Build Docker image
docker build -t agrovision-backend .

# Run locally
docker run -p 8000:8000 --env-file .env agrovision-backend
```

### Web
```bash
# Run linter
npm run lint

# Run type check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile
```bash
# Run on Android emulator
npx expo run:android

# Run on iOS simulator
npx expo run:ios

# Build APK locally
eas build --platform android --profile preview

# Build IPA locally
eas build --platform ios --profile preview
```

## Deployment Process

### Manual Deployment

#### Backend
```bash
# Build and push image
gcloud builds submit --tag gcr.io/$PROJECT_ID/agrovision-backend

# Deploy to Cloud Run
gcloud run deploy agrovision-backend \
  --image gcr.io/$PROJECT_ID/agrovision-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Web
```bash
# Build production bundle
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

#### Mobile
```bash
# Submit to Google Play (Android)
eas submit --platform android

# Submit to App Store (iOS)
eas submit --platform ios
```

### Automatic Deployment

All deployments are automatically triggered by pushes to the `main` branch. The workflows detect changes in specific directories and run appropriate build and deploy steps.

## Monitoring and Logging

### Backend Monitoring
- **Cloud Run Metrics**: Request count, latency, error rate
- **Cloud Logging**: Application logs and errors
- **Uptime Checks**: Endpoint availability monitoring

### Web Monitoring
- **Firebase Analytics**: User engagement and behavior
- **Performance Monitoring**: Page load times and interactions
- **Error Tracking**: JavaScript errors and exceptions

### Mobile Monitoring
- **Expo Analytics**: App usage and crash reports
- **Sentry**: Error tracking and performance monitoring

## Troubleshooting

### Common Issues

#### Backend Build Fails
- Check Python version compatibility
- Verify all dependencies in requirements.txt
- Check Docker build logs
- Ensure environment variables are set

#### Web Build Fails
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`
- Verify environment variables

#### Mobile Build Fails
- Update Expo SDK: `npx expo install --check`
- Clear Metro bundler cache: `npx expo start --clear`
- Check EAS Build logs in Expo dashboard

### Getting Help

1. Check GitHub Actions logs for detailed error messages
2. Review relevant documentation in `/docs`
3. Check issue tracker for known problems
4. Contact development team

## Security Best Practices

1. **Never commit secrets**: Use GitHub Secrets for sensitive data
2. **Rotate credentials**: Regularly update API keys and tokens
3. **Review dependencies**: Keep packages updated for security patches
4. **Audit logs**: Monitor access and deployment logs
5. **Use HTTPS**: Enforce secure connections for all services

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and rotate secrets quarterly
- Backup database weekly
- Monitor disk usage and clean old artifacts
- Review and optimize Cloud costs

### Versioning Strategy
- Major version: Breaking changes (v2.x.x)
- Minor version: New features (v1.1.x)
- Patch version: Bug fixes (v1.0.1)
- Build timestamp: Daily releases (v1.YYYYMMDD.HHMM)

## Conclusion

This build manual ensures consistent, automated deployments of the AgroVision platform. Follow these guidelines to maintain a stable, secure, and scalable system.

For questions or improvements to this manual, please open an issue or submit a pull request.
