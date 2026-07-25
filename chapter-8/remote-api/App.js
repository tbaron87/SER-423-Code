import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [results, setResults] = useState('');

  const onLoad = async () => {
    setResults('Loading, please wait...');
    const response = await fetch('http://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    });
    const text = await response.text();
    setResults(text);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.preview}
          value={results}
          placeholder="Results..."
          editable={false}
          multiline
        />
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
    height: 400,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
  },
});
