import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Detail_Portrait({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>

      {/* Dòng mô tả và giá nằm cùng một hàng */}
      <View style={styles.infoContainer}>
        <Text style={styles.description}>Spicy tasty donut family</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>

      <Text style={styles.delivery}>Delivery in 30 min</Text> {/* Thông tin giao hàng */}

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityCount}>1</Text> {/* Hiện số lượng */}
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => { /* Thêm vào giỏ hàng */ }}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center', 
  },
  image: {
    width: '75%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20, 
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '100%', 
    alignItems: 'center',
    marginBottom: 10, 
  },
  description: {
    fontSize: 16,
    color: '#777',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  delivery: {
    fontSize: 16,
    color: '#888',
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityButton: {
    backgroundColor: '#f0c040', 
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 20,
    color: '#fff',
  },
  quantityCount: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#f0c040', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
