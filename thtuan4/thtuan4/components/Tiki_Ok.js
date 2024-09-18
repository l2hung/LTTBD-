import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const BookStore = () => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(141.800);
  const [originalPrice] = useState(141.800);
  const [discountCode, setDiscountCode] = useState('');

  const handleQuantityChange = (change) => {
    if (quantity + change >= 1) {
      setQuantity(quantity + change);
    }
  };

  const totalPrice = price * quantity;

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <View style={styles.topSection}>
          <Image
            source={{
              uri: 'https://salt.tikicdn.com/cache/750x750/ts/product/7a/5e/62/8a692ce25c7ed5778c5e2e72576a15cc.jpg.webp',
            }}
            style={styles.bookImage}
          />
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>Nguyên hàm tích phân và ứng dụng</Text>
            <Text style={styles.bookTitle2}>Cung cấp bởi Tiki Trading</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.discountedPrice}>{totalPrice.toFixed(3)} đ</Text>
              <Text style={styles.originalPrice}>{originalPrice.toFixed(3)} đ</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(-1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.discountSection}>
          <View style={styles.discountContainer}>
            <TextInput
              style={styles.discountInput}
              placeholder="Mã giảm giá"
              value={discountCode}
              onChangeText={setDiscountCode}
            />
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={() => {}}>
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section2}>
        <Text style={styles.voucherText}>
          Bạn có phiếu quà tặng Tiki/Got it/ Urbox ?
        </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Nhập tại đây</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.section3}>
        <View style={styles.summaryRow}>
          <Text style={styles.priceTitle1}>Tạm tính</Text>
          <Text style={styles.priceText}>{totalPrice.toFixed(3)} đ</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.priceTitle2}>Thành tiền</Text>
          <Text style={styles.priceText}>{totalPrice.toFixed(3)} đ</Text>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={() => {}}>
          <Text style={styles.orderButtonText}>TIẾN HÀNH ĐẶT HÀNG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section1: {
    flex: 4,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bookImage: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  bookDetails: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookTitle2: {
    fontSize: 16,
    color: 'grey',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: '#999',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
  },
  discountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  discountContainer: {
    flex: 1,
    marginRight: 10,
  },
  discountInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#ffeb3b', // Yellow background like in the image
  },
  applyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
  },
  section2: {
  flexDirection: 'row', // Căn các phần tử theo chiều ngang
  backgroundColor: 'white',
  padding: 10,
  marginBottom: 10,
  justifyContent: 'space-between', // Tạo khoảng cách giữa văn bản và liên kết
  alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
},
  voucherText: {
    fontSize: 12, // Điều chỉnh kích thước văn bản theo nhu cầu
  },
  linkText: {
    color: 'blue',
    fontSize: 12,
  },

  section3: {
    backgroundColor: 'white',
    padding: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceTitle2: {
    fontSize: 18,
    color: 'grey',
  },
  priceText: {
    color: 'red',
    fontSize: 18,
  },
  orderButton: {
    backgroundColor: '#E53935', // Red background
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookStore;
