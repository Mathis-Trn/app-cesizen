import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { forgotPassword } from '../services/authService';
import CenteredLayout from '@/components/CentredLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await forgotPassword(email);
      Alert.alert('Email envoyé', 'Un code de réinitialisation a été envoyé.');
      router.push('/reset-password');
    } catch (err) {
      Alert.alert('Erreur', 'Impossible d’envoyer l’email.');
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
        <Text style={styles.title}>Mot de passe oublié</Text>
        <Text style={styles.text}>Entrez votre adresse e-mail pour recevoir un code de réinitialisation.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
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
    resizeMode: 'contain',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  text: { 
    marginBottom: 20, 
    fontSize: 16, 
    maxWidth: 330,
    width: '100%',
  },
  input: {
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 6,
    padding: 10, 
    marginBottom: 16,
    maxWidth: 330,
    width: '100%',
  },
  button: {
    backgroundColor: '#28BF37', 
    padding: 15, 
    borderRadius: 8,
    maxWidth: 330,
    width: '100%',
  },
  buttonText: {
    color: '#fff', textAlign: 'center', fontWeight: 'bold'
  },
});