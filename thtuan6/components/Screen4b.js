import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const DATA = [
  {
    id: '1',
    product: 'Cáp chuyển từ Cổng USB sang PS2...',
    imageUrl: require('../assets/giacchuyen_1.png'),
    price: '69.900 VNĐ',
    discount: '-39%', 
    rating: 4.0,
    reviews: 15,
  },
  {
    id: '2',
    product: 'Cáp chuyển từ Cổng USB sang PS2...',
    imageUrl: require('../assets/daynguon_1.png'),
    price: '69.900 VNĐ',
    discount: '-39%', 
    rating: 4.0,
    reviews: 15,
  },
  {
    id: '3',
    product: 'Cáp chuyển từ Cổng USB sang PS2...',
    imageUrl: require('../assets/dauchuyendoipsps2_1.png'),
    price: '69.900 VNĐ',
    discount: '-39%', 
    rating: 4.0,
    reviews: 15,
  },
  {
    id: '4',
    product: 'Cáp chuyển từ Cổng USB sang PS2...',
    imageUrl: require('../assets/dauchuyendoi1.png'),
    price: '69.900 VNĐ',
    discount: '-39%', 
    rating: 4.0,
    reviews: 15,
  },
  {
    id: '5',
    product: 'Cáp chuyển từ Cổng USB sang PS2...',
    imageUrl: require('../assets/carbusbtops2_1.png'),
    price: '69.900 VNĐ',
    discount: '-39%', 
    rating: 4.0,
    reviews: 15,
  },
  {
    id: '6',
    product: 'Cáp chuyển từ Cổng USB sang PS2...',
    imageUrl: require('../assets/daucam1.png'),
    price: '69.900 VNĐ',
    discount: '-39%', 
    rating: 4.0,
    reviews: 15,
  }
];

const numColumns = 2;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);

  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Ionicons 
        key={i} 
        name={i < rating ? "star" : "star-outline"} 
        size={16} 
        color="gold" 
      />
    );
  }
  return stars;
};

const Screen4b = () => {
  const navigation = useNavigation(); // Khai báo useNavigation

  const renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.itemContainer, styles.itemInvisible]} />;
    }

    return (
      <View style={styles.itemContainer}>
        <Image
          source={item.imageUrl}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.product}>{item.product}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.discount}>{item.discount}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {renderStars(Math.round(item.rating))}
            <Text style={styles.reviewCount}> ({item.reviews})</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor="#888"
            value="Dây cáp usb"
            onChangeText={(text) => console.log(text)} 
          />
        </View>

        <View style={styles.cartContainer}>
          <Ionicons name="cart" size={24} color="white" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>✓</Text>
          </View>
        </View>

        {/* Icon menu 3 chấm ngang */}
        <TouchableOpacity onPress={() => alert('Menu pressed')}>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <FlatList
        data={formatData(DATA, numColumns)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        style={styles.list}
      />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => alert('Menu pressed')}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1BA9FF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    height: 35,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'black',
  },
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 10,
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 5,
    borderRadius: 5,
  },
  textContainer: {
    alignItems: 'center',
  },
  product: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  discount: {
    fontSize: 12,
    color: 'grey',
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  reviewCount: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1BA9FF',
  },
});

export default Screen4b;
