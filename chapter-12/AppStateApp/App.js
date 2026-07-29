import { useState, useEffect, useRef } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [statusMessage, setStatusMessage] = useState('Welcome!');
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // In modern RN, addEventListener returns a subscription object.
    // Call subscription.remove() to clean up when the component unmounts.
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    let message;

    switch (nextAppState) {
      case 'inactive':
        message = 'Good Bye.';
        break;
      case 'background':
        message = 'App Is Hidden...';
        break;
      case 'active':
        message = appState.current !== 'active' ? 'Welcome Back!' : 'Welcome!';
        break;
    }

    appState.current = nextAppState;
    setStatusMessage(message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{statusMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
});
