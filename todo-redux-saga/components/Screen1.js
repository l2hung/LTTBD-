import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleGetStarted = () => {
    navigation.navigate('Screen2', { userName: name });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/book.png')} style={styles.image} />
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>GET STARTED</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff',
  },
  image: { width: 150, height: 150, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#8A2BE2', marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc',
    borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 20, width: '100%',
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16 },
  button: {
    flexDirection: 'row', backgroundColor: '#00CED1', padding: 15, borderRadius: 15, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, marginRight: 10 },
});

export default Screen1;
