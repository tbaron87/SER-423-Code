import { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const imageSearchTerms = ['Books', 'Code', 'Nature', 'Cats'];

export default function App() {
  const [showCarousel, setShowCarousel] = useState(false);
  const flatListRef = useRef(null);

  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image
        style={styles.image}
        source={{ uri: `https://source.unsplash.com/350x350/?${item}` }}
      />
      <Text style={styles.label}>{item}</Text>
    </View>
  );

  const renderControls = () => (
    <View style={styles.controlsContainer}>
      <Text style={styles.heading}>Image Carousel</Text>
      <Text style={styles.subtitle}>
        Swipe through images loaded from Unsplash
      </Text>
      <TouchableOpacity onPress={toggleCarousel} style={styles.openButton}>
        <Text style={styles.openButtonText}>Open Carousel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCarousel = () => (
    <View style={styles.carouselContainer}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={toggleCarousel} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={imageSearchTerms}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {showCarousel ? renderCarousel() : renderControls()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  controlsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  carouselContainer: {
    flex: 1,
    backgroundColor: '#474747',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  slide: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  label: {
    fontSize: 30,
    padding: 40,
    color: '#fff',
  },
  openButton: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  openButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});
