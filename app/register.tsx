import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { register } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import CenteredLayout from '@/components/CentredLayout';

export default function Register() {
  const { loginSuccess } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      await register({ email, password, confirmPassword, name });
      loginSuccess();
      router.replace('/');
    } catch (err: any) {
      Alert.alert("Erreur d'inscription");
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
          <Text style={styles.title}>Inscription</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.buttonEmpty} onPress={handleRegister}>
            <Text style={{ color: '#28BF37', fontWeight: 'bold' }}>S'inscrire</Text>
          </TouchableOpacity>
          <Text style={styles.link} onPress={() => router.push('./login')}>
            Déjà inscrit ? Se connecter
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
      maxWidth: 330,
      width: '100%',
    },
    buttonEmpty: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#28BF37',
        maxWidth: 330,
        width: '100%',
    },
    buttonEmptyText: {
        color: '#28BF37',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        maxWidth: 330,
        width: '100%',
    },
  });
  