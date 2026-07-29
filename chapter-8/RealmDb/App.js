import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [db, setDb] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    initDatabase();
  }, []);

  const initDatabase = async () => {
    const database = await SQLite.openDatabaseAsync('users.db');

    // Create the users table if it doesn't exist
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL
      );
    `);

    setDb(database);
    await loadUsers(database);
  };

  const loadUsers = async (database) => {
    const dbRef = database || db;
    if (!dbRef) return;

    const result = await dbRef.getAllAsync('SELECT * FROM users');
    setUsers(result);
  };

  const getRandomUser = async () => {
    const response = await fetch('https://randomuser.me/api/');
    return response.json();
  };

  const createUser = async () => {
    if (!db) return;

    const data = await getRandomUser();
    const user = data.results[0];

    await db.runAsync(
      'INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)',
      user.name.first,
      user.name.last,
      user.email
    );

    await loadUsers();
  };

  const updateFirstUser = async () => {
    if (!db || users.length === 0) return;

    const firstUser = users[0];
    await db.runAsync(
      'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?',
      'Bob',
      'Cookbook',
      'react.native@cookbook.com',
      firstUser.id
    );

    await loadUsers();
  };

  const deleteAllUsers = async () => {
    if (!db) return;

    await db.runAsync('DELETE FROM users');
    await loadUsers();
  };

  const renderUser = ({ item }) => (
    <View style={styles.userRow}>
      <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to SQLite DB Test!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={createUser}>
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={updateFirstUser}>
          <Text style={styles.buttonText}>Update First User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteAllUsers}>
          <Text style={styles.buttonText}>Remove All Users</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Users ({users.length}):</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderUser}
          style={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    paddingTop: 60,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#67CAFF',
    padding: 15,
    margin: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  userRow: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 5,
    borderRadius: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
