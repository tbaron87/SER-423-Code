import { TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

const links = [
  { title: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/articles/' },
  { title: 'CSS Tricks', url: 'https://css-tricks.com/' },
  { title: 'Gitconnected Blog', url: 'https://medium.com/gitconnected' },
  { title: 'Hacker News', url: 'https://news.ycombinator.com/' },
];

export default function HomeScreen({ navigation }) {
  const handleButtonPress = (link) => {
    navigation.navigate('Browser', { url: link.url, title: link.title });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonList}>
        {links.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleButtonPress(link)}
            style={styles.button}
          >
            <Text style={styles.text}>{link.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
