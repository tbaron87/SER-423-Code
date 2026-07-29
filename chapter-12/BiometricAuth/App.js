import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [authStatus, setAuthStatus] = useState(null);
  const [isCompatible, setIsCompatible] = useState(false);

  useEffect(() => {
    checkCompatibility();
  }, []);

  const checkCompatibility = async () => {
    // Check if the device has biometric hardware
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    // Check if biometrics are enrolled (e.g., fingerprint or face registered)
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setIsCompatible(hasHardware && isEnrolled);
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Access secret information!',
      fallbackLabel: 'Use passcode',
      cancelLabel: 'Cancel',
    });

    if (result.success) {
      setAuthStatus('Authenticated');
    } else {
      setAuthStatus('Not Authenticated');
    }
  };

  return (
    <View style={styles.container}>
      {!isCompatible ? (
        <Text style={styles.warning}>
          Biometric authentication is not available on this device.
        </Text>
      ) : null}
      <TouchableOpacity
        style={[styles.button, !isCompatible ? styles.disabled : null]}
        onPress={authenticate}
        disabled={!isCompatible}
      >
        <Text style={styles.buttonText}>Authenticate</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Authentication Status</Text>
      <Text style={styles.status}>{authStatus}</Text>
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
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  label: {
    textAlign: 'center',
    color: '#333',
    marginTop: 30,
    marginBottom: 5,
    fontSize: 14,
  },
  status: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  warning: {
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
