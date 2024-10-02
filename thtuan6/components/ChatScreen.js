import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
  {
    id: '1',
    product: 'Ca nấu lẩu, nấu mì mini...',
    shop: 'Shop Devang',
    imageUrl: require('../assets/ca_nau_lau.png'), 
  },
  {
    id: '2',
    product: '1KG KHÔ GÀ BƠ TỎI...',
    shop: 'Shop LTD Food',
    imageUrl: require('../assets/ga_bo_toi.png'), 
  },
  {
    id: '3',
    product: 'Xe cần cẩu đa năng',
    shop: 'Shop Thế giới đồ chơi',
    imageUrl: require('../assets/xa_can_cau.png'), 
  },
  {
    id: '4',
    product: 'Đồ chơi dạng mô hình',
    shop: 'Shop Thế giới đồ chơi',
    imageUrl: require('../assets/do_choi_dang_mo_hinh.png'), 
  },
  {
    id: '5',
    product: 'Lãnh đạo giản đơn',
    shop: 'Shop Minh Long Book',
    imageUrl: require('../assets/lanh_dao_gian_don.png'), 
  },
  {
    id: '6',
    product: 'Hiểu lòng con trẻ',
    shop: 'Shop Minh Long Book',
    imageUrl: require('../assets/hieu_long_con_tre.png'), 
  }
];


const ChatScreen = ({ navigation }) => { 
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image 
        source={item.imageUrl ? item.imageUrl : placeholderImage} 
        style={styles.image} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.product}>{item.product}</Text>
        <Text style={styles.shop}>{item.shop}</Text>
      </View>
      <TouchableOpacity 
        style={styles.chatButton} 
        onPress={() => alert('Chat with ' + item.shop)}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}> {/* Quay lại màn hình trước */}
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity onPress={() => alert('Cart pressed')}>
          <Ionicons name="cart" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.paragraph}>
        Bạn có thắc mắc với sản phẩm vừa xem đừng ngại chát với shop!
      </Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}> 
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
          <Ionicons name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Menu pressed')}>
          <Ionicons name="menu" size={30} color="white" />
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
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph:{
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 10,
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  product: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shop: {
    color: 'gray',
  },
  chatButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  chatButtonText: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1BA9FF',
  },
});

export default ChatScreen;
