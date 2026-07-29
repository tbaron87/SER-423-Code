import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';

export default function App() {
  const [count, setCount] = useState(0);

  const onButtonTap = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Button
        buttonText="Press Me!"
        onTap={onButtonTap}
        style={styles.button}
      />
      <Text style={styles.text}>Button Pressed Count: {count}</Text>
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
  button: {
    height: 40,
    width: 150,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
});
