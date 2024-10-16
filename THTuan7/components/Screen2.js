import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = 'https://67100630a85f4164ef2cd231.mockapi.io/todo'; // Cập nhật URL API

const Screen2 = ({ route, navigation }) => {
  const { userName } = route.params || { userName: 'User' };

  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Delete task
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  // Update task
  const handleUpdateTask = (id, newTitle) => {
    axios
      .put(`${API_URL}/${id}`, {
        title: newTitle,
      })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? response.data : task))
        );
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  // Render task item
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Ionicons name="checkmark-circle-outline" size={20} color="green" />
      <Text style={styles.taskText}>{item.title}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleDelete(item.id)} accessibilityLabel="Delete task">
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdateTask(item.id, "New Title")} accessibilityLabel="Update task">
          
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Hi {userName}</Text>
          <Text style={styles.subtitle}>Have a great day ahead</Text>
        </View>
      </View>

      {/* Search input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Search" 
          value={searchQuery}
          onChangeText={setSearchQuery} 
        />
      </View>

      {/* Task list */}
      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={styles.taskList}
        />
      ) : (
        <Text style={styles.noTasksText}>No tasks available</Text>
      )}

      {/* Add task button */}
      <View style={styles.addTaskContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Screen3', { userName, setTasks, fetchTasks })}
          style={styles.addButton}
        >
          <Ionicons name="add-outline" size={30} color="#fff" />
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
  searchContainer: {
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
  taskList: {
    width: '100%',
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  addButton: {
    backgroundColor: '#00CED1',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  noTasksText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Screen2;
