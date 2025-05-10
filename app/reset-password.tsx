import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { resetPasswordWithCode } from '../services/authService';
import CenteredLayout from '@/components/CentredLayout';

export default function ResetPassword() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirm) {
      return Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
    }

    try {
      await resetPasswordWithCode(code, newPassword);
      Alert.alert('Mot de passe mis à jour');
      router.replace('/login');
    } catch (err) {
      Alert.alert('Erreur', 'Code invalide ou expiré');
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
        <Text style={styles.title}>Réinitialiser le mot de passe</Text>
        <Text style={styles.text}>Saisissez le code reçu par email et choisissez un nouveau mot de passe.</Text>

        <TextInput
          style={styles.input}
          placeholder="Code reçu par email"
          placeholderTextColor="#999"
          value={code}
          onChangeText={setCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Réinitialiser</Text>
        </TouchableOpacity>
      </View>
    </CenteredLayout>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
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
    fontSize: 16 
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#28BF37',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', textAlign: 'center', fontWeight: 'bold'
  },
});