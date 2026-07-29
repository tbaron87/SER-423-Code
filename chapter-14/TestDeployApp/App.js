import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

/**
 * This app demonstrates Over-The-Air (OTA) updates with Expo.
 *
 * OTA updates allow you to push JavaScript/asset changes to users
 * without going through the App Store / Play Store review process.
 *
 * How it works:
 * 1. You build and publish your app with EAS Build
 * 2. When you make JS changes, run `eas update` to publish an update
 * 3. The app checks for updates on launch (or manually via button below)
 * 4. If an update is available, it downloads and applies on next restart
 *
 * To set up EAS for this project:
 * 1. Install the EAS CLI: npm install -g eas-cli
 * 2. Log in: eas login
 * 3. Configure: eas update:configure
 * 4. Build: eas build --platform all
 * 5. Publish update: eas update --branch production
 *
 * NOTE: In development (Expo Go), updates are handled by Metro bundler.
 * The expo-updates API only works in production builds (EAS Build or standalone).
 */
export default function App() {
  const [updateStatus, setUpdateStatus] = useState('Not checked');
  const [updateInfo, setUpdateInfo] = useState(null);

  const appVersion = Constants.expoConfig?.version || 'unknown';
  const runtimeVersion = Updates.runtimeVersion || 'N/A (dev mode)';
  const updateChannel = Updates.channel || 'N/A (dev mode)';

  const checkForUpdates = async () => {
    try {
      setUpdateStatus('Checking...');

      if (!Updates.isEnabled) {
        setUpdateStatus('Updates disabled (running in dev mode)');
        return;
      }

      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setUpdateStatus('Update available! Downloading...');
        const result = await Updates.fetchUpdateAsync();
        setUpdateInfo(result);
        setUpdateStatus('Update downloaded! Restart to apply.');
      } else {
        setUpdateStatus('App is up to date');
      }
    } catch (error) {
      setUpdateStatus(`Error: ${error.message}`);
    }
  };

  const restartApp = async () => {
    await Updates.reloadAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deployment & OTA Updates</Text>

      <View style={styles.infoSection}>
        <Text style={styles.label}>App Version</Text>
        <Text style={styles.value}>{appVersion}</Text>

        <Text style={styles.label}>Runtime Version</Text>
        <Text style={styles.value}>{runtimeVersion}</Text>

        <Text style={styles.label}>Update Channel</Text>
        <Text style={styles.value}>{updateChannel}</Text>

        <Text style={styles.label}>Platform</Text>
        <Text style={styles.value}>{Platform.OS}</Text>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.label}>Update Status</Text>
        <Text style={styles.status}>{updateStatus}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={checkForUpdates}>
        <Text style={styles.buttonText}>Check for Updates</Text>
      </TouchableOpacity>

      {updateStatus.includes('Restart') ? (
        <TouchableOpacity
          style={[styles.button, styles.restartButton]}
          onPress={restartApp}
        >
          <Text style={styles.buttonText}>Restart to Apply</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statusSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3498db',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  restartButton: {
    backgroundColor: '#27ae60',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
