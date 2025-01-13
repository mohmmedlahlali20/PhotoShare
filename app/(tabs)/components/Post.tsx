import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';

interface PostProps {
  post: {
    user: string;
    imageUrl: string;
    caption: string;
    likes: number;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <Card style={styles.card}>
      <Card.Title title={post.user} />
      <Card.Content>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <Paragraph>{post.caption}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="heart-outline" onPress={() => {}} />
        <IconButton icon="comment-outline" onPress={() => {}} />
        <IconButton icon="share-outline" onPress={() => {}} />
      </Card.Actions>
      <Card.Content>
        <Paragraph>{post.likes} likes</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});

