import { FIREBASE_AUTH } from '@/Firebase.config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IMG from '../assets/images/image.png'

export default function Login() {
  const [email, setEmail] = useState('mohmmedlaeh81@gmail.com');
  const [password, setPassword] = useState('mohmmedlaeh81');
  const [loading, setLoading] = useState(false);
  const [shake] = useState(new Animated.Value(0));
  const [error, setError] = useState('');

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      alert('Welcome back!');
      router.push('/(tabs)');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
      shakeAnimation();
    } finally {
      setLoading(false);
    }
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Animated.View style={[styles.formContainer, { transform: [{ translateX: shake }] }]}>
        <View style={styles.logoContainer}>
          <Image
            source={IMG}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Welcome back to PhotoShare</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#ffffff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            placeholderTextColor="#bbb"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#ffffff" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#bbb"
          />
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkContainer}>
              <Link href='/Register' style={styles.link}>
                Create new account
              </Link>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </KeyboardAvoidingView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34', 
  },
  formContainer: {
    
    
    padding: 40,
    borderRadius: 20,
    backgroundColor: '#fff', 
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputIcon: {
    padding: 10,
    color: '#4CAF50',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loader: {
    marginTop: 15,
  },
  linkContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  link: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

