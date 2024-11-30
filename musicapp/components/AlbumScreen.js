import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AlbumScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { albumId } = route.params;
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAlbumFavorite, setIsAlbumFavorite] = useState(false);
  const [trackFavorites, setTrackFavorites] = useState({});

  useEffect(() => {
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
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`https://67105e1fa85f4164ef2dbf46.mockapi.io/user/${userId}`);
          setCurrentUser(response.data);

          const isFavorite = response.data.album.some(item => item.id === albumId);
          setIsAlbumFavorite(isFavorite);

          const trackStatus = {};
          (response.data.song || []).forEach(song => {
            trackStatus[song.id] = true;
          });
          setTrackFavorites(trackStatus);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchAlbum();
    fetchCurrentUser();
  }, [albumId]);

  const handleTrackPress = (track) => {
    navigation.navigate('Track', { track });
  };

  const handleAddAlbumToFavorites = async () => {
    if (!currentUser || !album) return;

    try {
      const updatedFavorites = [...currentUser.album];
      const isAlreadyFavorite = updatedFavorites.some(item => item.id === album.id);

      if (isAlreadyFavorite) {
        const newFavorites = updatedFavorites.filter(item => item.id !== album.id);
        await updateUserData({ album: newFavorites });
        setIsAlbumFavorite(false);
      } else {
        updatedFavorites.push(album);
        await updateUserData({ album: updatedFavorites });
        setIsAlbumFavorite(true);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const handleAddTrackToFavorites = async (track) => {
    if (!currentUser || !track) return;

    try {
      const updatedTrackFavorites = { ...trackFavorites };
      const isAlreadyFavorite = updatedTrackFavorites[track.id];

      if (isAlreadyFavorite) {
        const updatedSongs = (currentUser.song || []).filter(song => song.id !== track.id);
        await updateUserData({ song: updatedSongs });
        updatedTrackFavorites[track.id] = false;
        setTrackFavorites(updatedTrackFavorites);
      } else {
        updatedTrackFavorites[track.id] = true;
        setTrackFavorites(updatedTrackFavorites);
        const updatedSongs = [...(currentUser.song || []), track];
        await updateUserData({ song: updatedSongs });
      }
    } catch (error) {
      console.error('Error adding track to favorites:', error);
    }
  };

  const updateUserData = async (data) => {
    if (!currentUser) return;

    try {
      const updatedUser = { ...currentUser, ...data };
      await axios.put(`https://67105e1fa85f4164ef2dbf46.mockapi.io/user/${currentUser.id}`, updatedUser);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddAlbumToFavorites} style={styles.favoriteButton}>
            <Ionicons
              name={isAlbumFavorite ? "heart" : "heart-outline"}
              size={30}
              color={isAlbumFavorite ? "red" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.headerContent}>
          <Image source={{ uri: album.image }} style={styles.albumArt} />
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.albumArtist}>{album.artist}</Text>
        </View>

        <View style={styles.trackList}>
          {album.tracks.map((track, index) => (
            <View key={index} style={styles.trackContainer}>
              <TouchableOpacity onPress={() => handleTrackPress(track)} style={styles.trackInfoContainer}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackArtist}>{track.artist}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddTrackToFavorites(track)} style={styles.favoriteButton}>
                <Ionicons
                  name={trackFavorites[track.id] ? "heart" : "heart-outline"}
                  size={30}
                  color={trackFavorites[track.id] ? "red" : "#fff"}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
  },
  favoriteButton: {
    padding: 10,
    backgroundColor: 'transparent',
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
    borderTopColor: '#ffffff20',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
  },
});

export default AlbumScreen;
