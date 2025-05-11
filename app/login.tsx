import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import CenteredLayout from '@/components/CentredLayout';

export default function Login() {
  const router = useRouter();
  const { loginSuccess } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      loginSuccess();
      router.replace('/');
    } catch (err: any) {
      Alert.alert('Échec de la connexion', err?.response?.data?.message || '');
    }
  };

  return (
    <CenteredLayout>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <Image
                source={require('../assets/images/logo-cesizen.png')}
                style={styles.headerImage}
              />
            ),
            headerStyle: styles.header,
          }}
        />
        <View style={{ flex: 1, justifyContent: 'center', width: 330 }}>
          <Text style={styles.title}>Connexion</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.buttonFull}>
            <Text style={styles.buttonFullText}>Se connecter</Text>
          </TouchableOpacity>

          <Text style={styles.link} onPress={() => router.push('/forgot-password')}>
            Mot de passe oublié ?
          </Text>
          <Text style={styles.link} onPress={() => router.push('/register')}>
            Pas encore de compte ? S'inscrire
          </Text>
        </View>
      </View>
    </CenteredLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 1200,
  },
  header: {
    backgroundColor: '#fff',
    height: 70,
    shadowColor: 'transparent',
  },
  headerImage: {
    width: 120, 
    height: 40, 
    resizeMode: 'contain' 
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    maxWidth: 330,
    width: '100%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    maxWidth: 330,
    width: '100%',
  },
  link: {
    marginTop: 12,
    color: '#28BF37',
    textAlign: 'center',
  },
  buttonFull: {
    backgroundColor: '#28BF37',
    padding: 15,
    borderRadius: 8,
    maxWidth: 330,
    width: '100%',
  },
  buttonFullText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: 330,
    width: '100%',
  },
});
