import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedColor, setSelectedColor] = useState(route.params?.selectedColor || 'blue');

  const colorImages = {
    silver: require('../assets/vs_silver.png'),
    red: require('../assets/vs_red.png'),
    black: require('../assets/vs_black.png'),
    blue: require('../assets/vs_blue.png'),
  };

  useEffect(() => {
    if (route.params?.selectedColor) {
      setSelectedColor(route.params.selectedColor);
    }
  }, [route.params?.selectedColor]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={colorImages[selectedColor]}
          style={styles.productImage}
        />
      </View>

      <Text style={styles.title}>Điện Thoại Vsmart Joy 3 - Hàng Chính Hãng</Text>

      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <Ionicons key={index} name="star" size={20} color="yellow" />
        ))}
        <Text style={styles.ratingText}>(Xem 828 đánh giá)</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.newPrice}>1.790.000 đ</Text>
        <Text style={styles.oldPrice}>1.790.000 đ</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
        <Ionicons name="help-circle" size={20} />
      </View>

      <TouchableOpacity
        style={styles.colorButton}
        onPress={() => navigation.navigate('ColorSelection')}
      >
        <Text style={styles.colorText}>4 MÀU - CHỌN MÀU</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>CHỌN MUA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 16,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  colorButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 16,
  },
  colorText: {
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: 'red',
    padding: 16,
    alignItems: 'center',
    borderRadius: 5,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
