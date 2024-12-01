import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Menu item component
const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image source={icon} style={styles.menuIcon} />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

// Bottom navigation component
const BottomNavigation = () => {
  const navigation = useNavigation();
  const navItems = [
    { label: 'Search', icon: require('../assets/image11.png'), screen: 'Search' },
    { label: 'Library', icon: require('../assets/image10.png'), screen: 'Library' },
    { label: 'Home', icon: require('../assets/image9.png'), screen: 'Home' },
    { label: 'User', icon: require('../assets/image14.png'), screen: 'User' },
    { label: 'Setting', icon: require('../assets/image13.png'), screen: 'Setting' },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Image source={item.icon} style={styles.navIcon} />
          <Text style={styles.navLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const UserScreen = () => {
  const route = useRoute();
  const { username } = route.params || {}; // Lấy username từ params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (!username) {
      console.error('Không có username');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://67105e1fa85f4164ef2dbf46.mockapi.io/user');
        const foundUser = response.data.find(user => user.username === username);  // Tìm người dùng theo username
        setUser(foundUser || null);  // Nếu không tìm thấy, đặt user = null
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        setUser(null);
      } finally {
        setLoading(false);  // Kết thúc quá trình tải
      }
    };

    fetchUserData();
  }, [username]);

  const handleLogout = () => {
    // Reset lại navigation stack và chuyển hướng đến màn hình Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ color: '#FFFFFF', marginTop: 10 }}>Đang tải...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center' }}>
          Không tìm thấy thông tin người dùng.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: user.image }}
              style={styles.avatar}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.userName}>{user.username}</Text>
              <Text style={styles.userID}>{user.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfileUser')}>
              <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.menuContainer}>
            <MenuItem 
              icon={require('../icon/settingIcon.png')} 
              label="Cài đặt" 
              onPress={() => navigation.navigate('Setting')} // Điều hướng đến màn hình Setting
            />
            <MenuItem 
              icon={require('../icon/musicIcon.png')} 
              label="Yêu thích" 
              onPress={() => navigation.navigate('Library')} // Điều hướng đến màn hình Yêu thích
            />
            <MenuItem 
              icon={require('../icon/logOutIcon.png')} 
              label="Đăng xuất" 
              onPress={handleLogout} // Đăng xuất và quay lại màn hình Login
            />
        </View>

      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F2DBD', 
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 70,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  userID: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
  },
  editButton: {
    backgroundColor: '#7b49e9', // Matched with HomeScreen searchContainer
    borderRadius: 20,
    padding: 8,
  },
  editButtonText: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#7b49e9', // Matched with HomeScreen searchContainer
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7b49e9', // Matched with HomeScreen searchContainer
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3b065e', // Matched with HomeScreen bottomNav
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  navLabel: {
    color: '#fff',
    fontSize: 10,
  },
});

export default UserScreen;
