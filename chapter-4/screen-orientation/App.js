import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Menu from './Menu';

export default function App() {
  const [orientation, setOrientation] = useState(getOrientation());

  function getOrientation() {
    const { width, height } = Dimensions.get('window');
    return height > width ? 'Portrait' : 'Landscape';
  }

  const handleLayoutChange = () => {
    setOrientation(getOrientation());
  };

  return (
    <View
      onLayout={handleLayoutChange}
      style={styles.container}
    >
      <Menu orientation={orientation} />
      <View style={styles.main}>
        <Text>Main Content</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  main: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
