import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeEventEmitter,
  TouchableOpacity,
} from 'react-native';

const { BackgroundTaskManager } = NativeModules;
const taskEventEmitter = new NativeEventEmitter(BackgroundTaskManager);

/**
 * This app demonstrates that native background threads don't block the JS/UI thread:
 * 1. "Run Task" triggers a 5-second background operation in Kotlin (coroutine)
 * 2. While that runs, tapping "Increase Counter" still works — proving non-blocking
 * 3. Native code emits progress events back to JS via NativeEventEmitter
 */
export default function App() {
  const [backgroundTaskStatus, setBackgroundTaskStatus] = useState('Not Started');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const subscription = taskEventEmitter.addListener('backgroundProgress', (event) => {
      setBackgroundTaskStatus(event.status);
    });

    return () => subscription.remove();
  }, []);

  const runBackgroundTask = () => {
    BackgroundTaskManager.loadInBackground();
  };

  const increaseCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={runBackgroundTask}>
        <Text style={styles.buttonText}>Run Task</Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>Background Task Status:</Text>
      <Text style={styles.status}>{backgroundTaskStatus}</Text>
      <Text style={styles.instructions}>
        Pressing "Increase Counter" shows the task is not blocking the main thread
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.altButton]}
        onPress={increaseCounter}
      >
        <Text style={styles.buttonText}>Increase Counter</Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>Current Count:</Text>
      <Text style={styles.status}>{counter}</Text>
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
  status: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 5,
  },
  altButton: {
    backgroundColor: '#3B5998',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
