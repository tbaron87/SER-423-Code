import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactList from './ContactList';

export default function App() {
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.toolbar}>Contacts</Text>
      <ContactList style={styles.content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    fontSize: 22,
    padding: 20,
    textAlign: 'center',
  },
  content: {
    padding: 10,
    flex: 1,
  },
});
