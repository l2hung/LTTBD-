import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

const SettingScreen = () => {
  const navigation = useNavigation();
  const { 
    isDarkMode, 
    theme, 
    brightness, 
    toggleDarkMode, 
    setBrightness 
  } = useTheme();

  const handleLogout = () => {
    navigation.replace('Login'); // Chuyển về màn hình Login
  };

  const navItems = [
    { label: 'Search', icon: require('../assets/image11.png'), screen: 'Search' },
    { label: 'Library', icon: require('../assets/image10.png'), screen: 'Library' },
    { label: 'Home', icon: require('../assets/image9.png'), screen: 'Home' },
    { label: 'User', icon: require('../assets/image14.png'), screen: 'User' },
    { label: 'Setting', icon: require('../assets/image13.png'), screen: 'Setting' },
  ];

  const settingsItems = [
    { label: 'Brightness', icon: require('../icon/brightnessIcon.png') },
    { label: 'Volume', icon: require('../icon/volumeIcon.png') },
    { label: 'Language', icon: require('../icon/languageIcon.png') },
    { label: 'Dark Mode', icon: require('../icon/darkModeIcon.png') },
    { label: 'Notifications', icon: require('../icon/NotificationIcon.png') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.content}>
        <Text style={[styles.header, { color: theme.textColor }]}>Settings</Text>

        {/* Brightness Control */}
        <View style={styles.controlContainer}>
          <Image source={settingsItems[0].icon} style={styles.settingIcon} />
          <Text style={[styles.label, { color: theme.textColor }]}>{settingsItems[0].label}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={brightness * 100}
            onValueChange={value => setBrightness(value / 100)}
            minimumTrackTintColor={theme.primaryColor}
            maximumTrackTintColor="rgba(255,255,255,0.3)"
          />
          <Text style={[styles.percentage, { color: theme.textColor }]}>
            {Math.round(brightness * 100)}%
          </Text>
        </View>

        {/* Dark Mode and Logout */}
        <View style={styles.controlContainer}>
          <Image source={settingsItems[3].icon} style={styles.settingIcon} />
          <Text style={[styles.label, { color: theme.textColor }]}>{settingsItems[3].label}</Text>
          <Switch 
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutContainer}
          onPress={handleLogout} // Đăng xuất và quay lại màn hình Login
        >
          <Image 
            source={require('../icon/logOutIcon.png')} // Đường dẫn icon
            style={styles.logoutIcon} 
          />
          <Text style={[styles.logoutLabel, { color: theme.textColor }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.backgroundColor }]}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={`nav-${index}`}
            onPress={() => navigation.navigate(item.screen)}
            style={styles.navItem}
          >
            <Image source={item.icon} style={styles.navIcon} resizeMode="contain" />
            <Text style={[styles.navLabel, { color: theme.textColor }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  controlContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  slider: {
    flex: 2,
    height: 40,
  },
  percentage: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 16,
  },
  settingIcon: {
    width: 32,
    height: 32,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  logoutIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  logoutLabel: {
    fontSize: 16,
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

export default SettingScreen;
