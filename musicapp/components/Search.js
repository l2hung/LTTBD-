import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const SearchScreen = () => {
  const [tracks, setTracks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery); // Gọi hàm tìm kiếm mỗi khi searchQuery thay đổi
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://6730d0037aaf2a9aff0efc9d.mockapi.io/tracks');
      setTracks(response.data);
      extractGenresAndArtists(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const extractGenresAndArtists = (tracks) => {
    const genreSet = new Set();
    const artistSet = new Set();

    tracks.forEach((track) => {
      track.genre.split(',').forEach((genre) => genreSet.add(genre.trim()));
      track.artist.split(',').forEach((artist) => artistSet.add(artist.trim()));
    });

    setGenres([...genreSet]);
    setArtists([...artistSet]);
  };

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredTracks([]); // Xóa kết quả tìm kiếm nếu query trống
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = tracks.filter(
        (track) =>
          track.title.toLowerCase().includes(lowerCaseQuery) || // Tìm theo tên bài hát
          track.artist.toLowerCase().includes(lowerCaseQuery) || // Tìm theo nghệ sĩ
          track.genre.toLowerCase().includes(lowerCaseQuery) // Tìm theo thể loại
      );
      setFilteredTracks(filtered);
    }
  };

  const handleFilterByArtist = (artist) => {
    const filtered = tracks.filter((track) =>
      track.artist.toLowerCase().includes(artist.toLowerCase())
    );
    setFilteredTracks(filtered);
  };

  const handleFilterByGenre = (genre) => {
    const filtered = tracks.filter((track) =>
      track.genre.toLowerCase().includes(genre.toLowerCase())
    );
    setFilteredTracks(filtered);
  };

  const handleTrackPress = (track) => {
    // Điều hướng tới TrackScreen và truyền dữ liệu bài hát
    navigation.navigate('Track', { track: track });
  };

  return (
    <LinearGradient colors={['#6F2DBD', '#3B065E']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Thanh tìm kiếm */}
          <View style={styles.header}>
            <View style={styles.searchContainer}>
              <Image source={require('../assets/image11.png')} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="What do you want to listen to?"
                placeholderTextColor="#ccc"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)} // Tìm kiếm theo từ khóa
              />
            </View>
          </View>

          {/* Nghệ sĩ nổi bật */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Artist</Text>
            <FlatList
              horizontal
              data={artists}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.artistCard}
                  onPress={() => handleFilterByArtist(item)} // Lọc theo nghệ sĩ
                >
                  <Text style={styles.artistName}>{item}</Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Duyệt theo danh mục */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse All</Text>
            <View style={styles.genreGrid}>
              {genres.slice(0, 4).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.genreCard}
                  onPress={() => handleFilterByGenre(item)} // Lọc theo thể loại
                >
                  <Text style={styles.genreText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Kết quả tìm kiếm */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {filteredTracks.length > 0 ? (
              <FlatList
                data={filteredTracks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleTrackPress(item)}>
                    <View style={styles.trackCard}>
                      <Text style={styles.trackTitle}>{item.title}</Text>
                      <Text style={styles.trackDetails}>
                        {item.artist} • {item.genre}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.noResults}>No results found</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation />
    </LinearGradient>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7b49e9',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 20,
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  artistCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  artistName: {
    color: '#6F2DBD',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreCard: {
    width: '48%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  genreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6F2DBD',
  },
  trackCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6F2DBD',
  },
  trackDetails: {
    fontSize: 14,
    color: '#777',
  },
  noResults: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  bottomNav: {
     backgroundColor: '#3b065e',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 12,
    color: '#6F2DBD',
  },
});

export default SearchScreen;
