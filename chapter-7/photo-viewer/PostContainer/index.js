import { useRef } from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PostContainer({ post, onPress = () => {} }) {
  const mainRef = useRef(null);

  const onPressImage = () => {
    mainRef.current.measure((fx, fy, w, h, pageX, pageY) => {
      onPress(post, { width: w, height: h, pageX, pageY });
    });
  };

  const { image, title } = post;

  return (
    <View style={styles.main} ref={mainRef}>
      <TouchableOpacity onPress={onPressImage} activeOpacity={0.9}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    marginBottom: 30,
    paddingBottom: 10,
  },
  image: {
    width,
    height: 300,
  },
  title: {
    margin: 10,
    color: '#ccc',
  },
});
