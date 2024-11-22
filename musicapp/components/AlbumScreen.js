import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Thành phần AlbumScreen
const AlbumScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { albumId } = route.params; // Nhận albumId từ HomeScreen
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // Thông tin người dùng đăng nhập
  const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích album

  useEffect(() => {
    // Fetch album và người dùng hiện tại
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`https://6730d0037aaf2a9aff0efc9d.mockapi.io/Album/${albumId}`);
        setAlbum(response.data);
      } catch (error) {
        console.error('Error fetching album:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        // Lấy userId từ AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`https://67105e1fa85f4164ef2dbf46.mockapi.io/user/${userId}`);
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchAlbum();
    fetchCurrentUser();
  }, [albumId]);

  const handleTrackPress = (track) => {
    navigation.navigate('Track', { track }); // Điều hướng đến màn hình Track
  };

  const handleAddAlbumToFavorites = async () => {
    if (!currentUser) return;

    try {
      let updatedFavorites = [...currentUser.album];

      if (isFavorite) {
        // Nếu album đã được yêu thích, hủy yêu thích (xóa khỏi danh sách yêu thích)
        updatedFavorites = updatedFavorites.filter(item => item.id !== album.id);
        setIsFavorite(false);
        console.log(`Album "${album.title}" removed from favorites!`);
      } else {
        // Nếu album chưa được yêu thích, thêm vào danh sách yêu thích
        updatedFavorites.push(album);
        setIsFavorite(true);
        console.log(`Album "${album.title}" added to favorites!`);
      }

      await axios.put(`https://67105e1fa85f4164ef2dbf46.mockapi.io/user/${currentUser.id}`, {
        album: updatedFavorites,
      });
      setCurrentUser((prev) => ({ ...prev, album: updatedFavorites }));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading album...</Text>
      </View>
    );
  }

  if (!album) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Album not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header với nút Back */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
           {/* Nút thêm album vào danh sách yêu thích */}
          <TouchableOpacity
            onPress={handleAddAlbumToFavorites}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={30}
              color={isFavorite ? "red" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        {/* Thông tin Album */}
        <View style={styles.headerContent}>
          <Image source={{ uri: album.image }} style={styles.albumArt} />
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.albumArtist}>{album.artist}</Text>
        </View>

        {/* Danh sách bài hát */}
        <View style={styles.trackList}>
          {album.tracks.map((track, index) => (
            <View key={index} style={styles.trackContainer}>
              {/* Thông tin bài hát */}
              <TouchableOpacity
                onPress={() => handleTrackPress(track)}
                style={styles.trackInfoContainer}
              >
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackArtist}>{track.artist}</Text>
              </TouchableOpacity>
              {/* Nút thêm bài hát yêu thích */}
              <TouchableOpacity
                onPress={() => handleAddTrackToFavorites(track)}
                style={styles.favoriteButton}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

// BottomNavigation component
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
          onPress={() => navigation.navigate(item.screen)}
          style={styles.navItem}
        >
          <Image source={item.icon} style={styles.navIcon} />
          <Text style={styles.navLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F2DBD',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  albumTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  albumArtist: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  trackList: {
    marginTop: 20,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff20',
  },
  trackInfoContainer: {
    flex: 1,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  trackArtist: {
    color: '#FFFFFF',
    fontSize: 14,
  },
 favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 5,
    backgroundColor: '#555',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3b065e',
    paddingVertical: 10,
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

export default AlbumScreen;
