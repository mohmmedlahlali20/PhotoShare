import { FIREBASE_AUTH } from '@/Firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      alert('Welcome back!');
    } catch (err) {
      console.error(err);
      alert('Error logging in: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      alert('Account created successfully! Check your email for verification.');
    } catch (err) {
      console.error(err);
      alert('Error registering: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
      <Text style={styles.title}>Welcome back to PhotoShare</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholderTextColor="#888"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={register}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
      </KeyboardAvoidingView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#ff5722',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
});
