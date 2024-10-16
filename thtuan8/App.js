import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MasterScreen from './components/MasterScreen';
import DetailScreen from './components/Detail_Portrait';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MasterScreen">
        <Stack.Screen name="MasterScreen" component={MasterScreen} options={{ title: 'Donut List' }} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Donut Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}