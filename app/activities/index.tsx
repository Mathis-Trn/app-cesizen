import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { getActivities, getLatestActivities } from '../../services/activityService';
import Slider from '../../components/SliderCard';
import { Stack, useRouter } from 'expo-router';
import Constants from 'expo-constants'; 
import CenteredLayout from '@/components/CentredLayout';

const URL = Constants.expoConfig?.extra?.URL;

export default function Activities() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);

  const isWeb = Platform.OS === 'web';
  const numColumns = isWeb ? 3 : 2;
  const spacing = 26;
  const ITEM_WIDTH = containerWidth / numColumns - spacing;

  const fetchData = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getActivities({
        status: 'PUBLISHED',
        page: reset ? 1 : page,
        query,
        limit: 20,
      });
      const newItems = response.data.items;
      setData((prev) => (reset ? newItems : [...prev, ...newItems]));
      setHasNextPage(response.data.pagination.hasNextPage);
      setPage((prev) => (reset ? 2 : prev + 1));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      if (reset) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, [query]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData(true);
  };

  const onEndReached = () => {
    if (hasNextPage && !loading) {
      fetchData();
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isLastInRow = (index + 1) % numColumns === 0;
  
    return (
      <TouchableOpacity
        style={[
          styles.card,
          { width: ITEM_WIDTH },
          !isLastInRow && { marginRight: 10 }
        ]}
        onPress={() => router.push(`/activities/${item.id}`)}
      >
        {item.thumbnail ? (
          <Image source={{ uri: `${URL}${item.thumbnail}` }} style={[styles.image, isWeb && styles.imageWeb]} />
        ) : (
          <View style={[styles.imagePlaceholder, isWeb && styles.imageWeb]} />
        )}
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  
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
                source={require('../../assets/images/logo-cesizen.png')}
                style={styles.headerImage}
              />
            ),
            headerStyle: styles.header,
          }}
        />

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          columnWrapperStyle={styles.column}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ paddingHorizontal: 20 }}
          ListHeaderComponent={
            <>
              <TextInput
                placeholder="Rechercher..."
                placeholderTextColor="#000"
                value={query}
                onChangeText={setQuery}
                style={styles.searchBar}
              />
              <Slider count={5} title="Dernières Activités" fetchFn={getLatestActivities} type="activity" />
              <Text style={styles.headerTitle}>Activités</Text>
            </>
          }
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.emptyText}>Aucune activité trouvée</Text>
            ) : null
          }
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
        />
      </View>
    </CenteredLayout>
  );
}

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
  searchBar: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginBottom: 16,
    fontFamily: 'Inter-Italic',
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 10,
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
    height: 240,
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
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666',
  },
});
