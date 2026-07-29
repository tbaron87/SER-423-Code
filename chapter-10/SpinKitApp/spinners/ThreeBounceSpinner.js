import { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';

function Dot({ size, color, delay }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const scale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1.0],
  });

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        marginHorizontal: size / 4,
        transform: [{ scale }],
      }}
    />
  );
}

export default function ThreeBounceSpinner({ size = 80, color = '#333' }) {
  const dotSize = size / 4;

  return (
    <View style={styles.container}>
      <Dot size={dotSize} color={color} delay={0} />
      <Dot size={dotSize} color={color} delay={200} />
      <Dot size={dotSize} color={color} delay={400} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
