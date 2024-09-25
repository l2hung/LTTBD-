import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ColorSelectionScreen = () => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    { name: 'Silver', hex: 'silver', image: require('../assets/vs_silver.png') },
    { name: 'Red', hex: 'red', image: require('../assets/vs_red.png') },
    { name: 'Black', hex: 'black', image: require('../assets/vs_black.png') },
    { name: 'Blue', hex: 'blue', image: require('../assets/vs_blue.png') }
  ];

  useEffect(() => {
    setSelectedColor(colors[0]);
  }, []);

  const handleDone = () => {
    navigation.navigate('Product', { selectedColor: selectedColor?.hex });
  };

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Image
          source={selectedColor ? selectedColor.image : require('../assets/vs_blue.png')}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Điện Thoại Vsmart Joy 3 - Hàng Chính Hãng</Text>
          <Text style={styles.productPrice}>1.790.000 đ</Text>
          <Text style={styles.productSupplier}>Cung cấp bởi Tiki Trading</Text>
        </View>
      </View>

      <Text style={styles.colorText}>Chọn một màu bên dưới:</Text>
      <View style={styles.colorOptionsContainer}>
        <View style={styles.colorOptions}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorBox,
                { backgroundColor: color.hex },
                selectedColor?.name === color.name ? { borderWidth: 2, borderColor: '#000' } : null // Viền cho màu đã chọn
              ]}
              onPress={() => setSelectedColor(color)}
              accessibilityLabel={`Chọn màu ${color.name}`}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleDone} accessibilityLabel="Hoàn thành lựa chọn màu">
          <Text style={styles.doneButtonText}>XONG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    justifyContent: 'flex-start',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  productImage: {
    width: 120,
    height: 200,
    resizeMode: 'contain',
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  productPrice: {
    fontSize: 18,
    color: '#e90000',
    marginVertical: 8,
  },
  productSupplier: {
    fontSize: 14,
    color: 'gray',
  },
  colorText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  colorOptionsContainer: {
    backgroundColor: '#d3d3d3',
    padding: 16,
    borderRadius: 8,
    flexShrink: 1,
  },
  colorOptions: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorBox: {
    width: 50,
    height: 50,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  doneButton: {
    backgroundColor: '#0042ff',
    padding: 16,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ColorSelectionScreen;
