import { FIREBASE_AUTH } from '@/Firebase.config';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IMG from '../assets/images/image.png'

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake] = useState(new Animated.Value(0));

  const auth = FIREBASE_AUTH;

  const register = async () => {
    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      alert('Account created successfully! Check your email for verification.');
    } catch (err) {
      console.error(err);
      alert('Error registering: ' + err);
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
        <Text style={styles.title}>Join PhotoShare</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#4CAF50" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#888"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={register}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkContainer}>
              <Link href="/Login" style={styles.link}>
                Already have an account?
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
    backgroundColor: '#282c34', // Dark modern background
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 40,
    borderRadius: 20,
    backgroundColor: '#fff', // White background for form
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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

