import { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const [result, setResult] = useState(null);

  const handlePressButton = async () => {
    const browserResult = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(browserResult);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Open WebBrowser"
        onPress={handlePressButton}
      />
      <Text>{result && JSON.stringify(result)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
