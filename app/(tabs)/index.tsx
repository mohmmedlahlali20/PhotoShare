import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, StatusBar, Text } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Post from '../components/Post';

const MOCK_POSTS = [
  {
    id: '1',
    user: 'johndoe',
    imageUrl: 'https://picsum.photos/seed/1/400/400',
    caption: 'Beautiful day!',
    likes: 42,
    color: '#FF6347',
  },
  {
    id: '3',
    user: 'janedoe',
    imageUrl: 'https://picsum.photos/seed/3/400/400',
    caption: 'Amazing view!',
    likes: 28,
    color: '#00BFFF',
  },
  {
    id: '4',
    user: 'johndoe',
    imageUrl: 'https://picsum.photos/seed/4/400/400',
    caption: 'Beautiful day!',
    likes: 42,
    color: '#32CD32',
  },
  {
    id: '5',
    user: 'janedoe',
    imageUrl: 'https://picsum.photos/seed/5/400/400',
    caption: 'Amazing view!',
    likes: 28,
    color: '#FFD700',
  },
  {
    id: '6',
    user: 'johndoe',
    imageUrl: 'https://picsum.photos/seed/6/400/400',
    caption: 'Beautiful day!',
    likes: 42,
    color: '#FF1493',
  },
  {
    id: '7',
    user: 'janedoe',
    imageUrl: 'https://picsum.photos/seed/107/150/150',
    caption: 'Amazing view!',
    likes: 28,
    color: '#8A2BE2',
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermissions();
  }, []);

  const handleCameraPress = async () => {
    if (hasPermission) {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        console.log('Image captured:', result);
      }
    } else {
      alert('Permission to access camera is required.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#1E1E1E' }]}>
      <StatusBar barStyle="light-content" backgroundColor="#2C2C2C" />
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="PhotoShare" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="camera" color="#61DAFB" onPress={handleCameraPress} />
      </Appbar.Header>
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} />}
        contentContainerStyle={styles.postList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    backgroundColor: '#2C2C2C',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 20,
  },
  postList: {
    paddingBottom: 16,
  },
});
