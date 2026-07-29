import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [fabActive, setFabActive] = useState(false);

  const showToast = (destination) => {
    Alert.alert('Shared', `Shared to ${destination}!`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Header Title!</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ActivityIndicator size="large" color="green" style={styles.spinner} />

        <TouchableOpacity
          style={[styles.button, styles.infoButton]}
          onPress={() => console.log('button 1 pressed')}
        >
          <Text style={styles.buttonText}>Click Me!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={() => console.log('button 2 pressed')}
        >
          <Text style={styles.buttonText}>No Click Me!</Text>
        </TouchableOpacity>
      </View>

      {/* FAB */}
      <View style={styles.fabContainer}>
        {fabActive ? (
          <View style={styles.fabActions}>
            <TouchableOpacity
              style={[styles.fabAction, styles.facebookButton]}
              onPress={() => showToast('Facebook')}
            >
              <Ionicons name="logo-facebook" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.fabAction, styles.twitterButton]}
              onPress={() => showToast('Twitter')}
            >
              <Ionicons name="logo-twitter" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setFabActive(!fabActive)}
        >
          <Ionicons name="share" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#3F51B5',
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  spinner: {
    marginBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  infoButton: {
    backgroundColor: '#62B1F6',
  },
  successButton: {
    backgroundColor: '#5cb85c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
  },
  fabActions: {
    marginBottom: 10,
  },
  fabAction: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  facebookButton: {
    backgroundColor: '#3B5998',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
  },
});
