import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Appbar, Button, Text, useTheme, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { useAuth } from '../context/authcontext';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Se déconnecter',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.push('/Login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Accueil" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title style={styles.welcomeTitle}>Bienvenue, {user?.displayName || 'Utilisateur'} !</Title>
            <Paragraph>Voici votre tableau de bord personnel.</Paragraph>
          </Card.Content>
        </Card>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Title style={styles.statNumber}>42</Title>
              <Paragraph>Posts</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Title style={styles.statNumber}>1337</Title>
              <Paragraph>Likes</Paragraph>
            </Card.Content>
          </Card>
        </View>
        <Card style={styles.recentActivityCard}>
          <Card.Title
            title="Activité récente"
            left={(props) => <Avatar.Icon {...props} icon="history" />}
          />
          <Card.Content>
            <Paragraph>Voici vos dernières activités sur la plateforme.</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    },
    header: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  scrollContent: {
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recentActivityCard: {
    marginBottom: 16,
  },
});

