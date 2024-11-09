import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Lấy danh sách người dùng hiện tại
      const response = await fetch('https://67105e1fa85f4164ef2dbf46.mockapi.io/user');
      const users = await response.json();

      // Kiểm tra xem email đã tồn tại hay chưa
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        Alert.alert('Error', 'Email already exists. Please use a different email.');
        return;
      }

      // Tạo người dùng mới
      const newUser = {
        username,
        email,
        password,
      };

      const createUserResponse = await fetch('https://67105e1fa85f4164ef2dbf46.mockapi.io/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (createUserResponse.ok) {
        Alert.alert('Signup Successful', 'Your account has been created!');
        navigation.navigate('Login');
      } else {
        const errorResponse = await createUserResponse.json();
        Alert.alert('Error', errorResponse.message || 'Unable to create account. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.error('Signup error:', error);
    }
  };

  return (
    <LinearGradient colors={['#7F00FF', '#E100FF']} style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
       <View style={styles.iconContainer}>
        <Image source={require('../assets/image1.png')} style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />

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

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.signInText}>
        Already have an account? <Text style={styles.signInLink} onPress={() => navigation.navigate('Login')}>Sign in</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  signUpButton: {
    backgroundColor: '#6A0DAD',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#fff',
  },
  signInLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
