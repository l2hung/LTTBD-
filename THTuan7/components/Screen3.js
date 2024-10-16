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

        {/* Ô nhập công việc */}
        <View style={styles.inputContainer}>
          <Ionicons name="document-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Input your job"
            value={job}
            onChangeText={setJob}
          />
        </View>

        {/* Nút "Finish" */}
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
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
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginVertical: 10,
  },
  finishButton: {
    backgroundColor: '#00CED1',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Screen3;
