import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

function capitalize(value) {
  return value[0].toUpperCase() + value.substring(1);
}

export default function UserList({ contacts }) {
  const renderContact = ({ item: contact }) => (
    <TouchableOpacity style={styles.row}>
      <Image
        source={{ uri: `${contact.picture.large}?key=XXXX-XXXX-XXXX-XXXX` }}
        style={styles.img}
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {capitalize(contact.name.first)} {capitalize(contact.name.last)}
        </Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <Text style={styles.toolbar}>My contacts!</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.login.username}
        renderItem={renderContact}
        style={styles.main}
      />
    </View>
  );
}
