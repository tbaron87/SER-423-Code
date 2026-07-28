import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// NOTE: Replace this with your server's URL (e.g., ngrok URL during development)
const PUSH_REGISTRATION_ENDPOINT = 'http://localhost:3000/token';
const MESSAGE_ENDPOINT = 'http://localhost:3000/message';

export default function App() {
  const [notification, setNotification] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotifications().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // Listen for incoming notifications while the app is open
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // Listen for when user taps on a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notification tapped:', response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotifications = async () => {
    // Push notifications only work on physical devices
    if (!Device.isDevice) {
      alert('Push notifications require a physical device');
      return null;
    }

    // Check existing permission status
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Request permission if not already granted
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token — permission not granted');
      return null;
    }

    // Get the Expo push token
    // NOTE: You need a projectId from your EAS project for this to work.
    // Run `npx expo install --fix` and configure EAS, or set the projectId below.
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: projectId || 'YOUR_PROJECT_ID_HERE',
    });
    const token = tokenData.data;

    // Register token with our server
    await fetch(PUSH_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: { value: token },
        user: { username: 'warly', name: 'Dan Ward' },
      }),
    });

    // Android requires a notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return token;
  };

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    await fetch(MESSAGE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: messageText }),
    });

    setMessageText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notifications Demo</Text>

      <TextInput
        value={messageText}
        onChangeText={setMessageText}
        style={styles.textInput}
        placeholder="Type a message to send..."
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      {notification ? (
        <View style={styles.notificationContainer}>
          <Text style={styles.label}>A new message was received!</Text>
          <Text style={styles.notificationText}>
            {notification.request.content.data?.message}
          </Text>
        </View>
      ) : null}

      {expoPushToken ? (
        <Text style={styles.tokenText}>Token: {expoPushToken}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474747',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: '#f6f6f6',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  notificationContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  notificationText: {
    fontSize: 16,
    color: '#ccc',
  },
  tokenText: {
    marginTop: 20,
    fontSize: 10,
    color: '#aaa',
  },
});
