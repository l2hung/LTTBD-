import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addTask } from '../index/actions';

const Screen3 = ({ navigation, route }) => {
  const { userName } = route.params || { userName: 'User' };
  const [job, setJob] = useState('');
  const dispatch = useDispatch();

  const handleFinish = () => {
    if (job.trim() === '') {
      Alert.alert('Error', 'Please enter a job description.');
      return;
    }

    dispatch(addTask({ title: job }));
    setJob('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Hi {userName}</Text>
          <Text style={styles.subtitle}>Add a new task</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>ADD YOUR JOB</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="document-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Input your job"
            value={job}
            onChangeText={setJob}
          />
        </View>

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
