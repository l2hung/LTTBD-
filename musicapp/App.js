import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './ThemeContext'; // Điều chỉnh đường dẫn phù hợp
import { View, StatusBar } from 'react-native';

import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignUpScreen';
import HomeScreen from './components/HomeScreen';
import AlbumScreen from './components/AlbumScreen';
import TrackScreen from './components/TrackScreen';
import Search from './components/Search';
import UserScreen from './components/UserScreen';
import SettingScreen from './components/SettingScreen';
import EditProfileUser from './components/EditProfileUser';
import LibraryScreen from './components/LibraryScreen';

const Stack = createStackNavigator();

const AppContent = () => {
  const { isDarkMode, theme, brightness } = useTheme();

  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor: theme.backgroundColor,
        opacity: brightness 
      }}
    >
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { 
              backgroundColor: theme.primaryBackground 
            },
            headerTintColor: theme.textColor,
            cardStyle: { 
              backgroundColor: theme.backgroundColor,
              opacity: brightness
            }
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Album" component={AlbumScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Track" component={TrackScreen} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfileUser" component={EditProfileUser} options={{ headerShown: false }} />
          <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
