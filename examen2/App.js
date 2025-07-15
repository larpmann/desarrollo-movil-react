import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { auth } from './components/firebaseConfig';
import SignInForm from './components/SignInForm';
import RegisterForm from './components/SignUpForm';
import { login, register, logout } from './services/authService';

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('signIn');
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (auth) {
        setIsAuthReady(true);
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          setUser(currentUser);
          if (currentUser) setScreen('home');
        });
        return unsubscribe;
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await login(email, password);
      setUser(userCredential);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const userCredential = await register(email, password);
      setUser(userCredential);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setScreen('signIn');
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isAuthReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user && screen === 'home' ? (
        <View style={styles.homeContainer}>
          <Text style={styles.welcomeText}>Bienvenido!! {user.email}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Cerrar sesión"
              onPress={handleLogout}
              color="#FF3B30"
            />
          </View>
        </View>
      ) : screen === 'signIn' ? (
        <SignInForm
          onSignIn={handleLogin}
          onNavigateToRegister={() => setScreen('register')}
        />
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          onNavigateToSignIn={() => setScreen('signIn')}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 8,
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
});
