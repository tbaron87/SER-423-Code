import { StyleSheet, Text, View } from 'react-native';

/**
 * Recipe 1: Basic Embedding
 *
 * This is the simplest RN component — it just renders text.
 * The native Android host (BasicEmbedActivity) loads this component
 * by name via ReactRootView / ReactDelegate.
 */
export default function BasicEmbed() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello from React Native!</Text>
      <Text style={styles.subtitle}>
        This view is embedded inside a native Android Activity.
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
