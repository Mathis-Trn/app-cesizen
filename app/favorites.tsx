import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { getFavorites } from '../services/favoriteService';
import { getToken } from '../services/authService';
import { useRouter, Stack } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import CenteredLayout from '@/components/CentredLayout';

const URL = Constants.expoConfig?.extra?.URL;

export default function FavoritesScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);

  const isWeb = Platform.OS === 'web';
  const numColumns = isWeb ? 3 : 2;
  const itemSpacing = 26;
  const itemWidth = containerWidth / numColumns - itemSpacing;

  const fetchFavorites = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Non connecté');

      const res = await getFavorites();
      setFavorites(res.data);
    } catch (err) {
      console.error('Erreur favoris :', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        fetchFavorites();
      } else {
        setFavorites([]);
        setLoading(false);
      }
    }, [isAuthenticated])
  );

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <TouchableOpacity
      style={[styles.card, { width: itemWidth }]}
      onPress={() => router.push(`/activities/${item.activity.id}`)}
    >
      {item.activity.thumbnail ? (
        <Image
          source={{ uri: `${URL}${item.activity.thumbnail}` }}
          style={[styles.image, isWeb && styles.imageWeb]}
        />
      ) : (
        <View style={[styles.imagePlaceholder, isWeb && styles.imageWeb]} />
      )}
      <Text style={styles.title}>{item.activity.name}</Text>
    </TouchableOpacity>
  );

  return (
    <CenteredLayout>
      <View
        style={styles.container}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
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
          <ActivityIndicator style={{ marginTop: 40 }} />
        ) : !isAuthenticated ? (
          <View style={styles.authContainer}>
            <Text style={styles.empty}>
              Vous devez être connecté pour accéder à vos activités favorites.
            </Text>
            <TouchableOpacity
              style={styles.buttonFull}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.buttonFullText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonEmpty}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.buttonEmptyText}>Inscription</Text>
            </TouchableOpacity>
          </View>
        ) : favorites.length === 0 ? (
          <Text style={styles.empty}>Aucun favori trouvé.</Text>
        ) : (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.h1}>Favoris</Text>
            <FlatList
              data={favorites}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns}
              style={{ width: '100%' }}
              columnWrapperStyle={styles.column}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        )}
      </View>
    </CenteredLayout>
  );
}

type FavoriteItem = {
  id: number;
  activityId: number;
  activity: {
    id: number;
    name: string;
    thumbnail?: string;
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
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
  column: {
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 6,
  },
  imageWeb: {
    height: 160,
  },
  imagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
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
  buttonFull: {
    backgroundColor: '#28BF37',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: 330,
    width: '100%',
  },
  buttonFullText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
});
