import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants'; 

const CARD_WIDTH = 180;
const CARD_HEIGHT = 240;

type SliderItem = {
  id: number;
  title: string;
  thumbnail: string;
  type: 'information' | 'activity';
};

const URL = Constants.expoConfig?.extra?.URL; 

const Slider = ({
  count = 5,
  title = '',
  fetchFn,
  type = 'information',
}: {
  count: number;
  title: string;
  fetchFn: any;
  type: 'information' | 'activity';
}) => {
  const [pages, setPages] = useState<SliderItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!fetchFn) return;

    fetchFn(count)
      .then((res: { data: any[] }) => {
        const typedPages = res.data.map((item) => ({
          id: item.id,
          title: item.name || item.title || 'Sans titre',
          thumbnail: item.thumbnail || '',
          type,
        }));
        setPages(typedPages);
      })
      .catch((err: unknown) => {
        console.error('Erreur lors du chargement des données:', err);
      });
  }, [count, fetchFn, type]);

  const handlePress = (item: SliderItem) => {
    router.push(`/${type === 'activity' ? 'activities' : 'informations'}/${item.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {pages.map((page) => (
          <TouchableOpacity key={page.id} style={styles.card} onPress={() => handlePress(page)}>
            <Image
              source={{ uri: `${URL}${page.thumbnail}` }}
              style={styles.thumbnail}
            />
            <Text numberOfLines={2} style={styles.cardTitle} ellipsizeMode="tail">
              {page.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};


  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
      marginRight: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    thumbnail: {
      width: '100%',
      height: 170, 
      resizeMode: 'cover',
    },
    cardTitle: {
      padding: 10,
      fontSize: 15,
      fontWeight: '600',
      color: '#333',
      flex: 1,
      textAlignVertical: 'center',
    },
  });
export default Slider;
