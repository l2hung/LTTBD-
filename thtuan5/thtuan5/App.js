import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from './components/ProductScreen';
import ColorSelectionScreen from './components/ColorSelectionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="ColorSelection" component={ColorSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
