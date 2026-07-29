import { useRef } from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export default function ContactItem({
  contact,
  onPress = () => {},
  onRemove = () => {},
  onDragEnd = () => {},
  onDragStart = () => {},
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const rowWidth = useRef(0);
  const threshold = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gesture) => Math.abs(gesture.dx) > 2,
      onPanResponderGrant: () => onDragStart(),
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        const move = rowWidth.current - Math.abs(gesture.dx);
        let remove = false;
        let config = { toValue: { x: 0, y: 0 }, duration: 500, useNativeDriver: false };

        if (move < threshold.current) {
          remove = true;
          config = gesture.dx > 0
            ? { toValue: { x: rowWidth.current, y: 0 }, duration: 100, useNativeDriver: false }
            : { toValue: { x: -rowWidth.current, y: 0 }, duration: 100, useNativeDriver: false };
        }

        onDragEnd();
        Animated.spring(pan, config).start(() => {
          if (remove) {
            onRemove(contact);
          }
        });
      },
      onPanResponderTerminate: (e, gesture) => {
        onDragEnd();
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, duration: 500, useNativeDriver: false }).start();
      },
    })
  ).current;

  const setThreshold = (event) => {
    const { layout: { width } } = event.nativeEvent;
    threshold.current = width / 3;
    rowWidth.current = width;
  };

  return (
    <View style={styles.row} onLayout={setThreshold}>
      <Animated.View
        style={[styles.pan, pan.getLayout()]}
        {...panResponder.panHandlers}
      >
        <TouchableHighlight
          style={styles.info}
          onPress={() => onPress(contact)}
          underlayColor="#ecf0f1"
        >
          <Text>{contact.name}</Text>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#ecf0f1',
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
    flexDirection: 'row',
  },
  pan: {
    flex: 1,
  },
  info: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingLeft: 10,
    paddingTop: 20,
  },
});
