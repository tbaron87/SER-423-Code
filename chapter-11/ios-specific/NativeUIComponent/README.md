# NativeUIComponent (iOS)

This project demonstrates how to write a custom native **UI component** in **Swift** and use it from JavaScript via React Native's bridge.

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

> **Note:** The first `pod install` generates the `.xcodeproj` and `.xcworkspace` files. These are not committed to git because they are machine-generated.

## Project Structure

```
App.js                         ← JS: uses the native <Button> component
components/
  Button.js                    ← JS wrapper using requireNativeComponent('ButtonView')
ios/
  Podfile                      ← CocoaPods configuration
  NativeUIComponent/
    AppDelegate.swift          ← App entry point
    ButtonViewManager.swift    ← Native UI component (Swift ViewManager + UIButton subclass)
    ButtonViewManager.m        ← Bridge registration (Obj-C, required for Swift ViewManagers)
    NativeUIComponent-Bridging-Header.h  ← Imports RN Obj-C headers for Swift
```

## How the Native UI Component Works

1. **ButtonViewManager.swift** subclasses `RCTViewManager` and returns a `NativeButton` (UIButton subclass) from `view()`
2. **NativeButton** accepts a `buttonText` prop and has an `onChange` callback block that fires on tap
3. **ButtonViewManager.m** uses `RCT_EXTERN_MODULE` and `RCT_EXPORT_VIEW_PROPERTY` to register the Swift class with RN's Obj-C bridge
4. **components/Button.js** uses `requireNativeComponent('ButtonView')` and maps `onChange` → `onTap`

## Native Module vs Native UI Component

Compare this project with the NativeModuleApp in the same chapter:
- **Native Module** (`RCTBridgeModule`): exposes *methods* to JS (call a function, get a result)
- **Native UI Component** (`RCTViewManager`): exposes a *view* to JS (render native UI, set props, receive events)
