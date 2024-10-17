import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Screen1 = ({ navigation }) => {

  const handleGetStarted = () => {
    navigation.navigate('Screen2'); // Truyền tên vào params
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bifour_-removebg-preview@2x.png')} 
        style={styles.image}
      />

      <Text style={styles.title}>POWER BIKE SHOP</Text>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>GET STARTED</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2', // Màu tím
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'red', 
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
});

export default Screen1;
