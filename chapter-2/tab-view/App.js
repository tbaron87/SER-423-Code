import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => <View style={[styles.container, { backgroundColor: '#C586BD' }]} />;
const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#4AC9B0' }]} />;
const ThirdRoute = () => <View style={[styles.container, { backgroundColor: '#1CB5AD' }]} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export default function App() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => <TabBar {...props} style={styles.tabBar} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#333',
  },
});
