import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user and their liked albums
  const fetchCurrentUserAndAlbums = async () => {
    try {
      setRefreshing(true);
      // Get userId from AsyncStorage
      const userId = await AsyncStorage.getItem('userId');
      
      if (!userId) {
        // If no user is logged in, clear liked albums
        setLikedAlbums([]);
        return;
      }

      // Fetch user details to get their liked albums
      const userResponse = await axios.get(`https://67105e1fa85f4164ef2dbf46.mockapi.io/user/${userId}`);
      const user = userResponse.data;
      setCurrentUser(user);

      // Use the user's liked albums directly
      const sortedAlbums = (user.album || []).map((album, index) => ({
        ...album,
        name: `My Playlist ${index + 1}`
      }));
      
      setLikedAlbums(sortedAlbums);
    } catch (error) {
      console.error('Error fetching liked albums:', error);
      Alert.alert('Error', 'Could not fetch liked albums');
    } finally {
      setRefreshing(false);
    }
  };

  // Use useFocusEffect to refresh liked albums when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchCurrentUserAndAlbums();
    }, [])
  );

  // Remove album from liked albums
  const handleRemoveAlbum = async (albumId) => {
    if (!currentUser) return;

    try {
      // Remove the album from user's liked albums
      const updatedAlbums = (currentUser.album || []).filter(album => album.id !== albumId);
      
      // Update user data on the server
      await axios.put(`https://67105e1fa85f4164ef2dbf46.mockapi.io/user/${currentUser.id}`, {
        ...currentUser,
        album: updatedAlbums
      });

      // Update local state
      setLikedAlbums(updatedAlbums.map((album, index) => ({
        ...album,
        name: `My Playlist ${index + 1}`
      })));
    } catch (error) {
      console.error('Error removing album:', error);
      Alert.alert('Error', 'Could not remove album');
    }
  };

  // Handle album press to navigate to album details
  const handleAlbumPress = (albumId) => {
    navigation.navigate('Album', { albumId });
  };

  // BottomNavigation component (unchanged)
  const BottomNavigation = () => {
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../icon/libraryIcon.png')} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Liked Albums</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Liked Albums Content */}
      <ScrollView 
        style={styles.playlist}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchCurrentUserAndAlbums}
            colors={['#ffffff']}
            tintColor={'#ffffff'}
          />
        }
      >
        {likedAlbums.length === 0 ? (
          <Text style={styles.emptyStateText}>No liked albums yet</Text>
        ) : (
          likedAlbums.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.playlistItem}
              onPress={() => handleAlbumPress(item.id)}
            >
              <Image source={{ uri: item.image }} style={styles.playlistImage} />
              <View style={styles.playlistText}>
                <Text style={styles.playlistTitle}>{item.name}</Text>
                <Text style={styles.playlistSubtitle}>{item.artist}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveAlbum(item.id)}>
                <Text style={styles.playlistMore}>✖</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged from the previous implementation
  container: {
    flex: 1,
    backgroundColor: '#6F2DBD',
  },
  emptyStateText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#3b065e',
  },
  headerIcon: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerButton: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  playlist: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7e57c2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  playlistText: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  playlistSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  playlistMore: {
    fontSize: 24,
    color: '#FFFFFF',
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

export default LibraryScreen;