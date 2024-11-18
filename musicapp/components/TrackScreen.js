import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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

// Màn hình TrackScreen
const TrackScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { track } = route.params; // Nhận dữ liệu từ màn hình trước

  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [volume, setVolume] = useState(1); // Mặc định âm lượng tối đa là 1

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Giải phóng tài nguyên khi màn hình bị đóng
        }
      : undefined;
  }, [sound]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        { uri: track.audioURL },
        { shouldPlay: true }
      );
      setSound(sound);
    }
    setIsPlaying(!isPlaying);
  };

  const adjustVolume = async (increase) => {
    let newVolume = volume + (increase ? 0.1 : -0.1);
    newVolume = Math.max(0, Math.min(1, newVolume)); // Giới hạn âm lượng trong khoảng [0, 1]
    setVolume(newVolume);
    if (sound) {
      await sound.setVolumeAsync(newVolume);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút Back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
      </View>

      {/* Thông tin bài hát */}
      <View style={styles.trackContainer}>
        <Image source={{ uri: track.image }} style={styles.trackArt} />
        <Text style={styles.trackTitle}>{track.title}</Text>
        <Text style={styles.trackArtist}>{track.artist}</Text>

        {/* Thanh điều khiển phát nhạc */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => setPlaybackPosition(playbackPosition - 10)}>
            <Ionicons name="play-skip-back" size={36} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
            <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={64} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPlaybackPosition(playbackPosition + 10)}>
            <Ionicons name="play-skip-forward" size={36} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Thanh thời gian */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{playbackPosition}s</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(playbackPosition / 180) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>3:00</Text>
        </View>

        {/* Điều chỉnh âm lượng */}
        <View style={styles.volumeControls}>
          <TouchableOpacity onPress={() => adjustVolume(false)} style={styles.volumeButton}>
            <Text style={styles.volumeText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
          <TouchableOpacity onPress={() => adjustVolume(true)} style={styles.volumeButton}>
            <Text style={styles.volumeText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation ở dưới */}
      <BottomNavigation />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F2DBD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#7b49e9',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trackContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  trackArt: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  trackArtist: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  playButton: {
    marginHorizontal: 20,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  progressBar: {
    width: '90%',
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#fff',
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
  volumeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  volumeButton: {
    padding: 10,
    backgroundColor: '#6F2DBD',
    borderRadius: 5,
  },
  volumeText: {
    color: '#fff',
    fontSize: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3B065E',
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

export default TrackScreen;
