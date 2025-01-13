import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import Post from './components/Post';

const MOCK_POSTS = [
    {
        id: '1',
        user: 'johndoe',
        imageUrl: 'https://picsum.photos/seed/1/400/400',
        caption: 'Beautiful day!',
        likes: 42,
    },
    {
        id: '2',
        user: 'janedoe',
        imageUrl: 'https://picsum.photos/seed/2/400/400',
        caption: 'Amazing view!',
        likes: 28,
    },
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="PhotoShare" />
            </Appbar.Header>
            <FlatList
                data={MOCK_POSTS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Post post={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

