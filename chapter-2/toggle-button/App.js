import { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';

const heartIcon = require('./images/heart.png');

export default function App() {
  const [liked, setLiked] = useState(false);

  const handleButtonPress = () => {
    setLiked(!liked);
  };

  const likedStyles = liked ? styles.liked : undefined;

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={handleButtonPress}
        style={styles.button}
        underlayColor="#fefefe"
      >
        <Image
          source={heartIcon}
          style={[styles.icon, likedStyles]}
        />
      </TouchableHighlight>
      <Text style={styles.text}>Do you like this app?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
  },
  icon: {
    width: 180,
    height: 180,
    tintColor: '#f1f1f1',
  },
  liked: {
    tintColor: '#e74c3c',
  },
  text: {
    marginTop: 20,
  },
});
