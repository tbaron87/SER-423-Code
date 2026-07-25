import { Alert, StyleSheet, View } from 'react-native';
import Button from './Button';

export default function App() {
  const handleButtonPress = () => {
    Alert.alert('Alert', 'You clicked this button!');
  };

  return (
    <View style={styles.container}>
      <Button style={styles.button}>
        My first button
      </Button>
      <Button success style={styles.button}>
        Success button
      </Button>
      <Button info style={styles.button}>
        Info button
      </Button>
      <Button danger rounded style={styles.button} onPress={handleButtonPress}>
        Rounded button
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
  },
});
