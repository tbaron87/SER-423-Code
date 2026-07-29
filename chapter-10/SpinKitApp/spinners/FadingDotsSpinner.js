import { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';

function FadingDot({ size, color, delay, angle, radius }) {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: opacityAnim,
        transform: [{ translateX: x }, { translateY: y }],
      }}
    />
  );
}

export default function FadingDotsSpinner({ size = 80, color = '#333' }) {
  const dotSize = size / 6;
  const radius = size / 2 - dotSize;
  const dotCount = 8;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {Array.from({ length: dotCount }).map((_, i) => (
        <FadingDot
          key={i}
          size={dotSize}
          color={color}
          delay={i * 120}
          angle={(360 / dotCount) * i - 90}
          radius={radius}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
