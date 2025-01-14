import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper'; 
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

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="PhotoShare" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="camera" onPress={() => {}} />
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
      backgroundColor: '#f9f9f9',
    },
    header: {
      backgroundColor: '#4CAF50',
      elevation: 4,
    },
    headerTitle: {
      fontWeight: 'bold',
      color: '#fff',
    },
    postList: {
      paddingBottom: 16,
      paddingHorizontal: 10,
    },
  });
  