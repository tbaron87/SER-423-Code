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
 * This app demonstrates native-to-JS event communication on iOS:
 * 1. JS calls MediaManager.showSongs() (native method)
 * 2. iOS presents the MPMediaPickerController (system music picker)
 * 3. User selects a song
 * 4. Native code plays it with MPMusicPlayerController and emits a "SongPlaying" event
 * 5. JS receives the event via NativeEventEmitter and displays song info
 */
export default function App() {
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const subscription = mediaEventEmitter.addListener('SongPlaying', (songTitle) => {
      setCurrentSong(songTitle);
    });

    return () => subscription.remove();
  }, []);

  const showSongs = () => {
    MediaManager.showSongs();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showSongs}>
        <Text style={styles.buttonText}>Pick Song</Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>Song Playing:</Text>
      <Text style={styles.songTitle}>{currentSong}</Text>
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
    backgroundColor: '#3B5998',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
