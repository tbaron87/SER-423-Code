import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const options = [
  { title: 'Dashboard', icon: 'dashboard' },
  { title: 'Inbox', icon: 'inbox' },
  { title: 'Graphs', icon: 'pie-chart' },
  { title: 'Search', icon: 'search' },
  { title: 'Settings', icon: 'gear' },
];

export default function Menu({ orientation }) {
  const isLandscape = orientation === 'Landscape';
  const iconSize = isLandscape ? 27 : 35;

  return (
    <View style={styles.content}>
      {options.map((option, index) => (
        <View key={index} style={[styles.option, styles.landscape]}>
          <FontAwesome name={option.icon} size={iconSize} color="#fff" />
          {isLandscape ? <Text style={styles.title}>{option.title}</Text> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#34495e',
    paddingTop: 50,
  },
  option: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  landscape: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    margin: 5,
    marginLeft: 20,
  },
});
