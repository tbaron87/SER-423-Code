import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Notification from './Notification';

export default function App() {
  const [notify, setNotify] = useState(false);
  const message = 'This is a notification!';

  const toggleNotification = () => {
    setNotify(!notify);
  };

  return (
    <SafeAreaView>
      <Text style={styles.toolbar}>Main toolbar</Text>
      <View style={styles.content}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna.
        </Text>
        <TouchableOpacity
          onPress={toggleNotification}
          style={styles.btn}
        >
          <Text style={styles.text}>Show notification</Text>
        </TouchableOpacity>
        <Text>
          Sed ut perspiciatis unde omnis iste natus error sit
          accusantium doloremque laudantium.
        </Text>
        {notify ? (
          <Notification
            autoHide
            message={message}
            onClose={toggleNotification}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#8e44ad',
    color: '#fff',
    fontSize: 22,
    padding: 20,
    textAlign: 'center',
  },
  content: {
    padding: 10,
    overflow: 'hidden',
  },
  btn: {
    margin: 10,
    backgroundColor: '#9b59b6',
    borderRadius: 3,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
  },
});
