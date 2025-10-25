# 🌾 AgroVision Mobile

AI-powered agriculture intelligence mobile platform for farmers, NGOs, and government partners.

## 📱 Overview

AgroVision Mobile is a cross-platform mobile application built with React Native and Expo that helps farmers monitor crop health, predict yields, access markets, and receive localized recommendations.

### 🎯 Key Features

- **🌿 Crop Disease Detection**: AI-powered plant disease classification using camera
- **📊 Real-time Analytics**: Farm analytics, alerts, and performance benchmarking
- **🛰 Market Intelligence**: Price forecasts and supply chain insights
- **🌐 Multilingual Support**: English and Arabic with RTL support
- **📍 Location-based Recommendations**: Localized agricultural advice
- **📴 Offline Mode**: Continue working without internet connectivity
- **📈 Custom Reports**: Export analytics in multiple formats

## 🏗️ Architecture

### Technology Stack

- **Frontend**: React Native 0.73 + Expo 50
- **Backend**: FastAPI (Python) + Supabase (PostgreSQL, Auth, Storage)
- **AI Layer**: Hugging Face models + TensorFlow
- **Build System**: EAS (Expo Application Services)
- **CI/CD**: GitHub Actions

### Supported Platforms

- **Android**: 5.0+ (API Level 21+)
- **iOS**: 13.0+

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Android Studio (for Android development)
- Xcode 14+ (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   cd agrovision-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Run on device/emulator**
   ```bash
   # Android
   npm run android
   
   # iOS (macOS only)
   npm run ios
   
   # Web
   npm run web
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `agrovision-mobile` directory:

```env
# API Configuration
API_BASE_URL=https://api.agrovision.com
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# AI Services
HUGGINGFACE_API_KEY=your-hf-api-key

# Feature Flags
ENABLE_OFFLINE_MODE=true
ENABLE_ANALYTICS=true
```

### EAS Configuration

Configure EAS build profiles in `eas.json`:

- **development**: For testing (APK with simulator)
- **preview**: For internal testing (APK)
- **production**: For store distribution (AAB for Android, archive for iOS)

## 📦 Building

### Local Development Build

```bash
# Android APK
npm run build:android

# iOS Simulator
npm run build:ios

# All platforms
npm run build:all
```

### Production Build via GitHub Actions

Builds are automatically triggered by:

1. **Push to main/develop branch**: Triggers development builds
2. **Manual workflow dispatch**: Allows selection of build type
3. **Version tags**: Creates release builds (e.g., `v1.0.0`)

#### Workflow Files

- `.github/workflows/android.yml` - Android build pipeline
- `.github/workflows/ios.yml` - iOS build pipeline
- `.github/workflows/release.yml` - Version tagging and releases

### Required Secrets

Configure these secrets in GitHub repository settings:

```yaml
EXPO_TOKEN: Your Expo account token
APPLE_ID: Apple Developer account email
APPLE_APP_SPECIFIC_PASSWORD: App-specific password
APPLE_TEAM_ID: Apple Developer Team ID
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎨 Development

### Project Structure

```
agrovision-mobile/
├── .expo/              # Expo configuration
├── assets/             # Images, fonts, icons
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   ├── navigation/     # Navigation configuration
│   ├── services/       # API services
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript types
├── app.json           # Expo app configuration
├── eas.json           # EAS build configuration
└── package.json       # Dependencies and scripts
```

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Lint code
npm run lint

# Fix lint errors
npm run lint:fix
```

## 📲 Distribution

### Android

1. **Google Play Console**
   - Build type: AAB (Android App Bundle)
   - Target: Internal Testing → Production
   
2. **Direct Distribution**
   - Build type: APK
   - Share via download link

### iOS

1. **App Store Connect**
   - Build via Xcode Cloud or EAS
   - Submit through TestFlight → App Store
   
2. **TestFlight**
   - Internal testing with development builds
   - External testing with production builds

## 🔐 Security

- All API keys stored in environment variables
- Supabase Row Level Security (RLS) enabled
- SSL/TLS for all network communications
- Secure storage for sensitive data
- Regular dependency updates via Dependabot

## 🌍 Localization

The app supports multiple languages:

- **English** (default)
- **Arabic** (RTL support)

Translations managed via Tolgee integration.

## 📊 Analytics & Monitoring

- Expo Analytics for usage tracking
- Sentry for error monitoring
- Custom analytics events for user behavior

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.agrovision.com](https://docs.agrovision.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/agrovision/issues)
- **Email**: support@agrovision.com

## 🗺️ Roadmap

### v1.0.0 (Current)
- ✅ Core features implemented
- ✅ Android & iOS builds
- ✅ CI/CD pipelines

### v1.1.0 (Planned)
- [ ] Offline sync improvements
- [ ] Advanced analytics dashboard
- [ ] Weather integration
- [ ] Social features for farmers

### v2.0.0 (Future)
- [ ] IoT sensor integration
- [ ] Drone imagery support
- [ ] Blockchain-based supply chain
- [ ] AI chatbot assistant

## 📈 Metrics

- **App Size**: ~50MB (Android APK), ~60MB (iOS IPA)
- **Supported Devices**: 95% of active Android/iOS devices
- **Target API Levels**: Android 21+, iOS 13+

## 🙏 Acknowledgments

- Hugging Face for AI models
- Expo team for excellent tooling
- Supabase for backend infrastructure
- Open source community

---

Built with ❤️ by the AgroVision Team
