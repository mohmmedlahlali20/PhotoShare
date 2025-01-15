import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Platform, Alert } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '../context/authcontext';

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  console.log('====================================');
  console.log(user);
  console.log('====================================');

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/');
      } else {
        router.push('/login');  
      }
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
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
            router.push('/login'); 
          },
        },
      ]
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {user && (
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
      )}

      {user && (
        <Tabs.Screen
          name="logout"
          options={{
            title: 'Logout',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="arrow.backward.circle.fill" color={color} />
            ),
            tabBarButton: (props) => (
              <HapticTab
                {...props}
                onPress={handleLogout}  // Associe la fonction de déconnexion au bouton
              />
            ),
          }}
        />
      )}
    </Tabs>
  );
};

export default TabLayout;
