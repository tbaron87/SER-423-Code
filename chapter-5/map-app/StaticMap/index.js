import { StyleSheet, View, Text, TouchableOpacity, Platform, Linking } from 'react-native';

/**
 * StaticMap — a dependency-free, keyless location display used as the Android
 * fallback for the native map.
 *
 * WHY NO ACTUAL MAP TILES?
 * `react-native-maps` renders a blank map under React Native's New Architecture
 * (Fabric) on Expo SDK 52, and Expo Go on SDK 52 always runs the New Architecture.
 * The obvious workaround — fetching raster map tiles as <Image>s — turns out not
 * to be viable keyless in 2026: OpenStreetMap and Wikimedia return "403 Access
 * blocked" to anonymous requests (their usage policy requires an identifying
 * User-Agent that React Native's <Image> does not send), and CARTO's free tiles
 * now return an "API KEY REQUIRED" watermark. Every free tile source requires a
 * key or blocks anonymous clients.
 *
 * So instead of chasing a fragile tile host, this component does the robust thing:
 * it shows the location data the app worked to obtain, and offers to open the
 * coordinate in the device's own Maps app (Google Maps / Apple Maps) via Linking.
 * That handoff pattern — "show data in-app, defer the rich map to the OS" — is a
 * legitimate and common real-world approach, and it works offline-friendly with
 * zero external dependencies or keys.
 */
export default function StaticMap({ latitude, longitude }) {
  const openInMaps = () => {
    // geo: works on Android; Apple Maps handles the http fallback on iOS.
    const label = 'Your Location';
    const url = Platform.select({
      ios: `https://maps.apple.com/?ll=${latitude},${longitude}&q=${encodeURIComponent(label)}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodeURIComponent(label)})`,
      default: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`,
    });
    Linking.openURL(url).catch(() => {
      // As a last resort (no maps app / unsupported), open OSM in the browser.
      Linking.openURL(
        `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.pinRow}>
          <View style={styles.pinHead} />
          <View style={styles.pinStem} />
        </View>

        <Text style={styles.title}>Your Location</Text>

        <View style={styles.coordBlock}>
          <Text style={styles.coordLabel}>Latitude</Text>
          <Text style={styles.coordValue}>{latitude.toFixed(6)}</Text>
          <Text style={styles.coordLabel}>Longitude</Text>
          <Text style={styles.coordValue}>{longitude.toFixed(6)}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={openInMaps}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef2f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '82%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  pinRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pinHead: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#e74c3c',
    borderWidth: 4,
    borderColor: '#fff',
  },
  pinStem: {
    width: 4,
    height: 14,
    backgroundColor: '#e74c3c',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  coordBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  coordLabel: {
    fontSize: 13,
    color: '#95a5a6',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 10,
  },
  coordValue: {
    fontSize: 24,
    color: '#2c3e50',
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
