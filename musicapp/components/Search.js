import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Client ID và Client Secret từ Spotify Developer Dashboard
const CLIENT_ID = 'b49c2c5cc7104653a0e227d3fe01acdd';
const CLIENT_SECRET = 'f7459ec66cce4abeb36280c3b27dcf77';

// Hàm lấy Access Token từ Spotify
const getAccessToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    if (data.error) {
      console.error('Lỗi khi lấy token:', data.error);
      return null;
    }
    return data.access_token;
  } catch (error) {
    console.error('Lỗi khi lấy token:', error);
    return null;
  }
};
// Main SearchScreen Component
const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <SearchBar />
        <TrendingArtists />
        <BrowseGenres />
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

// SearchBar Component
const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="What do you want to listen to?"
        placeholderTextColor="#ffffff"
      />
    </View>
  );
};
// TrendingArtists Component with Spotify API integration
const TrendingArtists = () => {
  const [artists, setArtists] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const token = await getAccessToken();  
        if (!token) return;
        
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setArtists(response.data.albums.items.map(item => ({
          name: item.artists[0].name,
          image: item.images[0].url,
          id: item.artists[0].id,
        })));
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <View>
      <Text style={styles.trendingTitle}>Trending Artists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.artistsScroll}>
        {artists.map((artist, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.artistContainer}
            onPress={() => navigation.navigate('ArtistDetail', { artistId: artist.id })}
          >
            <Image source={{ uri: artist.image }} style={styles.artistImage} />
            <Text style={styles.artistName}>{artist.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// BrowseGenres Component with Spotify API integration
const BrowseGenres = () => {
  const [genres, setGenres] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const token = await getAccessToken();  
        if (!token) return;

        const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setGenres(response.data.genres.map((genre, index) => ({
          name: genre,
          color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
          id: index,
        })));
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <View>
      <Text style={styles.browseTitle}>Browse All Genres</Text>
      <View style={styles.genresContainer}>
        {genres.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.genreCard, { backgroundColor: genre.color }]}
            onPress={() => navigation.navigate('GenreDetail', { genreName: genre.name })}
          >
            <Text style={styles.genreText}>{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


// BottomNavigation Component
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
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7b49e9',
    borderRadius: 26,
    paddingHorizontal: 15,
    height: 52,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  trendingTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 15,
  },
  artistsScroll: {
    marginBottom: 20,
  },
  artistContainer: {
    alignItems: 'center',
    marginRight: 32,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  browseTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 15,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreCard: {
    borderRadius: 15,
    width: '40%',
    height: 50,
    marginBottom: 20,
    padding: 10,
    justifyContent: 'space-between',
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
  },
  navLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default SearchScreen;
