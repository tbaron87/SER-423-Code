import { StyleSheet, Text, View, FlatList } from 'react-native';
import Post from './Post';
import data from './data.json';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.title}>Latest posts</Text>
      </View>
      <FlatList
        data={data.posts}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <Post {...item} />}
        style={styles.list}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#34495e',
    padding: 10,
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  list: {
    backgroundColor: '#f0f3f4',
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
