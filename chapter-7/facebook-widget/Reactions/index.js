import { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Icon from './Icon';

const image = require('./images/like.png');

export default function Reactions({ icons = ['like', 'heart', 'angry', 'laughing', 'surprised'], style }) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('');

  const onSelectReaction = (reaction) => {
    setSelected(reaction);
    setShow(false);
  };

  const toggleReactions = () => {
    setShow(!show);
  };

  return (
    <View style={[style, styles.container]}>
      <TouchableOpacity onPress={toggleReactions}>
        <Image source={image} style={styles.icon} />
      </TouchableOpacity>
      <Text>{selected}</Text>
      {show ? (
        <View style={styles.reactions}>
          {icons.map((name, index) => (
            <Icon
              key={index}
              name={name}
              delay={index * 100}
              index={index}
              onPress={onSelectReaction}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  reactions: {
    flexDirection: 'row',
    height: 0,
  },
});
