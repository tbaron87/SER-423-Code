import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeEventEmitter,
  TouchableOpacity,
} from 'react-native';

const { MediaManager } = NativeModules;
const mediaEventEmitter = new NativeEventEmitter(MediaManager);

/**
 * This app demonstrates native-to-JS event communication:
 * 1. JS calls MediaManager.showSongs() (native method)
 * 2. Android opens the system audio picker (Intent)
 * 3. User selects a song
 * 4. Native code plays it with MediaPlayer and emits a "SongPlaying" event
 * 5. JS receives the event via NativeEventEmitter and displays song info
 */
export default function App() {
  const [songPlaying, setSongPlaying] = useState(null);

  useEffect(() => {
    // Subscribe to native events
    const subscription = mediaEventEmitter.addListener('SongPlaying', (params) => {
      setSongPlaying(params.songPlaying);
    });

    // Cleanup subscription on unmount
    return () => subscription.remove();
  }, []);

  const onShowSongsPress = () => {
    MediaManager.showSongs();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onShowSongsPress}>
        <Text style={styles.buttonText}>Pick Song</Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>Song Playing:</Text>
      <Text style={styles.songTitle}>{songPlaying}</Text>
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
  songTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
