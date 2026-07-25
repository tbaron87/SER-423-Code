import { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@MyApp:key';

export default function App() {
  const [text, setText] = useState('');
  const [storedValue, setStoredValue] = useState('');

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setStoredValue(value);
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  };

  const onSave = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, text);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.preview}>{storedValue}</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Type something here..."
        />
        <TouchableOpacity onPress={onSave} style={styles.button}>
          <Text>Save locally</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLoad} style={styles.button}>
          <Text>Load data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  preview: {
    backgroundColor: '#bdc3c7',
    width: 300,
    height: 80,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50,
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 5,
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
  },
});
