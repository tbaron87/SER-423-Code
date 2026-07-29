import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import randomColor from 'randomcolor';
import BounceSpinner from './spinners/BounceSpinner';
import PulseSpinner from './spinners/PulseSpinner';
import RotateSpinner from './spinners/RotateSpinner';
import ThreeBounceSpinner from './spinners/ThreeBounceSpinner';
import FadingDotsSpinner from './spinners/FadingDotsSpinner';

const spinners = [
  { name: 'Bounce', component: BounceSpinner },
  { name: 'Pulse', component: PulseSpinner },
  { name: 'Rotate', component: RotateSpinner },
  { name: 'ThreeBounce', component: ThreeBounceSpinner },
  { name: 'FadingDots', component: FadingDotsSpinner },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(randomColor());

  const changeSpinner = () => {
    const nextIndex = index === spinners.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);
    setColor(randomColor());
  };

  const CurrentSpinner = spinners[index].component;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeSpinner}>
        <CurrentSpinner size={120} color={color} />
      </TouchableOpacity>
      <Text style={styles.text}>{spinners[index].name}</Text>
      <Text style={styles.hint}>Tap the spinner to change</Text>
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
  text: {
    paddingTop: 40,
    fontSize: 25,
    fontWeight: 'bold',
  },
  hint: {
    paddingTop: 10,
    fontSize: 14,
    color: '#999',
  },
});
