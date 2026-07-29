import { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [history, setHistory] = useState([]);
  const [text, setText] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    const localhost = Platform.OS === 'android' ? '10.0.3.2' : 'localhost';
    ws.current = new WebSocket(`ws://${localhost}:3001`);

    ws.current.onopen = () => {
      console.log('Open!');
    };

    ws.current.onmessage = (event) => {
      setHistory((prev) => [
        ...prev,
        { isSentByMe: false, messageText: event.data },
      ]);
    };

    ws.current.onerror = (event) => {
      console.log('onerror', event.message);
    };

    ws.current.onclose = (event) => {
      console.log('onclose', event.code, event.reason);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const onSendMessage = () => {
    if (!text) return;
    setHistory((prev) => [
      ...prev,
      { isSentByMe: true, messageText: text },
    ]);
    ws.current?.send(text);
    setText('');
  };

  const renderMessage = (item, index) => {
    const sender = item.isSentByMe ? styles.me : styles.friend;
    return (
      <View style={[styles.messageText, sender]} key={index}>
        <Text>{item.messageText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.toolbar}>Simple Chat</Text>
      <ScrollView style={styles.content}>
        {history.map(renderMessage)}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={onSendMessage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#34495e',
    color: '#fff',
    fontSize: 20,
    padding: 25,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#bdc3c7',
    padding: 5,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
  },
  messageText: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  me: {
    alignSelf: 'flex-start',
    backgroundColor: '#1abc9c',
    marginRight: 100,
  },
  friend: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    marginLeft: 100,
  },
});
