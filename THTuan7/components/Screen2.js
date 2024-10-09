import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Screen2 = ({ route, navigation }) => {
  const { userName } = route.params || { userName: 'User' };

  const [tasks, setTasks] = useState([
    { id: '1', title: 'To check email' },
    { id: '2', title: 'UI task web page' },
    { id: '3', title: 'Learn JavaScript basics' },
    { id: '4', title: 'Learn HTML Advanced' },
    { id: '5', title: 'Medical App UI' },
    { id: '6', title: 'Learn Java' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Ionicons name="checkmark-circle-outline" size={20} color="green" />
      <Text style={styles.taskText}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTasks(prevTasks => [...prevTasks]);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Hi {userName}</Text>
          <Text style={styles.subtitle}>Have a great day ahead</Text>
        </View>
      </View>

      {/* Ô tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Search" 
          value={searchQuery}
          onChangeText={setSearchQuery} 
        />
      </View>

      {/* Danh sách công việc */}
      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.taskList}
        />
      ) : (
        <Text style={styles.noTasksText}>No tasks available</Text>
      )}

      {/* Nút thêm công việc */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Screen3', { userName, setTasks })} 
      >
        <Ionicons name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: '#00CED1',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  noTasksText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Screen2;
