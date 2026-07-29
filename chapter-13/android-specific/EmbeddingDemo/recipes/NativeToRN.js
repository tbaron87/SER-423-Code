import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, NativeModules, NativeEventEmitter } from 'react-native';

const { UserEventManager } = NativeModules;
const eventEmitter = new NativeEventEmitter(UserEventManager);

/**
 * Recipe 2: Native Android → React Native Communication
 *
 * This component receives:
 * - Initial props from the native host (passed via initialProperties bundle)
 * - Live events from the native host via NativeEventEmitter
 *
 * The native side (NativeToRNActivity) passes a userName prop at startup
 * and can emit 'UserNameChanged' events when the user updates it natively.
 */
export default function NativeToRN({ userName: initialUserName = 'World' }) {
  const [userName, setUserName] = useState(initialUserName);

  useEffect(() => {
    const subscription = eventEmitter.addListener('UserNameChanged', (event) => {
      setUserName(event.userName);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {userName}!</Text>
      <Text style={styles.info}>
        This name was passed from the native Android host.
        {'\n'}It updates live when the native side emits an event.
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
