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

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/');
      } else {
        router.push('/Login');  
      }
    }
  }, [user, loading, router]);



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
      
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
    
      
    <Tabs.Screen
          name="profile"
          
        />
    
       
    
    </Tabs>
  );
};

export default TabLayout;
