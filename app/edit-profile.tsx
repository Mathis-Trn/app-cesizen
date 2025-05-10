import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { getProfil, updateProfil } from '../services/profilService';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CenteredLayout from '@/components/CentredLayout';

export default function EditProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await getProfil();
      setProfile(res.data);
      setName(res.data.name);
    } catch (err) {
      console.error('Erreur chargement profil :', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await updateProfil({ name });
      Alert.alert('Profil mis à jour');
      router.back();
    } catch (err) {
      Alert.alert('Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

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

        <View style={styles.topSection}>
          <TouchableOpacity onPress={() => router.push("/profile")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Modifier le profil</Text>

        <Text style={styles.label}>Nom</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#999"
          placeholder="Votre nom"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={profile?.email}
          editable={false}
          style={styles.input}
          placeholderTextColor="#999"
          placeholder="Votre email"
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonFull}>
          <Text style={styles.buttonFullText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </CenteredLayout>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20,
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
  topSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 20,
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
    fontWeight: 'bold',
    fontSize: 16,
    maxWidth: 330,
    width: '100%',
  },
});
