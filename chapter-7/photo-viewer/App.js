import { useState } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import PostContainer from './PostContainer';
import PhotoViewer from './PhotoViewer';

const image1 = require('./images/01.jpg');
const image2 = require('./images/02.jpg');
const image3 = require('./images/03.jpg');
const image4 = require('./images/04.jpg');

const timeline = [
  { title: 'Enjoying the fireworks', image: image1 },
  { title: 'Climbing Mount Fuji', image: image2 },
  { title: 'Check my last picture', image: image3 },
  { title: 'Sakuras are beautiful!', image: image4 },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [position, setPosition] = useState(null);

  const showImage = (post, pos) => {
    setSelected(post);
    setPosition(pos);
  };

  const closeViewer = () => {
    setSelected(null);
    setPosition(null);
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.toolbar}>Timeline</Text>
      <ScrollView style={styles.content}>
        {timeline.map((post, index) => (
          <PostContainer key={index} post={post} onPress={showImage} />
        ))}
      </ScrollView>
      {selected ? (
        <PhotoViewer post={selected} position={position} onClose={closeViewer} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ecf0f1',
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    fontSize: 22,
    padding: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
});
