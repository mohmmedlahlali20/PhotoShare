import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph, IconButton, Avatar, useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');

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
        titleStyle={styles.cardTitle}
        left={(props) => (
          <Avatar.Image
            {...props}
            size={40}
            source={{ uri: `https://i.pravatar.cc/150?u=${post.user}` }}
          />
        )}
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
        <IconButton
          icon="comment-outline"
          size={24}
          onPress={() => {
            console.log('Comment clicked');
          }}
        />
        <IconButton
          icon="share-outline"

          size={24}
          onPress={() => {
            console.log('Share clicked');
          }}
        />
      </Card.Actions>
      <Card.Content>
        <Paragraph style={styles.likes}>{post.likes} likes</Paragraph>
        <View style={styles.captionContainer}>
          <Title style={[styles.username, { color: post.color || '#61DAFB' }]}>{post.user}</Title>
          <Paragraph style={styles.caption}>{post.caption}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
  
    borderRadius: 15,
    backgroundColor: '#2C2C2C',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: width - 32,
    alignSelf: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  image: {
    height: width - 32, 
    margin:10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  actions: {
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#61DAFB',
  },
  caption: {
    color: '#CCCCCC',
    flex: 1,
  },
});

