# Third Party Plugin Examples

A companion demo for the **Module 12: Using Third Party Plugins** lecture. It shows three currently-maintained, Expo-compatible third party libraries — each demonstrating a *different kind* of plugin integration.

| Example | Library | Kind of plugin | Works in Expo Go? |
|---------|---------|----------------|-------------------|
| SVG | `react-native-svg` | Rendering primitives (vector graphics) | ✅ Yes |
| Lottie | `lottie-react-native` | External asset pipeline (After Effects JSON) | ✅ Yes |
| Gesture | `react-native-gesture-handler` + `react-native-reanimated` | Native capability (touch/gestures) | ✅ Yes |

All three are maintained as of 2026. `react-native-svg` and `react-native-gesture-handler` are maintained by Software Mansion and are official Expo SDK packages.

## Setup

```bash
npm ci        # installs the exact locked versions
npm start     # start the Expo dev server
```

Then open the app in Expo Go (or an emulator/simulator) and use the tabs at the top to switch between the three examples.

## What each example teaches

### SVG (`examples/SvgExample.js`)
Draws a smiley face and basic shapes using declarative `<Svg>` / `<Circle>` / `<Rect>` / `<Path>` components. Vectors stay crisp at any size.

### Lottie (`examples/LottieExample.js`)
Plays a looping animation loaded from `assets/pulse.json`. You can download any free animation from [lottiefiles.com](https://lottiefiles.com) and swap the JSON file to see it change — no code changes needed.

### Gesture (`examples/GestureExample.js`)
A draggable box using the modern `Gesture.Pan()` API with Reanimated shared values. The box follows your finger on the native thread and springs back to center when released. (Fun fact: the chapter 10 side-menu example already uses this library indirectly through `@react-navigation/drawer`.)

## Notes for the next course run

These versions are pinned for Expo SDK 52. When upgrading the SDK, re-pin each library with `npx expo install <library>` so Expo picks the compatible version, then regenerate `package-lock.json`.
