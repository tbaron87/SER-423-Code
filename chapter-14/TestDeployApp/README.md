# TestDeployApp — OTA Updates with EAS

This project demonstrates **Over-The-Air (OTA) updates** using Expo's EAS Update service. OTA updates let you push JavaScript and asset changes to users instantly — without going through the App Store or Play Store review process.

## What This Replaces

The original recipe used HockeyApp (Microsoft), which was shut down in November 2019. The modern equivalent is **EAS (Expo Application Services)**, which provides:
- OTA updates (push JS changes without a new build)
- Cloud builds (build iOS/Android binaries without local tooling)
- App submission (publish to stores from CI)

## Running in Development

```bash
npm install
npx expo start
```

In development mode (Expo Go), OTA updates are disabled — the app shows "Updates disabled (running in dev mode)" which is expected. The Metro bundler handles code changes in dev.

## Setting Up EAS (Production)

To see OTA updates work for real:

```bash
# 1. Install the EAS CLI
npm install -g eas-cli

# 2. Log in to your Expo account (free)
eas login

# 3. Configure the project for EAS
eas update:configure

# 4. Create a production build
eas build --platform android  # or --platform ios

# 5. Make a code change, then publish an update
eas update --branch production --message "My first update"
```

After step 5, the next time the production app launches, it will detect and download the update.

## How OTA Updates Work

1. **Build phase**: `eas build` creates a native binary with a specific `runtimeVersion`
2. **Update phase**: `eas update` uploads a new JS bundle to Expo's CDN
3. **Client phase**: On launch, the app calls `Updates.checkForUpdateAsync()` to see if a newer JS bundle is available for its `runtimeVersion`
4. **Apply phase**: If found, `Updates.fetchUpdateAsync()` downloads it; `Updates.reloadAsync()` restarts with the new bundle

## Key Concepts

- **Runtime Version**: Determines compatibility. An update is only applied if it matches the binary's runtime version. Change this when you modify native code.
- **Channel/Branch**: Lets you target updates to specific groups (e.g., production vs staging).
- **Rollbacks**: EAS keeps previous update versions; you can roll back instantly.

## app.json Configuration

The `updates.url` field in `app.json` needs your project's EAS URL. After running `eas update:configure`, this is filled in automatically.
