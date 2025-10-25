# 🚀 GitHub Actions CI/CD Setup for AgroVision Mobile

This document provides instructions for setting up and using the GitHub Actions workflows for building and deploying the AgroVision mobile application.

## 📋 Overview

The project includes three main workflows:

1. **Android Build** (`android.yml`) - Builds Android APK/AAB
2. **iOS Build** (`ios.yml`) - Builds iOS IPA for simulator/device
3. **Release** (`release.yml`) - Creates versioned releases with automated builds

## 🔧 Prerequisites

### 1. Expo Account Setup

1. Create an Expo account at https://expo.dev
2. Create a new project in Expo dashboard
3. Generate an Expo access token:
   - Go to https://expo.dev/accounts/[username]/settings/access-tokens
   - Create a new token
   - Copy the token value

### 2. GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

#### Required Secrets

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `EXPO_TOKEN` | Expo account access token | Expo Dashboard → Settings → Access Tokens |
| `APPLE_ID` | Apple Developer account email | Your Apple ID email |
| `APPLE_APP_SPECIFIC_PASSWORD` | App-specific password | appleid.apple.com → Sign-In and Security → App-Specific Passwords |
| `APPLE_TEAM_ID` | Apple Developer Team ID | developer.apple.com → Membership |

#### Optional Secrets (for advanced features)

| Secret Name | Description |
|-------------|-------------|
| `GOOGLE_SERVICES_JSON` | Google Services configuration (Firebase) |
| `SLACK_WEBHOOK_URL` | Slack webhook for build notifications |

### 3. EAS CLI Configuration

Install EAS CLI locally to configure your project:

```bash
npm install -g eas-cli
cd agrovision-mobile
eas login
eas build:configure
```

This will:
- Link your project to Expo
- Generate build credentials
- Create iOS provisioning profiles (if needed)
- Set up Android keystore (if needed)

## 🏗️ Workflow Details

### Android Build Workflow

**File**: `.github/workflows/android.yml`

**Triggers**:
- Push to `main` or `develop` branches (when `agrovision-mobile/**` files change)
- Pull requests to `main` or `develop`
- Manual workflow dispatch

**Build Types**:
- **APK** (default): For development and testing
- **AAB**: For Google Play Store production releases

**Usage**:

```bash
# Automatic: Push to main/develop
git push origin main

# Manual: GitHub UI
# Go to Actions → Android Build → Run workflow
# Select branch and build type (apk/aab)
```

**Build Profiles**:
- `preview`: Creates APK for internal testing
- `production`: Creates AAB for Play Store

### iOS Build Workflow

**File**: `.github/workflows/ios.yml`

**Triggers**:
- Push to `main` or `develop` branches (when `agrovision-mobile/**` files change)
- Pull requests to `main` or `develop`
- Manual workflow dispatch

**Build Types**:
- **Simulator** (default): For iOS Simulator testing
- **Device**: For physical device testing and App Store

**Usage**:

```bash
# Automatic: Push to main/develop
git push origin main

# Manual: GitHub UI
# Go to Actions → iOS Build → Run workflow
# Select branch and build type (simulator/device)
```

**Build Profiles**:
- `development`: Creates build for iOS Simulator
- `production`: Creates build for physical devices and App Store

### Release Workflow

**File**: `.github/workflows/release.yml`

**Triggers**:
- Push tag matching `v*.*.*` (e.g., `v1.0.0`)
- Manual workflow dispatch

**Features**:
- Creates GitHub Release
- Generates changelog from commits
- Builds both Android and iOS
- Attaches build artifacts

**Usage**:

```bash
# Option 1: Git Tag
git tag v1.0.0
git push origin v1.0.0

# Option 2: GitHub CLI
gh release create v1.0.0 --generate-notes

# Option 3: GitHub UI
# Go to Actions → Version Tag and Release → Run workflow
# Enter version number (e.g., 1.0.0)
```

## 🔄 Workflow Process

### Standard Development Flow

1. **Development**:
   ```bash
   git checkout -b feature/new-feature
   # Make changes to agrovision-mobile/
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

2. **Pull Request**:
   - Create PR to `develop` branch
   - CI runs Android and iOS builds automatically
   - Review and merge when tests pass

3. **Release to Main**:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

4. **Create Release**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   - Release workflow triggers
   - Builds are created on EAS
   - GitHub Release is published

### Build Status

Monitor builds in:
- **GitHub Actions**: https://github.com/[org]/[repo]/actions
- **Expo Dashboard**: https://expo.dev/accounts/[account]/projects/agrovision-mobile/builds

## 📱 Downloading Builds

### From EAS Dashboard

1. Go to https://expo.dev/accounts/[account]/projects/agrovision-mobile/builds
2. Find your build
3. Click "Download" to get APK/IPA

### From GitHub Releases

1. Go to https://github.com/[org]/[repo]/releases
2. Select the version
3. Download artifacts (when attached)

### Installing Builds

**Android APK**:
```bash
# Via ADB
adb install app.apk

# Or transfer to device and install manually
```

**iOS IPA**:
- Use Xcode to install on connected device
- Or distribute via TestFlight

## 🐛 Troubleshooting

### Build Fails with "EXPO_TOKEN not set"

**Solution**: Ensure `EXPO_TOKEN` secret is configured in GitHub repository settings.

### iOS Build Fails with Authentication Error

**Solution**: 
1. Verify `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, and `APPLE_TEAM_ID` secrets
2. Ensure Apple Developer account is active
3. Check that certificates and provisioning profiles are valid

### Android Build Fails with Keystore Error

**Solution**:
1. Run `eas credentials` to configure Android keystore
2. Ensure EAS has access to generate/store credentials

### Build Stuck on "Waiting in queue"

**Solution**:
- Free Expo accounts have limited concurrent builds
- Wait for previous builds to complete
- Consider upgrading to Expo paid plan

### Workflow Not Triggering

**Solution**:
1. Ensure changes are in `agrovision-mobile/` directory
2. Check workflow file syntax
3. Verify branch names match workflow triggers

## 🔐 Security Best Practices

1. **Never commit secrets**: Use GitHub Secrets only
2. **Rotate tokens**: Regularly update `EXPO_TOKEN` and Apple credentials
3. **Use environment-specific configs**: Different API keys for dev/prod
4. **Enable 2FA**: On both GitHub and Expo accounts
5. **Review permissions**: Limit workflow permissions to minimum required

## 📊 Monitoring and Notifications

### GitHub Notifications

Workflows send notifications on:
- ✅ Build success
- ❌ Build failure
- ⏰ Build timeout

### Adding Slack Notifications

Add to workflow:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## 🚀 Optimization Tips

1. **Cache Dependencies**: Workflows use npm cache to speed up installs
2. **Parallel Jobs**: Android and iOS can build simultaneously
3. **Build Filters**: Workflows only trigger on `agrovision-mobile/` changes
4. **EAS Build Priorities**: Use priority flag for urgent builds

## 📚 Additional Resources

- [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Native Documentation](https://reactnative.dev/)
- [iOS App Distribution](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases)
- [Android App Distribution](https://developer.android.com/studio/publish)

## 🤝 Support

For issues with:
- **Workflows**: Open a GitHub issue
- **EAS Builds**: Contact Expo support
- **App Store submission**: Check Apple Developer documentation
- **Play Store submission**: Check Google Play Console documentation

---

Last Updated: 2024-10-25
