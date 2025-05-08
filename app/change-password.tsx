import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { changePassword } from '../services/profilService';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ChangePassword() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleChange = async () => {
    if (newPassword !== confirm) {
      return Alert.alert('Les mots de passe ne correspondent pas');
    }

    try {
      await changePassword({ oldPassword, newPassword });
      Alert.alert('Mot de passe mis à jour');
      router.back();
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de modifier le mot de passe');
      console.error(err);
    }
  };

  return (
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

      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => router.push("/profile")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.h1}>Changer le mot de passe</Text>

      <Text style={styles.label}>Mot de passe actuel</Text>
      <TextInput
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
        placeholderTextColor="#999"
        style={styles.input}
        placeholder="Mot de passe actuel"
      />

      <Text style={styles.label}>Nouveau mot de passe</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        placeholderTextColor="#999"
        style={styles.input}
        placeholder="Nouveau mot de passe"
      />

      <Text style={styles.label}>Confirmer le mot de passe</Text>
      <TextInput
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        placeholderTextColor="#999"
        style={styles.input}
        placeholder="Confirmez le mot de passe"
      />

      <TouchableOpacity onPress={handleChange} style={styles.buttonFull}>
        <Text style={styles.buttonFullText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
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
  topSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonFull: {
    backgroundColor: '#28BF37',
    padding: 15,
    borderRadius: 8,
  },
  buttonFullText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
