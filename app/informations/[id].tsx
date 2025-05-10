import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getPageById } from '../../services/informationService';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import CenteredLayout from '@/components/CentredLayout';

export default function InformationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const URL = Constants.expoConfig?.extra?.URL

  useEffect(() => {
    if (!id) return;
    getPageById(Number(id))
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  if (!data) return <Text style={styles.notFound}>Information non trouvée</Text>;

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
            headerStyle: styles.header,
          }}
        />

        <ScrollView contentContainerStyle={styles.container}>
          
          <TouchableOpacity onPress={() => router.replace('/informations')} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          {data.thumbnail && (
            <Image source={{ uri: `${URL}${data.thumbnail}` }} style={styles.image} />
          )}
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.content}>{data.content}</Text>
        </ScrollView>
      </View>
    </CenteredLayout>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    width: '100%',
    maxWidth: 1200,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8
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
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  notFound: {
    padding: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  backButton: {
    marginBottom: 16,
  },
});