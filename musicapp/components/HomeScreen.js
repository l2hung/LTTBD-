import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Client ID và Client Secret của bạn từ Spotify Developer Dashboard
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

// Thành phần HomeScreen chính
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <NewAlbum />
        <NewTracks />  {/* Thêm phần New Tracks ở đây */}
        <MadeForYou />
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

// Thành phần Header
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.greetingText}>Good Evening,</Text>
    <View style={styles.searchContainer}>
      <Image
        source={require('../assets/image11.png')}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="What do you want to play ?"
        placeholderTextColor="#ffffff"
      />
    </View>
  </View>
);

// Thành phần New Album Releases
const NewAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (!token) return;

      try {
        // Lấy danh sách album nổi bật từ Spotify API
        const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setAlbums(data.albums.items || []);
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
        <Text style={styles.sectionTitle}>New Album Releases</Text>
        <Text style={styles.albumText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>New Albums</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {albums && albums.length > 0 ? (
          albums.map((album, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAlbumPress(album.id)}
              style={styles.albumContainer}
            >
              <Image
                source={{ uri: album.images[0].url }}
                style={styles.albumArt}
              />
              <Text style={styles.albumText}>{album.name}</Text>
              <Text style={styles.artistText}>{album.artists.map(artist => artist.name).join(', ')}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.albumText}>No albums found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

// Thành phần New Track Releases
const NewTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (!token) return;

      try {
        // Lấy danh sách các track mới từ playlist nổi bật
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // Lấy các track từ playlist (có thể thêm logic lọc các track mới nhất ở đây)
        const tracksFromPlaylists = data.playlists.items.map((playlist) => playlist.tracks.items).flat();
        setTracks(tracksFromPlaylists);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTrackPress = (trackId) => {
    navigation.navigate('Track', { trackId });
  };

  if (loading) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Track Releases</Text>
        <Text style={styles.albumText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>New Tracks</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tracks && tracks.length > 0 ? (
          tracks.map((track, index) => {
            // Kiểm tra nếu track và track.track tồn tại
            if (track && track.track) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleTrackPress(track.track.id)}
                  style={styles.albumContainer}
                >
                  <Image
                    source={{ uri: track.track.album.images[0].url }}
                    style={styles.albumArt}
                  />
                  <Text style={styles.albumText}>{track.track.name}</Text>
                  <Text style={styles.artistText}>
                    {track.track.artists.map((artist) => artist.name).join(', ')}
                  </Text>
                </TouchableOpacity>
              );
            }
            return null; // Trả về null nếu không có track hợp lệ
          })
        ) : (
          <Text style={styles.albumText}>No tracks found.</Text>
        )}
      </ScrollView>
    </View>
  );
};


// Thành phần MadeForYou
const MadeForYou = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      if (!token) return;

      try {
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPlaylists(data.playlists.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Made For You</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {playlists.map((playlist, index) => (
          <View key={index} style={styles.albumContainer}>
            <Image source={{ uri: playlist.images[0].url }} style={styles.albumArt} />
            <Text style={styles.albumText}>{playlist.name}</Text>
            <Text style={styles.artistText}>{playlist.owner.display_name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Thành phần BottomNavigation
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

// Styles cho các thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F2DBD',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7b49e9',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
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
  },
  navLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default HomeScreen;
