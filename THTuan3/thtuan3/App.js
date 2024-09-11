import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './components/FirstScreen';
import Screen1_b from './components/Screen1_b';
import Screen1_e from './components/Screen1_e';
import Screen2_a from './components/Screen2_a';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <Text style={styles.subtitle}>Choose a screen </Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FirstScreen')}>
        <Text style={styles.buttonText}>Go to FirstScreen</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen1_b')}>
        <Text style={styles.buttonText}>Go to Screen 1_b</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen1_e')}>
        <Text style={styles.buttonText}>Go to Screen 1_e</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen2_a')}>
        <Text style={styles.buttonText}>Go to Screen 2_a</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',  // Màu nền nhẹ nhàng
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4682b4',  // Màu nút xanh
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Screen1_b" component={Screen1_b} />
        <Stack.Screen name="Screen1_e" component={Screen1_e} />
        <Stack.Screen name="Screen2_a" component={Screen2_a} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
