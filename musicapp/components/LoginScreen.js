import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper'; // Sử dụng Checkbox từ react-native-paper

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('https://67105e1fa85f4164ef2dbf46.mockapi.io/user');
      const users = await response.json();

      if (response.ok) {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          Alert.alert('Login Successful', `Welcome back, ${user.username || 'User'}!`);
          navigation.navigate('Home'); 
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      } else {
        Alert.alert('Error', 'Unable to fetch users');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <LinearGradient colors={['#7F00FF', '#E100FF']} style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/image1.png')} style={styles.icon} />
      </View>
      
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue listening</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.rememberMeContainer}>
        <Checkbox
          status={rememberMe ? 'checked' : 'unchecked'}
          onPress={() => {
            setRememberMe(!rememberMe);
          }}
          color="#FFF" // Màu cho Checkbox
        />
        <Text style={styles.rememberMeText}>Remember Me</Text>
        <TouchableOpacity style={styles.forgotPassword} onPress={() => Alert.alert('Forgot Password', 'This feature is not implemented yet.')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don’t have an account? <Text style={styles.signUpLink} onPress={() => navigation.navigate('Signup')}>Sign up</Text>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '100%',
    marginBottom: 20,
  },
  rememberMeText: {
    color: '#fff',
    marginRight: 'auto', 
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: '#6A0DAD',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#fff',
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
