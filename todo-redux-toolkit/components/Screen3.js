import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = 'https://67100630a85f4164ef2cd231.mockapi.io/todo'; // URL của API

const Screen3 = ({ navigation, route }) => {
  const { userName, setTasks, fetchTasks } = route.params || { userName: 'User' };
  const [job, setJob] = useState('');

  const handleFinish = async () => {
    if (job.trim() === '') {
      Alert.alert('Error', 'Please enter a job description.');
      return;
    }

    try {
      // Thêm công việc mới vào API
      const response = await axios.post(API_URL, { title: job });
      // Cập nhật danh sách công việc
      setTasks(prevTasks => [...prevTasks, response.data]);

      // Fetch lại danh sách công việc mới
      await fetchTasks();

      // Quay lại màn hình trước (Screen2)
      navigation.goBack();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Hi {userName}</Text>
          <Text style={styles.subtitle}>Add a new task</Text>
        </View>
      </View>

      {/* Nội dung chính */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>ADD YOUR JOB</Text>

        {/* Ô nhập liệu */}
        <TextInput 
          style={styles.input} 
          placeholder="Enter job description" 
          value={job}
          onChangeText={setJob} 
        />

        {/* Nút hoàn thành */}
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>FINISH</Text>
          <Ionicons name="checkmark-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2', // Màu tím
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00CED1', 
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
});

export default Screen3;
