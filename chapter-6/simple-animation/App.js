import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const cloudImage = require('./assets/images/cloud.png');
const imageHeight = 200;
const imageWidth = 300;

export default function App() {
  const animatedValue = useRef(new Animated.Value(width)).current;

  const startAnimation = () => {
    animatedValue.setValue(width);
    Animated.timing(animatedValue, {
      toValue: -imageWidth,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startAnimation());
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.background}>
      <Animated.Image
        style={[styles.image, { left: animatedValue }]}
        source={cloudImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  image: {
    height: imageHeight,
    position: 'absolute',
    top: height / 3,
    width: imageWidth,
  },
});
