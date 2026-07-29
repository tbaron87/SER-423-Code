import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, NativeModules } from 'react-native';

const { UserNameManager } = NativeModules;

/**
 * Recipe 3: React Native → Native Android Communication
 *
 * This component calls a native module method to send data back
 * to the native Android host. As the user types, the text is sent
 * to UserNameManager.setUserName() which the native Activity observes.
 *
 * This demonstrates the reverse direction from Recipe 2:
 * instead of native pushing data TO RN, RN pushes data TO native.
 */
export default function RNToNative() {
  const [userName, setUserName] = useState('');

  const onUserNameChange = (text) => {
    setUserName(text);
    UserNameManager.setUserName(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Embedded RN App</Text>
      <Text style={styles.label}>Enter User Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={onUserNameChange}
        value={userName}
        placeholder="Type a name..."
      />
      <Text style={styles.info}>
        The text above is sent to the native Android host in real-time
        via NativeModules.UserNameManager.setUserName()
      </Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  info: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
});
