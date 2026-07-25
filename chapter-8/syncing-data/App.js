import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const [isConnected, setIsConnected] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const pendingSync = useRef(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected;
      setIsConnected(connected);

      if (connected && pendingSync.current) {
        setSyncStatus('Syncing');
        submitData(pendingSync.current).then(() => {
          setSyncStatus('Sync Complete');
          pendingSync.current = null;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const submitData = async (requestBody) => {
    const response = await fetch('http://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const responseText = await response.text();
    setServerResponse(responseText);
  };

  const onSubmitPress = () => {
    const requestBody = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    if (isConnected) {
      submitData(requestBody);
    } else {
      pendingSync.current = requestBody;
      setSyncStatus('Pending');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSubmitPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Submit Data</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.status}>
        Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
      </Text>
      <Text style={styles.status}>
        Sync Status: {syncStatus}
      </Text>
      <Text style={styles.status}>
        Server Response: {serverResponse}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3E6C7F',
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  status: {
    fontSize: 20,
  },
});
