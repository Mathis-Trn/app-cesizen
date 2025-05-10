import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getActivityById } from '../../services/activityService';
import { getActivityType } from '../../services/activityTypeService';
import { addFavorite, removeFavorite, getFavorites } from '../../services/favoriteService';
import moment from 'moment';
import 'moment/locale/fr';
import { useAuth } from '../../context/AuthContext';
import Constants from 'expo-constants';
import CenteredLayout from '@/components/CentredLayout';

export default function ActivityDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const URL = Constants.expoConfig?.extra?.URL

  useEffect(() => {
    if (!id) return;
  
    const fetchData = async () => {
      try {
        const res = await getActivityById(Number(id));
        setActivity(res.data);
  
        if (isAuthenticated) {
          const favRes = await getFavorites();
          const isFav = favRes.data.some((fav: any) => fav.activity.id === Number(id));
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error('Erreur activité :', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id, isAuthenticated]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      return Alert.alert(
        'Connexion requise',
        'Vous devez être connecté pour ajouter une activité aux favoris.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Se connecter', onPress: () => router.push('/login') },
        ]
      );
    }
  
    try {
      if (isFavorite) {
        await removeFavorite(Number(id));
        setIsFavorite(false);
      } else {
        await addFavorite(Number(id));
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Erreur favoris :', err);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  if (!activity) return <Text style={styles.notFound}>Activité non trouvée</Text>;

  return (
    <CenteredLayout>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerTitle: () => (
              <Image
                source={require('../../assets/images/logo-cesizen.png')}
                style={styles.headerImage}
              />
            ),
            headerRight: () => (
              <TouchableOpacity style={styles.favoriteBtn} onPress={toggleFavorite}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={22}
                  color={isFavorite ? '#ff4444' : '#555'}
                />
              </TouchableOpacity>
            ),
            headerStyle: styles.header,
          }}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={() => router.replace('/activities')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          {activity.thumbnail && (
            <Image source={{ uri: `${URL}${activity.thumbnail}` }} style={styles.image} />
          )}
          
          <Text style={styles.title}>{activity.name}</Text>

          {activity.type.id && (
            <Text style={styles.type}>Type : {activity.type.label}</Text>
          )}

          {activity.publicationDate && (
            <Text style={styles.meta}>
              📅 Publiée le {moment(activity.publicationDate).format('DD MMMM YYYY')}
            </Text>
          )}

          {activity.duration && (
            <Text style={styles.meta}>⏱️ Durée : {activity.duration} min</Text>
          )}

          {activity.stressLevel && (
            <Text style={styles.meta}>
              🧘 Niveau de stress : {getStressLabel(activity.stressLevel)}
            </Text>
          )}

          <Text style={styles.content}>{activity.description}</Text>
        </ScrollView>
      </View>
    </CenteredLayout>
  );
}

function getStressLabel(level: number) {
  switch (level) {
    case 1:
      return 'Très faible 🧘';
    case 2:
      return 'Faible 😌';
    case 3:
      return 'Modéré 🙂';
    case 4:
      return 'Élevé 😰';
    case 5:
      return 'Très élevé 😱';
    default:
      return 'Inconnu';
  }
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    width: '100%',
    maxWidth: 1200,
  },
  backButton: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  favoriteBtn: {
    marginRight: 16,
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginTop: 12,
  },
  notFound: {
    padding: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
