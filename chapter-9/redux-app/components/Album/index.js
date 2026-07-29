import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import randomColor from 'randomcolor';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos, addPhoto, removePhoto } from '../../redux/photos/photosSlice';

export default function Album() {
  const photos = useSelector((state) => state.photos.loadedPhotos);
  const status = useSelector((state) => state.photos.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPhotos());
    }
  }, [status, dispatch]);

  const handleAddPhoto = () => {
    const photo = {
      albumId: 2,
      title: 'dolore esse a in eos sed',
      url: `https://placehold.co/600x600/${randomColor().replace('#', '')}/white`,
      thumbnailUrl: `https://placehold.co/150x150/${randomColor().replace('#', '')}/white`,
    };
    dispatch(addPhoto(photo));
  };

  const handleRemovePhoto = (id) => {
    dispatch(removePhoto(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.toolbar}>Album</Text>
      <ScrollView>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddPhoto}>
            <Text style={styles.buttonText}>Add Photo</Text>
          </TouchableOpacity>
          {status === 'loading' ? (
            <Text style={styles.loadingText}>Loading photos...</Text>
          ) : null}
          {photos.map((photo) => (
            <TouchableOpacity
              onPress={() => handleRemovePhoto(photo.id)}
              key={photo.id}
            >
              <Image style={styles.image} source={{ uri: photo.url }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 10,
  },
  button: {
    margin: 10,
    padding: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    padding: 20,
  },
});
