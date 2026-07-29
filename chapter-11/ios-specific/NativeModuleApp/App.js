import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';

const { HelloManager } = NativeModules;

export default function App() {
  const [userName, setUserName] = useState('');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const inputRef = useRef(null);

  const greetUser = () => {
    inputRef.current?.blur();
    HelloManager.greetUser(userName, isAdmin, (result) => {
      setGreetingMessage(result);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter User Name</Text>
      <TextInput
        ref={inputRef}
        autoCorrect={false}
        style={styles.inputField}
        placeholder="User Name"
        onChangeText={setUserName}
        value={userName}
      />
      <Text style={styles.label}>Admin</Text>
      <Switch
        style={styles.radio}
        onValueChange={setIsAdmin}
        value={isAdmin}
      />
      <TouchableOpacity
        disabled={!userName}
        style={[styles.button, !userName ? styles.disabled : null]}
        onPress={greetUser}
      >
        <Text style={styles.buttonText}>Greet</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Response:</Text>
      <Text style={styles.message}>{greetingMessage}</Text>
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
  inputField: {
    padding: 20,
    fontSize: 30,
    width: 200,
  },
  label: {
    fontSize: 18,
    marginTop: 18,
    textAlign: 'center',
  },
  radio: {
    marginBottom: 20,
  },
  button: {
    padding: 20,
    backgroundColor: '#1DA1F2',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  message: {
    fontSize: 22,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: '#3C3C3C',
  },
});
