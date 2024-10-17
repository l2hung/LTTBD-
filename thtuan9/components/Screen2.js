import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import axios from 'axios';

export default function Screen2({ navigation }) {
  const [bikes, setBikes] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredBikes, setFilteredBikes] = useState([]);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = () => {
    axios
      .get('https://67105e1fa85f4164ef2dbf46.mockapi.io/bike')
      .then(response => {
        console.log(response.data);
        setBikes(response.data);
        setFilteredBikes(response.data); 
      })
      .catch(error => console.error('Error fetching bikes:', error));
  };

  const handleFilter = (category) => {
    if (category) {
      const filtered = bikes.filter(bike => bike.type === category);
      setFilteredBikes(filtered);
    } else {
      setFilteredBikes(bikes);
    }
  };

  const { width } = Dimensions.get('window'); 

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>The world’s Best Bike</Text>
      <TextInput
        value={filter}
        onChangeText={text => {
          setFilter(text);
          const filtered = bikes.filter(bike => bike.name.toLowerCase().includes(text.toLowerCase()));
          setFilteredBikes(filtered);
        }}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('')}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('road')}>
          <Text style={styles.filterText}>Roadbike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('mountain')}>
          <Text style={styles.filterText}>Mountain</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredBikes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Screen3', { item })}>
            <View style={[styles.bikeItem, { width: (width / 2) - 20 }]}>  {/* Adjust width dynamically */}
              <Image source={{ uri: item.image }} style={styles.bikeImage} />
              <View style={styles.bikeInfo}>
                <Text style={styles.bikeName}>{item.name}</Text>
                <Text style={styles.bikePrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}  
        columnWrapperStyle={styles.row}  
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
    color: "red",
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
  row: {
    justifyContent: 'space-between',
  },
  bikeItem: {
    flexDirection: 'column',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor:'#ffe6f2'
  },
  bikeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  bikeInfo: {
    alignItems: 'center',
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bikePrice: {
    fontSize: 14,
    color: '#888',
  },
});
