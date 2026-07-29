import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

const SOURCE_TEXT = 'React Native Cookbook';

export default function App() {
  const [clipboardContent, setClipboardContent] = useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(SOURCE_TEXT);
  };

  const getClipboardContent = async () => {
    const content = await Clipboard.getStringAsync();
    setClipboardContent(content);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Tap and Hold the next line to copy it to the Clipboard:
      </Text>
      <Text selectable onLongPress={copyToClipboard} style={styles.sourceText}>
        {SOURCE_TEXT}
      </Text>
      <Text style={styles.instructions}>
        Input some text into the TextInput below and Cut/Copy as you normally would:
      </Text>
      <TextInput style={styles.textInput} placeholder="Type here..." />
      <View style={styles.row}>
        <Text style={styles.rowText}>Clipboard Contents:</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.content}>{clipboardContent}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={getClipboardContent}>
        <Text style={styles.buttonText}>Paste Clipboard</Text>
      </TouchableOpacity>
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
  instructions: {
    textAlign: 'center',
    color: '#333',
    margin: 10,
  },
  sourceText: {
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
  },
  content: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  textInput: {
    backgroundColor: 'white',
    height: 40,
    width: 250,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  rowText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
