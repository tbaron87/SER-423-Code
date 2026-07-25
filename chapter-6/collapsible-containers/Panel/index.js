import { useState } from 'react';
import {
  View,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function Panel({ children, style, title, expanded = false }) {
  const [height, setHeight] = useState(expanded ? null : 0);

  const toggle = () => {
    LayoutAnimation.spring();
    setHeight(height === null ? 0 : null);
  };

  return (
    <View style={[styles.main, style]}>
      <TouchableOpacity onPress={toggle}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <View style={{ height }}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    borderRadius: 3,
    overflow: 'hidden',
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
  },
});
