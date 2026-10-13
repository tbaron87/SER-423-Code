import { useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

/**
 * lottie-react-native — JSON-Based Animations
 * --------------------------------------------
 * Install:  npx expo install lottie-react-native
 * Docs:     https://github.com/lottie-react-native/lottie-react-native
 * Free animations: https://lottiefiles.com
 *
 * Lottie renders animations that designers export from Adobe After Effects
 * (via the Bodymovin plugin) as JSON. Instead of hand-coding every frame, you
 * drop in a .json file and the library plays it natively.
 *
 * This is a different flavor of "third party plugin": rather than a UI
 * component or a native capability, it integrates an external ASSET PIPELINE.
 * Browse thousands of free animations at lottiefiles.com, download the JSON,
 * and load it with `source={require('./path/to/animation.json')}`.
 *
 * The animation below (a pulsing circle) is a small hand-written Lottie file
 * in assets/pulse.json so the example is self-contained.
 */
export default function LottieExample() {
  const animationRef = useRef(null);

  useEffect(() => {
    // Play automatically when the example mounts.
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>
        A Lottie animation loaded from a JSON file
      </Text>
      <LottieView
        ref={animationRef}
        source={require('../assets/pulse.json')}
        style={styles.animation}
        autoPlay
        loop
      />
      <Text style={styles.hint}>
        Swap in any animation from lottiefiles.com by replacing the JSON file.
      </Text>
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
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 20,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
});
