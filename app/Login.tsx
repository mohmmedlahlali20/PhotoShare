import { FIREBASE_AUTH } from '@/Firebase.config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IMG from '../assets/images/image.png'

const { width, height } = Dimensions.get('window');

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

      router.push('/(tabs)');
    } catch (err:any) {
      console.error(err);
      setError('Invalid email or password. Please try again.' );
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
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.formContainer, { transform: [{ translateX: shake }] }]}>
        <View style={styles.logoContainer}>
          <Image
            source={IMG}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Welcome back to PhotoShare</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#61DAFB" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#61DAFB" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#666"
          />
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        {loading ? (
          <ActivityIndicator size="large" color="#61DAFB" style={styles.loader} />
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
    backgroundColor: '#1E1E1E', 
  },
  formContainer: {
    width: width * 0.9,
    maxWidth: 400,
    padding: 30,
    borderRadius: 20,
    backgroundColor: '#2C2C2C', 
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#61DAFB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#4A4A4A',
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#61DAFB',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#61DAFB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#1E1E1E',
    fontSize: 18,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#61DAFB',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
  },
});

