# AgroVision Mobile App

React Native + Expo mobile application for the AgroVision platform.

## Features

- **Cross-Platform**: Android and iOS support
- **Native Performance**: Built with React Native
- **Modern UI**: Native components with beautiful design
- **Offline Support**: Local data caching
- **Push Notifications**: Real-time alerts
- **Camera Integration**: Image capture for AI analysis

## Screens

1. **Dashboard**: Farm overview and quick stats
2. **Field Health**: Real-time field monitoring
3. **Market Prices**: Crop pricing and trends
4. **Reports**: Generate and view farm reports

## Tech Stack

- **Framework**: React Native 0.74
- **Platform**: Expo SDK 51
- **Navigation**: Expo Router
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Build**: EAS Build
- **TypeScript**: Full type safety

## Setup

### Prerequisites

- Node.js 20+
- Expo CLI: `npm install -g expo-cli`
- Expo account (for EAS Build)
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env` file:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.agrovision.app
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Development

### Start Development Server

```bash
npm start
```

This opens Expo DevTools. You can:
- Press `a` to open Android emulator
- Press `i` to open iOS simulator
- Scan QR code with Expo Go app on physical device

### Run on Android

```bash
npm run android
```

### Run on iOS (macOS only)

```bash
npm run ios
```

### Run on Web

```bash
npm run web
```

## Building

### Development Build

```bash
eas build --profile development --platform android
eas build --profile development --platform ios
```

### Preview Build (APK/IPA)

```bash
eas build --profile preview --platform android
eas build --profile preview --platform ios
```

### Production Build

```bash
eas build --profile production --platform android
eas build --profile production --platform ios
```

## Publishing

### Android (Google Play)

```bash
eas build --platform android --profile production
eas submit --platform android
```

### iOS (App Store)

```bash
eas build --platform ios --profile production
eas submit --platform ios
```

## Project Structure

```
mobile/
├── src/
│   ├── screens/         # Screen components
│   │   ├── DashboardScreen.tsx
│   │   ├── FieldHealthScreen.tsx
│   │   ├── MarketScreen.tsx
│   │   └── ReportsScreen.tsx
│   ├── components/      # Reusable components
│   ├── services/        # API client
│   │   └── apiClient.ts
│   ├── locales/         # Translations
│   │   ├── en.json
│   │   └── ar.json
│   └── utils/           # Utility functions
├── android/             # Android native code
├── ios/                 # iOS native code
├── app.json            # Expo config
├── eas.json            # EAS Build config
├── package.json        # Dependencies
└── README.md           # This file
```

## Features

### Camera Access

The app requests camera permission to capture images for AI disease detection.

### Location Services

GPS access for accurate farm location tracking.

### Push Notifications

Real-time alerts for field conditions and market changes.

### Offline Mode

Data is cached locally for offline access.

## Testing

### On Physical Device

1. Install Expo Go app from App Store or Play Store
2. Run `npm start`
3. Scan QR code with Expo Go

### On Emulator/Simulator

Android:
```bash
npm run android
```

iOS (macOS only):
```bash
npm run ios
```

## Debugging

### React Native Debugger

1. Install React Native Debugger
2. Run app in development mode
3. Open debugger: Cmd+D (iOS) or Cmd+M (Android)
4. Select "Debug JS Remotely"

### Expo DevTools

```bash
npx expo start --dev-client
```

## Performance Optimization

- Use React.memo for components
- Implement FlatList for long lists
- Optimize images with expo-image
- Use Hermes engine for faster startup
- Enable ProGuard for Android release builds

## Deployment Checklist

- [ ] Update version in app.json
- [ ] Test on physical devices
- [ ] Check permissions
- [ ] Optimize assets
- [ ] Configure signing keys
- [ ] Test production build
- [ ] Prepare store listings
- [ ] Submit for review

## Environment Variables for Production

Set these in EAS Build:

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_API_BASE_URL` | Backend API URL | Yes |
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase URL | Yes |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Yes |

## Troubleshooting

### Clear Cache

```bash
npx expo start --clear
```

### Reset Metro Bundler

```bash
npx expo start --reset-cache
```

### Clean Build

```bash
cd android && ./gradlew clean
cd ios && xcodebuild clean
```

## Contributing

1. Follow React Native best practices
2. Use TypeScript for type safety
3. Test on both Android and iOS
4. Optimize for performance
5. Follow accessibility guidelines

## License

Copyright © 2025 AgroVision. All rights reserved.
