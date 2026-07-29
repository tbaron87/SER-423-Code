import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';

/**
 * Recipe 4: Handling Deep Link Invocation
 *
 * This component listens for URL-based invocations from external apps.
 * When another app opens a URL with our scheme (e.g., embeddingdemo://hello),
 * the Linking API receives it and we display the URL.
 *
 * To test: adb shell am start -a android.intent.action.VIEW -d "embeddingdemo://test"
 */
export default function DeepLink() {
  const [status, setStatus] = useState('App Running — waiting for invocation');

  useEffect(() => {
    // Check if the app was opened via a URL (cold start)
    Linking.getInitialURL().then((url) => {
      if (url) {
        setStatus(`App launched by: ${url}`);
      }
    });

    // Listen for URL events while the app is open (warm start)
    const subscription = Linking.addEventListener('url', (event) => {
      setStatus(`App invoked by: ${event.url}`);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>App Status:</Text>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.hint}>
        Test with:{'\n'}adb shell am start -a android.intent.action.VIEW -d "embeddingdemo://test"
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
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  status: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingHorizontal: 20,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
