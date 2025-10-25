# AgroVision - Enterprise Agriculture Intelligence Platform

<div align="center">

![AgroVision Logo](https://via.placeholder.com/150x150/16a34a/ffffff?text=AgroVision)

**Empowering Farmers with AI-Powered Insights**

[![Backend Deploy](https://github.com/JimmyNur/azure-incident-response/actions/workflows/backend-deploy.yml/badge.svg)](https://github.com/JimmyNur/azure-incident-response/actions/workflows/backend-deploy.yml)
[![Web Deploy](https://github.com/JimmyNur/azure-incident-response/actions/workflows/web-deploy.yml/badge.svg)](https://github.com/JimmyNur/azure-incident-response/actions/workflows/web-deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#features) • [Architecture](#architecture) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 🌟 Overview

AgroVision is a comprehensive, enterprise-grade agriculture intelligence platform that combines artificial intelligence, satellite imagery, and real-time data analytics to help farmers make informed decisions about crop health, disease detection, irrigation, and market timing.

## ✨ Features

### 🤖 AI-Powered Disease Detection
- Upload crop/leaf images for instant AI analysis
- Detect 20+ common crop diseases with 94% accuracy
- Get actionable treatment recommendations
- Track disease history and patterns

### 📊 Field Health Analytics
- Real-time NDVI (vegetation health) monitoring
- Soil moisture and temperature tracking
- Automated alert system for critical conditions
- Historical trend analysis and insights

### 💰 Market Intelligence
- Real-time crop pricing data
- Price trend analysis and forecasting
- Optimal selling time recommendations
- Regional market comparison

### 📄 Automated Reporting
- Comprehensive farm health reports
- Customizable report templates
- Scheduled report generation
- Export to PDF, Excel, CSV

### 🌐 Multilingual Support
- English and Arabic languages
- RTL (Right-to-Left) layout support
- Extensible to other languages

### 🌙 Modern UI/UX
- Beautiful dark mode
- Responsive design (mobile, tablet, desktop)
- Native mobile apps (Android & iOS)
- Intuitive navigation

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AgroVision Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────┐  │
│  │   Web    │    │  Mobile  │    │   API (FastAPI)      │  │
│  │ (React)  │◄──►│  (Expo)  │◄──►│                      │  │
│  └──────────┘    └──────────┘    │  - Authentication    │  │
│                                   │  - AI Analysis       │  │
│                                   │  - Analytics         │  │
│  ┌──────────────────────────┐    │  - Market Data       │  │
│  │   AI Models (ONNX)       │◄───│  - Reports           │  │
│  │  - Disease Detection     │    └──────────────────────┘  │
│  │  - Crop Health Analysis  │             │                │
│  └──────────────────────────┘             ▼                │
│                                   ┌──────────────────────┐  │
│                                   │  Supabase (DB)       │  │
│                                   │  - PostgreSQL        │  │
│                                   │  - Auth              │  │
│                                   │  - Storage           │  │
│                                   └──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
agrovision/
├── backend/                 # FastAPI backend service
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── core/           # Core utilities
│   ├── tests/              # Backend tests
│   └── Dockerfile
│
├── web/                    # React web application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   └── locales/       # i18n translations
│   └── package.json
│
├── mobile/                 # React Native mobile app
│   ├── src/
│   │   ├── screens/       # Mobile screens
│   │   ├── components/    # Reusable components
│   │   └── services/      # API client
│   ├── android/           # Android native code
│   ├── ios/               # iOS native code
│   └── eas.json           # EAS Build config
│
├── ai/                     # AI models and logic
│   └── models/
│       └── crop_disease/  # Disease detection model
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
    ├── PDR.md             # Product Design Requirements
    ├── AUTOBUILD_MANUAL.md
    ├── API_CONTRACT.md
    ├── PRIVACY_DRAFT.md
    └── TERMS_DRAFT.md
```

## 🚀 Quick Start

### Prerequisites

- **Backend**: Python 3.11+, Docker
- **Web**: Node.js 20+
- **Mobile**: Node.js 20+, Expo CLI
- **Cloud**: Google Cloud Platform account, Firebase account

### Local Development

#### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Access API docs: http://localhost:8000/docs

#### 2. Web

```bash
cd web
npm install
npm run dev
```

Access web app: http://localhost:5173

#### 3. Mobile

```bash
cd mobile
npm install
npx expo start
```

Scan QR code with Expo Go app.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Product Design Requirements](docs/PDR.md) | Complete product vision and requirements |
| [Autobuild Manual](docs/AUTOBUILD_MANUAL.md) | CI/CD and deployment guide |
| [API Contract](docs/API_CONTRACT.md) | Complete API documentation |
| [Privacy Policy](docs/PRIVACY_DRAFT.md) | Privacy policy draft |
| [Terms of Service](docs/TERMS_DRAFT.md) | Terms of service draft |

### Component READMEs

- [Backend README](backend/README.md)
- [Web README](web/README.md)
- [Mobile README](mobile/README.md)

## 🔧 Configuration

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

#### Backend Deployment
- `GCP_PROJECT_ID` - Google Cloud project ID
- `GCP_SA_KEY` - Service account key JSON
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `JWT_SECRET` - Secret for JWT signing

#### Web Deployment
- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_SUPABASE_URL` - Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key

#### Mobile Build
- `EXPO_TOKEN` - Expo authentication token
- `EXPO_PUBLIC_API_BASE_URL` - Backend API URL
- `APPLE_TEAM_ID` - Apple Developer Team ID (iOS)

## 🔄 CI/CD Pipeline

### Automated Workflows

1. **Backend Deploy**: Triggers on changes to `backend/` → Deploys to Google Cloud Run
2. **Web Deploy**: Triggers on changes to `web/` → Deploys to Firebase Hosting
3. **Android Build**: Triggers on changes to `mobile/` → Builds APK via EAS
4. **iOS Build**: Triggers on changes to `mobile/` → Builds IPA via EAS
5. **Release Tag**: Triggers after successful builds → Creates versioned release

### Version Format

Releases follow the format: `v1.YYYYMMDD.HHMM`

Example: `v1.20250125.1430`

## 🧪 Testing

### Backend
```bash
cd backend
pytest tests/ -v
```

### Web
```bash
cd web
npm run lint
npm run type-check
npm run build
```

### Mobile
```bash
cd mobile
npm run lint
npx expo start
```

## 📱 Downloads

Get the latest release:

- **Web**: Visit the deployed Firebase Hosting URL
- **Android**: Download APK from [Releases](https://github.com/JimmyNur/azure-incident-response/releases)
- **iOS**: Download IPA from [Releases](https://github.com/JimmyNur/azure-incident-response/releases)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Development**: AgroVision Engineering Team
- **AI/ML**: Data Science Team
- **Design**: UX/UI Team

## 📞 Support

- **Email**: support@agrovision.app
- **Documentation**: [docs.agrovision.app](https://docs.agrovision.app)
- **Issues**: [GitHub Issues](https://github.com/JimmyNur/azure-incident-response/issues)

## 🙏 Acknowledgments

- Supabase for backend infrastructure
- Google Cloud Platform for hosting
- Expo for mobile development platform
- Open-source community for amazing tools

---

<div align="center">

**Made with ❤️ for farmers worldwide**

[Website](https://agrovision.app) • [Documentation](https://docs.agrovision.app) • [Blog](https://blog.agrovision.app)

</div>
