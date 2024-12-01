import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme } from '../ThemeContext'; // Adjust path if necessary
import { Ionicons } from '@expo/vector-icons';

const EditProfileUser = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('Charlotte');
  const [userID, setUserID] = useState('000123');
  const [userBio, setUserBio] = useState('Music Lover');
  const [avatar, setAvatar] = useState('https://imgur.com/2IGXlnE.jpg'); 

  const handleChangePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = response.assets[0].uri;
        setAvatar(source);
      }
    });
  };

  const handleSaveProfile = () => {
    
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.changePhotoButton} onPress={handleChangePhoto}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter username"
          placeholderTextColor="#FFFFFF80"
        />
      </View>

      {/* User ID Input (Read Only) */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>User ID</Text>
        <TextInput
          style={styles.input}
          value={userID}
          editable={false}
          placeholder="User ID"
          placeholderTextColor="#FFFFFF80"
        />
      </View>

      {/* Bio Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Bio</Text>
        <TextInput
          style={styles.multilineInput}
          value={userBio}
          onChangeText={setUserBio}
          placeholder="Tell us about yourself"
          placeholderTextColor="#FFFFFF80"
          multiline
          numberOfLines={4}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F2DBD',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#7b49e9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  changePhotoButton: {
    backgroundColor: '#7b49e9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changePhotoText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#7b49e9',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  multilineInput: {
    backgroundColor: '#7b49e9',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default EditProfileUser;
