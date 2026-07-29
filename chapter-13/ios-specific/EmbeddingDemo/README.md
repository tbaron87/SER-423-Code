# EmbeddingDemo (iOS)

This project demonstrates embedding React Native views inside a native iOS application. It covers 4 recipes in a single project:

1. **Basic Embed** — A native ViewController that hosts a simple RN component
2. **Native → RN** — Passing data from Swift to RN via initial props and live events
3. **RN → Native** — Calling a native module method from the RN component
4. **Deep Link** — Handling URL scheme invocations via RN's Linking API

## Prerequisites

- macOS with Xcode 15+ installed
- CocoaPods (`sudo gem install cocoapods`)
- Node.js 18+

## Setup

```bash
# 1. Install JavaScript dependencies
npm install

# 2. Install native dependencies
cd ios
pod install
cd ..

# 3. Start the Metro bundler
npx react-native start

# 4. In a separate terminal (or use Xcode)
npx react-native run-ios
```

## Project Structure

```
index.js                   ← Registers all 4 RN components (one per recipe)
recipes/
  BasicEmbed.js            ← Recipe 1: simple "Hello from RN" view
  NativeToRN.js            ← Recipe 2: receives props + events from native
  RNToNative.js            ← Recipe 3: calls NativeModules.UserNameManager
  DeepLink.js              ← Recipe 4: listens for Linking URL events
ios/
  Podfile                  ← CocoaPods configuration
  EmbeddingDemo/
    AppDelegate.swift      ← App entry + deep link handling
    UserEventManager.swift ← Recipe 2: NativeEventEmitter support module
    UserEventManager.m     ← Bridge registration
    UserNameManager.swift  ← Recipe 3: receives setUserName calls from RN
    UserNameManager.m      ← Bridge registration
    EmbeddingDemo-Bridging-Header.h ← Imports RN Obj-C headers for Swift
```

## How It Works

The key insight is that `AppRegistry.registerComponent` can register *multiple* named components. Each native view controller can create an `RCTRootView` with a different `moduleName` to load a specific recipe.

### Recipe 1: Basic Embedding
The app loads the "BasicEmbed" component — the simplest case of embedding RN in a native iOS app.

### Recipe 2: Native → RN
Initial props are passed via `RCTRootView(initialProperties:)`. Live events use `RCTEventEmitter.sendEvent(withName:body:)` — the RN side listens via `NativeEventEmitter`.

### Recipe 3: RN → Native
The RN component calls `NativeModules.UserNameManager.setUserName(text)`. The Swift `UserNameManager` receives it and posts an `NSNotification` that native code can observe.

### Recipe 4: Deep Links
`AppDelegate` implements `application(_:open:options:)` and forwards to `RCTLinkingManager`. The RN Linking API receives the URL. Test with:
```
xcrun simctl openurl booted "embeddingdemo://test"
```

## Comparison with Android Version

The JS code (index.js + recipes/) is **identical** between the Android and iOS versions of this project. Only the native host code differs:
- Android: Kotlin Activities + Gradle
- iOS: Swift AppDelegate + CocoaPods
