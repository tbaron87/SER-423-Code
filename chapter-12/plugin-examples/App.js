import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgExample from './examples/SvgExample';
import LottieExample from './examples/LottieExample';
import GestureExample from './examples/GestureExample';

const EXAMPLES = [
  { key: 'svg', label: 'SVG', component: SvgExample },
  { key: 'lottie', label: 'Lottie', component: LottieExample },
  { key: 'gesture', label: 'Gesture', component: GestureExample },
];

export default function App() {
  const [active, setActive] = useState('svg');

  const ActiveComponent = EXAMPLES.find((e) => e.key === active).component;

  return (
    // GestureHandlerRootView must wrap the whole app for react-native-gesture-handler to work.
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Third Party Plugin Examples</Text>

        <View style={styles.tabBar}>
          {EXAMPLES.map((example) => (
            <TouchableOpacity
              key={example.key}
              style={[styles.tab, active === example.key && styles.tabActive]}
              onPress={() => setActive(example.key)}
            >
              <Text
                style={[styles.tabText, active === example.key && styles.tabTextActive]}
              >
                {example.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          <ActiveComponent />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
  },
  tabActive: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
