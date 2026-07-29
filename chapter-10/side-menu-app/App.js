import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const colors = ['green', 'blue', 'orange', 'pink', 'cyan', 'yellow', 'purple'];

function HomeScreen({ navigation, route }) {
  const selectedColor = route.params?.color || 'green';

  return (
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.buttonText}>Open Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

function CustomDrawerContent({ navigation }) {
  return (
    <View style={styles.menu}>
      <Text style={styles.heading}>Select a Color</Text>
      {colors.map((color) => (
        <TouchableOpacity
          key={color}
          onPress={() => navigation.navigate('Home', { color })}
        >
          <Text style={styles.item}>{color.charAt(0).toUpperCase() + color.slice(1)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
  menu: {
    flex: 1,
    backgroundColor: '#3C3C3C',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    color: '#f6f6f6',
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  item: {
    fontSize: 25,
    paddingTop: 10,
    color: '#f6f6f6',
  },
});
