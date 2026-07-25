import { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Image,
  Easing,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const cloudImage1 = require('./assets/images/cloud.png');
const cloudImage2 = require('./assets/images/cloud.png');
const planeImage = require('./assets/images/plane.gif');
const cloudHeight = 100;
const cloudWidth = 150;
const planeHeight = 60;
const planeWidth = 100;

export default function App() {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    animatedValue.setValue(1);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startAnimation());
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const left1 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-cloudWidth, width],
  });

  const left2 = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-cloudWidth * 5, width + cloudWidth * 5],
  });

  return (
    <View style={styles.background}>
      <Animated.Image
        style={[styles.cloud1, { left: left1 }]}
        source={cloudImage1}
      />
      <Image style={styles.plane} source={planeImage} />
      <Animated.Image
        style={[styles.cloud2, { left: left2 }]}
        source={cloudImage2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  cloud1: {
    position: 'absolute',
    width: cloudWidth,
    height: cloudHeight,
    top: height / 3 - cloudWidth / 2,
  },
  cloud2: {
    position: 'absolute',
    width: cloudWidth * 1.5,
    height: cloudHeight * 1.5,
    top: height / 2,
  },
  plane: {
    position: 'absolute',
    height: planeHeight,
    width: planeWidth,
    top: height / 2 - planeHeight,
    left: width / 2 - planeWidth,
  },
});
