import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios

// Main HomeScreen component
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Album />
          <Tracks />
        </ScrollView>
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
};

// New Album Releases component
const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6730d0037aaf2a9aff0efc9d.mockapi.io/Album');
        setAlbums(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAlbumPress = (albumId) => {
    navigation.navigate('Album', { albumId });
  };

  if (loading) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <Text style={styles.albumText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Albums</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {albums && albums.length > 0 ? (
          albums.map((album, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAlbumPress(album.id)}
              style={styles.albumContainer}
            >
              <Image
                source={{ uri: album.image }}  
                style={styles.albumArt}
              />
              <Text style={styles.albumText}>{album.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.albumText}>No albums found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

// Tracks component
const Tracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6730d0037aaf2a9aff0efc9d.mockapi.io/tracks');
        setTracks(response.data || []);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTrackPress = (track) => {
    navigation.navigate('Track', { track });
  };

  if (loading) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tracks</Text>
        <Text style={styles.albumText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tracks</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tracks && tracks.length > 0 ? (
          tracks.map((track, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTrackPress(track)}
              style={styles.albumContainer}
            >
              <Image
                source={{ uri: track.image }}  
                style={styles.albumArt}
              />
              <Text style={styles.albumText}>{track.title}</Text>
              <Text style={styles.artistText}>{track.artist}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.albumText}>No tracks found.</Text>
        )}
      </ScrollView>
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

// Styles for components
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
  container: {
    flex: 1,
    backgroundColor: '#6F2DBD',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  albumContainer: {
    alignItems: 'center',
    marginRight: 20,
    width: 160,
  },
  albumArt: {
    width: 160,
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
  albumText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  artistText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
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

export default HomeScreen;
