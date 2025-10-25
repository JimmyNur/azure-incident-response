# 🚀 Quick Start Guide - AgroVision Mobile

## Immediate Next Steps

### 1️⃣ Setup Expo Account (5 minutes)
```bash
# Visit https://expo.dev and create an account
# Then login locally:
npm install -g eas-cli expo-cli
eas login
```

### 2️⃣ Configure GitHub Secrets (3 minutes)
Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Add:
- **Name**: `EXPO_TOKEN`
- **Value**: Get from https://expo.dev/accounts/[username]/settings/access-tokens

### 3️⃣ Initialize Project (5 minutes)
```bash
cd agrovision-mobile
npm install
eas build:configure
```

### 4️⃣ Test Workflows (2 minutes)
**Option A - Automatic:**
```bash
git checkout -b test/build-check
touch agrovision-mobile/test.txt
git add .
git commit -m "Test workflow trigger"
git push origin test/build-check
```

**Option B - Manual:**
1. Go to GitHub → Actions
2. Select "Android Build" or "iOS Build"
3. Click "Run workflow"
4. Select branch and build type
5. Click "Run workflow" button

### 5️⃣ Monitor Build
- Visit: https://expo.dev/accounts/[account]/projects/agrovision-mobile/builds
- Or check: GitHub → Actions tab

### 6️⃣ Create Release (when ready)
```bash
git checkout main
git tag v1.0.0
git push origin v1.0.0
```

---

## Common Commands

### Development
```bash
npm start              # Start Expo dev server
npm run android        # Run on Android emulator
npm run ios            # Run on iOS simulator
npm run web            # Run in web browser
```

### Building
```bash
npm run build:android  # Build Android
npm run build:ios      # Build iOS
npm run build:all      # Build both platforms
```

### Testing
```bash
npm test               # Run tests
npm run lint           # Check code style
```

---

## Troubleshooting

### Build fails with "EXPO_TOKEN not found"
✅ **Solution**: Add `EXPO_TOKEN` to GitHub repository secrets

### "No such file: package-lock.json"
✅ **Solution**: Run `npm install` in agrovision-mobile directory first

### Workflow doesn't trigger
✅ **Solution**: Ensure changes are in `agrovision-mobile/` directory

### iOS build fails
✅ **Solution**: Add Apple credentials to secrets (for production builds)

---

## File Structure Quick Reference

```
agrovision-mobile/
├── App.js              ← Main entry point
├── package.json        ← Dependencies
├── app.json            ← Expo config
├── eas.json            ← Build profiles
├── .env.example        ← Copy to .env and edit
└── README.md           ← Full documentation

.github/workflows/
├── android.yml         ← Android CI/CD
├── ios.yml             ← iOS CI/CD
└── release.yml         ← Version releases
```

---

## Support Resources

- 📖 **Full Documentation**: `agrovision-mobile/README.md`
- 🔧 **CI/CD Setup**: `agrovision-mobile/CICD_SETUP.md`
- 📋 **Implementation**: `IMPLEMENTATION_SUMMARY.md`
- 🌐 **Expo Docs**: https://docs.expo.dev
- 🐙 **GitHub Actions**: https://docs.github.com/actions

---

**Ready to build AgroVision! 🌾**
