import { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import StaticMap from './StaticMap';

/**
 * Platform split for the map view.
 *
 * `react-native-maps` renders a blank map on Android under React Native's New
 * Architecture (Fabric), which Expo Go on SDK 52 always runs. On iOS the native
 * Apple Maps backend is expected to render correctly. So:
 *   - iOS     -> real interactive <MapView> from react-native-maps
 *   - Android -> keyless <StaticMap> fallback (a location card; see StaticMap/index.js
 *                for why actual map tiles are not used)
 *
 */
const USE_NATIVE_MAP_ON_IOS = true; // If the map appears blank on iOS devices, then set this to false
const useNativeMap = USE_NATIVE_MAP_ON_IOS && Platform.OS === 'ios';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Use the last known position first for an instant fix when available,
      // then fall back to a fresh reading with an explicit accuracy. Passing an
      // accuracy avoids getCurrentPositionAsync hanging indefinitely while it
      // waits for a high-accuracy fix that may never arrive (e.g. on an emulator
      // or a cold-started device).
      const lastKnown = await Location.getLastKnownPositionAsync();
      if (lastKnown) {
        setLocation(lastKnown);
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(currentLocation);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {useNativeMap ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
        >
          <Marker
            coordinate={location.coords}
            title="User Location"
            description="You are here!"
            image={require('./assets/you-are-here.png')}
          />
        </MapView>
      ) : (
        <StaticMap
          latitude={location.coords.latitude}
          longitude={location.coords.longitude}
        />
      )}
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
  map: {
    flex: 1,
    width: '100%',
  },
});
