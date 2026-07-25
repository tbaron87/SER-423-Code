import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const icons = {
  angry: require('./images/angry.png'),
  heart: require('./images/heart.png'),
  laughing: require('./images/laughing.png'),
  like: require('./images/like.png'),
  surprised: require('./images/surprised.png'),
};

export default function Icon({ name, index, delay = 0, onPress = () => {} }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.elastic(1),
      delay,
      useNativeDriver: false,
    }).start();
  }, []);

  const left = index * 50;
  const top = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -95],
  });
  const opacity = animatedValue;

  return (
    <Animated.View style={[styles.icon, { top, left, opacity }]}>
      <TouchableOpacity onPress={() => onPress(name)}>
        <Image source={icons[name]} style={styles.image} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
  },
  image: {
    width: 40,
    height: 40,
  },
});
