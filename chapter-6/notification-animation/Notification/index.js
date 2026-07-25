import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
} from 'react-native';

export default function Notification({
  delay = 5000,
  onClose = () => {},
  onOpen = () => {},
  message,
  autoHide,
}) {
  const [height, setHeight] = useState(-1000);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const getAnimation = (value, withDelay) =>
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 500,
      easing: Easing.cubic,
      delay: withDelay ? delay : 0,
      useNativeDriver: false,
    });

  const startSlideOut = () => {
    animatedValue.setValue(1);
    getAnimation(0, autoHide).start(() => onClose());
  };

  const startSlideIn = () => {
    animatedValue.setValue(0);
    getAnimation(1).start(() => {
      onOpen();
      if (autoHide) {
        startSlideOut();
      }
    });
  };

  useEffect(() => {
    startSlideIn();
  }, []);

  const onLayoutChange = (event) => {
    const { layout: { height: h } } = event.nativeEvent;
    if (height === -1000) {
      setHeight(h);
    }
  };

  const top = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  return (
    <Animated.View
      onLayout={onLayoutChange}
      style={[styles.main, { top }]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  text: {
    color: '#fff',
  },
});
