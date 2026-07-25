import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PhotoViewer({ post, position, onClose = () => {} }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  const { image, title } = post;

  const top = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [position.pageY, height / 2 - position.height / 2],
  });
  const opacity = animatedValue;

  return (
    <Animated.View style={[styles.main, { opacity }]}>
      <Animated.Image
        source={image}
        style={[styles.image, { top, opacity }]}
      />
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeBtnText}>X</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#000',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  image: {
    width,
    height: 300,
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  closeBtnText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
