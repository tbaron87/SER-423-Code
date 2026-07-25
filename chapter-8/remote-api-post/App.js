import { useState } from 'react';
import axios from 'axios';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const endpoint = 'http://jsonplaceholder.typicode.com/posts';

export default function App() {
  const [results, setResults] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onLoad = async () => {
    setResults('Loading, please wait...');
    const response = await axios.get(endpoint);
    setResults(JSON.stringify(response.data));
  };

  const onSave = async () => {
    try {
      await axios.post(endpoint, {
        userId: 1,
        title,
        body,
      });
      Alert.alert('Success', 'Post successfully saved');
      onLoad();
    } catch (error) {
      Alert.alert('Error', `There was an error while saving the post: ${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.toolbar}>Add a new post</Text>
      <ScrollView style={styles.content}>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          onChangeText={setBody}
          value={body}
          placeholder="Post body..."
        />
        <TouchableOpacity onPress={onSave} style={styles.button}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.preview}
          value={results}
          placeholder="Results..."
          editable={false}
          multiline
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#3498db',
    color: '#fff',
    textAlign: 'center',
    padding: 25,
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    backgroundColor: '#bdc3c7',
    flex: 1,
    height: 500,
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 10,
    flex: 1,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
});
