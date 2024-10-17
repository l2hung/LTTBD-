import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Screen3({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <Text style={styles.title}>{item.name}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.discountText}>15% OFF | ${item.price}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <Text style={styles.descriptionHeader}>Description</Text>
      <Text style={styles.description}>{item.description}</Text>

      <TouchableOpacity style={styles.button} onPress={() => { () => navigation.goBack() }}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 25,
    backgroundColor:''
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  discountText: {
    fontSize: 16,
    color: 'red',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
