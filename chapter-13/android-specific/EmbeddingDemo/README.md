# EmbeddingDemo (Android)

This project demonstrates embedding React Native views inside a native Android application. It covers 4 recipes in a single project:

1. **Basic Embed** — A native Activity that hosts a simple RN component
2. **Native → RN** — Passing data from Android to RN via initial props and live events
3. **RN → Native** — Calling a native module method from the RN component
4. **Deep Link** — An Activity that handles URL scheme invocations via RN's Linking API

## Prerequisites

- Android Studio (Arctic Fox or later)
- Node.js 18+
- JDK 17

## Setup

```bash
# 1. Install JavaScript dependencies
npm install

# 2. Start the Metro bundler
npx react-native start

# 3. In a separate terminal, build and run on Android
npx react-native run-android
```

## Project Structure

```
index.js                   ← Registers all 4 RN components (one per recipe)
recipes/
  BasicEmbed.js            ← Recipe 1: simple "Hello from RN" view
  NativeToRN.js            ← Recipe 2: receives props + events from native
  RNToNative.js            ← Recipe 3: calls NativeModules.UserNameManager
  DeepLink.js              ← Recipe 4: listens for Linking URL events
android/app/src/main/java/com/embeddingdemo/
  MainActivity.kt          ← Native menu (plain AppCompatActivity, no RN)
  BasicEmbedActivity.kt    ← Recipe 1: ReactActivity loading "BasicEmbed"
  NativeToRNActivity.kt    ← Recipe 2: passes initial props + emits events
  RNToNativeActivity.kt    ← Recipe 3: hosts "RNToNative" component
  DeepLinkActivity.kt      ← Recipe 4: intent-filter for embeddingdemo:// scheme
  UserEventManager.kt      ← Recipe 2: NativeEventEmitter support module
  UserNameManager.kt       ← Recipe 3: native module receiving setUserName calls
  EmbeddingPackage.kt      ← Registers both native modules
  MainApplication.kt       ← Standard RN host setup
```

## How It Works

The key insight is that `AppRegistry.registerComponent` can register *multiple* named components, and each native `ReactActivity` specifies which one to load via `getMainComponentName()`. This lets a single JS bundle serve multiple embedded RN experiences.

### Recipe 1: Basic Embedding
The simplest case — `BasicEmbedActivity` extends `ReactActivity` and returns `"BasicEmbed"` from `getMainComponentName()`.

### Recipe 2: Native → RN
`NativeToRNActivity` passes initial props via `getLaunchOptions()` Bundle, then emits a `"UserNameChanged"` event after 3 seconds to demonstrate live native → RN communication.

### Recipe 3: RN → Native
The RN component calls `NativeModules.UserNameManager.setUserName(text)`. The Kotlin `UserNameManager` receives it and logs it — demonstrating how RN can push data back to the native host.

### Recipe 4: Deep Links
`DeepLinkActivity` has an intent-filter for `embeddingdemo://` URLs. When invoked (e.g., via `adb shell am start -a android.intent.action.VIEW -d "embeddingdemo://test"`), the RN Linking API receives the URL.
