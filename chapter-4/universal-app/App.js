import { StyleSheet, View } from 'react-native';
import Device from './utils/Device';
import UserList from './UserList';
import UserDetail from './UserDetail';
import data from './data.json';

export default function App() {
  return (
    <View style={styles.content}>
      <UserList contacts={data.results} />
      {Device.isTablet() ? <UserDetail contact={data.results[0]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
  },
});
