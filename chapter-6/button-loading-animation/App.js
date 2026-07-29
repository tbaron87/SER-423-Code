import { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from './Button';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleButtonPress = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.toolbar}>Animated containers</Text>
      <View style={styles.content}>
        <Button
          label="Login"
          loading={loading}
          onPress={handleButtonPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#f39c12',
    color: '#fff',
    fontSize: 22,
    padding: 20,
    textAlign: 'center',
  },
  content: {
    padding: 10,
    backgroundColor: '#ecf0f1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
