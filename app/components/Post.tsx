import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton, Avatar, useTheme } from 'react-native-paper';

interface PostProps {
  post: {
    user: string;
    imageUrl: string;
    caption: string;
    likes: number;
    color: string;
  };
}

export default function Post({ post }: PostProps) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Title
        title={post.user}
        left={(props) => <Avatar.Image {...props} source={{ uri: `https://i.pravatar.cc/150?u=${post.user}` }} />}
        right={(props) => (
          <IconButton
            {...props}
            icon="dots-vertical"
            onPress={() => {
              console.log('Options clicked');
            }}
          />
        )}
      />
      <Card.Cover source={{ uri: post.imageUrl }} style={styles.image} />
      <Card.Actions style={styles.actions}>
        <IconButton
          icon="heart-outline"
          size={24}
          onPress={() => {
            console.log('Like clicked');
          }}
        />
      </Card.Actions>
      <Card.Content>
        <Paragraph style={styles.likes}>{post.likes} likes</Paragraph>
        <View style={styles.captionContainer}>
          <Title style={[styles.username, { color: post.color || theme.colors.primary }]}>{post.user}</Title>
          <Paragraph>{post.caption}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  actions: {
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#4CAF50',
  },
});