import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const TrackScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { track } = route.params;

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!track) {
      console.error('Track data is missing!');
      return;
    }

    const updatePlaybackStatus = async () => {
      if (sound) {
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setPlaybackPosition(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
          }
        });
      }
    };

    updatePlaybackStatus();

    return () => {
      sound?.unloadAsync();
    };
  }, [sound, track]);

  useFocusEffect(
    React.useCallback(() => {
      // Khi màn hình được focus
      return () => {
        // Khi màn hình mất focus
        if (sound) {
          sound.pauseAsync();
          setIsPlaying(false);
        }
      };
    }, [sound])
  );

  const handlePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: track.audioURL },
          { shouldPlay: true }
        );
        setSound(newSound);
      } else {
        await sound.playAsync();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000);
    }
  };

  const handleVolumeIncrease = async () => {
    const newVolume = Math.min(volume + 0.1, 1);
    setVolume(newVolume);
    if (sound) {
      await sound.setVolumeAsync(newVolume);
    }
  };

  const handleVolumeDecrease = async () => {
    const newVolume = Math.max(volume - 0.1, 0);
    setVolume(newVolume);
    if (sound) {
      await sound.setVolumeAsync(newVolume);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (sound) {
              sound.pauseAsync();
              setIsPlaying(false);
            }
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Image source={{ uri: track.image }} style={styles.artwork} />

        <View style={styles.trackInfo}>
          <Text style={styles.trackName}>{track.title}</Text>
          <Text style={styles.artistName}>{track.artist}</Text>
        </View>

        <View style={styles.progressContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={duration}
            value={playbackPosition}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
            onSlidingStart={() => sound?.pauseAsync()}
            onSlidingComplete={handleSeek}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(playbackPosition)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={handleVolumeDecrease}>
            <Ionicons name="remove-circle" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
            <Ionicons
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={64}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleVolumeIncrease}>
            <Ionicons name="add-circle" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavigation sound={sound} setIsPlaying={setIsPlaying} />
    </SafeAreaView>
  );
};

const BottomNavigation = ({ sound, setIsPlaying }) => {
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
          onPress={() => {
            if (sound) {
              sound.pauseAsync();
              setIsPlaying(false);
            }
            navigation.navigate(item.screen);
          }}
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
    backgroundColor: '#8A2BE2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  artwork: {
    width: 280,
    height: 280,
    borderRadius: 20,
    marginTop: 40,
  },
  trackInfo: {
    alignItems: 'center',
    marginTop: 32,
  },
  trackName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  artistName: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginTop: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: '100%',
  },
  playButton: {
    marginHorizontal: 40,
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

export default TrackScreen;
