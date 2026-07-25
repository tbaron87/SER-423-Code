import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Button({ label, loading = false, onPress = () => {}, style }) {
  const handleButtonPress = () => {
    LayoutAnimation.easeInEaseOut();
    onPress(!loading);
  };

  return (
    <TouchableOpacity
      style={[styles.main, style, loading ? styles.loading : null]}
      activeOpacity={0.6}
      onPress={handleButtonPress}
    >
      <View>
        {!loading ? <Text style={styles.label}>{label}</Text> : null}
        {loading ? <ActivityIndicator size="small" color="#fff" /> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#e67e22',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  loading: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
