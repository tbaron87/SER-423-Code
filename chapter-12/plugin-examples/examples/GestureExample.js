import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

/**
 * react-native-gesture-handler — Native Touch & Gestures
 * -------------------------------------------------------
 * Install:  npx expo install react-native-gesture-handler react-native-reanimated
 * Docs:     https://docs.swmansion.com/react-native-gesture-handler/
 *
 * This library exposes the platform's native touch system, letting you build
 * pan, pinch, rotation, swipe, and other gestures that run on the native thread
 * (so they stay smooth even when JS is busy).
 *
 * NOTE: The whole app must be wrapped in <GestureHandlerRootView> (see App.js),
 * and the modern Gesture API pairs naturally with react-native-reanimated's
 * shared values for buttery-smooth movement.
 *
 * You may already be using this library indirectly — @react-navigation/drawer
 * (from the side-menu example in chapter 10) depends on it!
 */
export default function GestureExample() {
  // Shared values live on the UI thread for smooth, native-driven animation.
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onEnd(() => {
      // Spring back to center when released.
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Drag the box — it springs back when released</Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Text style={styles.boxText}>Drag me</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontSize: 13,
    color: '#666',
    marginBottom: 40,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  box: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#9b59b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
