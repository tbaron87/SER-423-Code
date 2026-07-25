import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const playlist = [
  {
    title: 'People Watching',
    artist: 'Keller Williams',
    album: 'Keller Williams Live at The Westcott Theater on 2012-09-22',
    uri: 'https://ia800308.us.archive.org/7/items/kwilliams2012-09-22.at853.flac16/kwilliams2012-09-22at853.t16.mp3',
  },
  {
    title: 'Hunted By A Freak',
    artist: 'Mogwai',
    album: 'Mogwai Live at Ancienne Belgique on 2017-10-20',
    uri: 'https://ia601509.us.archive.org/17/items/mogwai2017-10-20.brussels.fm/Mogwai2017-10-20Brussels-07.mp3',
  },
  {
    title: 'Nervous Tic Motion of the Head to the Left',
    artist: 'Andrew Bird',
    album: 'Andrew Bird Live at Rio Theater on 2011-01-28',
    uri: 'https://ia800503.us.archive.org/8/items/andrewbird2011-01-28.early.dr7.flac16/andrewbird2011-01-28.early.t07.mp3',
  },
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    setupAudio();
  }, []);

  const setupAudio = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
    await loadAudio(0);
  };

  const loadAudio = async (trackIndex) => {
    const sound = new Audio.Sound();
    const source = { uri: playlist[trackIndex].uri };
    const status = { shouldPlay: false, volume: 1.0 };

    sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      setIsBuffering(playbackStatus.isBuffering);
    });

    await sound.loadAsync(source, status);
    setPlaybackInstance(sound);
  };

  const handlePlayPause = async () => {
    if (!playbackInstance) return;
    if (isPlaying) {
      await playbackInstance.pauseAsync();
    } else {
      await playbackInstance.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePreviousTrack = async () => {
    if (!playbackInstance) return;
    await playbackInstance.unloadAsync();
    const newIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(false);
    await loadAudio(newIndex);
  };

  const handleNextTrack = async () => {
    if (!playbackInstance) return;
    await playbackInstance.unloadAsync();
    const newIndex = currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(false);
    await loadAudio(newIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.largeText, styles.buffer]}>
        {isBuffering && isPlaying ? 'Buffering...' : null}
      </Text>
      {playbackInstance ? (
        <View style={styles.trackInfo}>
          <Text style={[styles.trackInfoText, styles.largeText]}>
            {playlist[currentTrackIndex].title}
          </Text>
          <Text style={[styles.trackInfoText, styles.smallText]}>
            {playlist[currentTrackIndex].artist}
          </Text>
          <Text style={[styles.trackInfoText, styles.smallText]}>
            {playlist[currentTrackIndex].album}
          </Text>
        </View>
      ) : null}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={handlePreviousTrack}>
          <Feather name="skip-back" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={handlePlayPause}>
          {isPlaying ? (
            <Feather name="pause" size={32} color="#fff" />
          ) : (
            <Feather name="play" size={32} color="#fff" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={handleNextTrack}>
          <Feather name="skip-forward" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#191A1A',
  },
  buffer: {
    color: '#fff',
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#fff',
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 20,
  },
  controls: {
    flexDirection: 'row',
  },
});
