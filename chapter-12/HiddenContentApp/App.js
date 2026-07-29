import { useState, useEffect, useRef } from 'react';
import { AppState, StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  const [showMask, setShowMask] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = (nextAppState) => {
    // Show the mask when the app is not active (background or inactive)
    setShowMask(nextAppState !== 'active');
    appState.current = nextAppState;
  };

  if (showMask) {
    return (
      <View style={styles.maskContainer}>
        <Image source={require('./assets/hidden.jpg')} style={styles.maskImage} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>
        This content is hidden when the app loses focus.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#666',
    margin: 10,
  },
  maskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
});
