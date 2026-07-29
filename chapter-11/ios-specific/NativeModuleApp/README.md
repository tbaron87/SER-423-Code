# NativeModuleApp (iOS)

This project demonstrates how to write a custom native module in **Swift** and call it from JavaScript via React Native's bridge.

## Prerequisites

- macOS with Xcode 15+ installed
- CocoaPods (`sudo gem install cocoapods`)
- Node.js 18+

## Setup

```bash
# 1. Install JavaScript dependencies
npm install

# 2. Generate the Xcode project and install native dependencies
cd ios
pod install
cd ..

# 3. Run the app
npx react-native run-ios
```

> **Note:** The first `pod install` generates the `.xcodeproj` and `.xcworkspace` files. These are not committed to git because they are machine-generated. If you see build errors, try `cd ios && pod install --repo-update`.

## Project Structure

```
App.js                         ← JS: calls NativeModules.HelloManager
ios/
  Podfile                      ← CocoaPods configuration
  NativeModuleApp/
    AppDelegate.swift          ← App entry point
    HelloManager.swift         ← Native module implementation (Swift)
    HelloManager.m             ← Bridge registration (Obj-C, required for Swift modules)
    NativeModuleApp-Bridging-Header.h  ← Imports RN Obj-C headers for Swift
```

## How the Native Module Works

1. **HelloManager.swift** defines the module class with `@objc(HelloManager)` and exposes `greetUser` via `@objc`
2. **HelloManager.m** uses `RCT_EXTERN_MODULE` and `RCT_EXTERN_METHOD` to register the Swift class with RN's Objective-C bridge
3. **App.js** accesses it via `NativeModules.HelloManager.greetUser(name, isAdmin, callback)`
