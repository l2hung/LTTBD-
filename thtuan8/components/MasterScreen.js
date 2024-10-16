import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

export default function MasterScreen({ navigation }) {
  const [donuts, setDonuts] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredDonuts, setFilteredDonuts] = useState([]);

  useEffect(() => {
    fetchDonuts();
  }, []);

  const fetchDonuts = () => {
    axios
      .get('https://67100630a85f4164ef2cd231.mockapi.io/donut')
      .then(response => {
        console.log(response.data); // Kiểm tra dữ liệu đã lấy
        setDonuts(response.data);
        setFilteredDonuts(response.data); 
      })
      .catch(error => console.error('Lỗi khi lấy donuts:', error));
  };

  const handleFilter = (category) => {
    if (category) {
      const filtered = donuts.filter(donut => donut.type === category);
      setFilteredDonuts(filtered);
    } else {
      setFilteredDonuts(donuts); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search food"
        value={filter}
        onChangeText={text => {
          setFilter(text);
          const filtered = donuts.filter(donut => donut.name.toLowerCase().includes(text.toLowerCase()));
          setFilteredDonuts(filtered);
        }}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('tasty')}>
          <Text style={styles.filterText}>Donut</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('pink')}>
          <Text style={styles.filterText}>Pink Donut</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('floating')}>
          <Text style={styles.filterText}>Floating Donut</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('')}> 
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredDonuts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { item })}>
            <View style={styles.donutItem}>
              <Image source={{ uri: item.image }} style={styles.donutImage} />
              <View style={styles.donutInfo}>
                <Text style={styles.donutName}>{item.name}</Text>
                <Text style={styles.donutPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#f0c040',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  donutItem: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  donutImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  donutInfo: {
    flex: 1,
  },
  donutName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  donutPrice: {
    fontSize: 16,
    color: '#888',
  },
});
