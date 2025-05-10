import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Image } from 'react-native';
import { getProfil, deleteProfile } from '../services/profilService';
import { useRouter, Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import CenteredLayout from '@/components/CentredLayout';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const res = await getProfil();
      setProfile(res.data);
    } catch (err) {
      console.error('Erreur chargement profil :', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        setLoading(true);
        fetchProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    }, [isAuthenticated])
  );

  const handleDelete = async () => {
    Alert.alert(
      'Supprimer votre profil',
      'Cette action est irréversible. Voulez-vous continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProfile();
              Alert.alert('Profil supprimé');
              router.replace('/login');
            } catch (err) {
              console.error('Erreur suppression :', err);
            }
          },
        },
      ]
    );
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
        {loading ? (
          <ActivityIndicator style={{ marginTop: 50 }} />
        ) : !isAuthenticated ? (
          <View style={styles.authContainer}>
            <Text style={styles.empty}>
              Vous devez être connecté pour accéder à votre profil.
            </Text>
            <TouchableOpacity style={[styles.buttonFull , { width: "100%" }]} onPress={() => router.push('/login')}>
              <Text style={styles.buttonFullText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonEmpty, { width: "100%" }]} onPress={() => router.push('/register')}>
              <Text style={styles.buttonEmptyText}>Inscription</Text>
            </TouchableOpacity>
          </View>
        ) : !profile ? (
          <Text style={styles.error}>Impossible de charger le profil</Text>
        ) : (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.title}>Mon Profil</Text>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Nom :</Text>
              <Text style={styles.value}>{profile.name}</Text>

              <Text style={styles.label}>Email :</Text>
              <Text style={styles.value}>{profile.email}</Text>

              <Text style={styles.label}>Rôle :</Text>
              <Text style={styles.value}>{profile.role?.label}</Text>
            </View>

            <TouchableOpacity style={styles.buttonFull} onPress={() => router.push('/edit-profile')}>
              <Text style={styles.buttonFullText}>Modifier le profil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonEmpty} onPress={() => router.push('/change-password')}>
              <Text style={styles.buttonEmptyText}>Changer le mot de passe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDanger} onPress={handleDelete}>
              <Text style={styles.buttonDangerText}>Supprimer le compte</Text>
            </TouchableOpacity>
          </View>
        )}
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
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
    maxWidth: 330,
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
  infoBox: { 
    marginBottom: 30,
    width: '100%',
    maxWidth: 330,
  },
  label: { 
    fontWeight: '600', 
    marginTop: 10 
  },
  value: { 
    fontSize: 16, 
    color: '#333' 
  },
  error: { 
    marginTop: 50, 
    textAlign: 'center', 
    color: '#999' 
  },
  buttonFull: {
    backgroundColor: '#28BF37',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
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
  buttonEmpty: {
    backgroundColor: '#fff',
    borderColor: '#28BF37',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
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
  buttonDanger: {
    backgroundColor: '#ff3d3d', 
    padding: 15,
    borderRadius: 8,
    maxWidth: 330,
    width: '100%',
  },
  buttonDangerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  authContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
