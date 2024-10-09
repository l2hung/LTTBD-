import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Screen3 = ({ navigation, route }) => {
  const { userName, setTasks } = route.params || { userName: 'User' }; 
  const [job, setJob] = useState('');

  const handleFinish = () => {
    if (job.trim() === '') {
      Alert.alert('Error', 'Please enter a job description.'); 
      return;
    }
    
    // Tạo ID mới cho công việc
    const newTask = {
      id: (Math.random() * 1000).toString(), // Tạo ID ngẫu nhiên cho công việc mới
      title: job,
    };

    // Gọi setTasks để thêm công việc mới vào danh sách
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    console.log('Job added:', job);
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      {/* Header chứa nút quay lại và thông điệp */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Hi {userName}</Text>
          <Text style={styles.subtitle}>Have a great day ahead</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>FINISH</Text>
          <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Hình ảnh */}
        <Image
          source={require('../assets/Book.png')}
          style={styles.image}
        />
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
  backButton: {
    marginRight: 10, 
  },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 15, 
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
    alignItems: 'center', 
    width: '100%', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00CED1',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center', 
  },
});

export default Screen3;
