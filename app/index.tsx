import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Animated , { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Slider from '../components/SliderCard';
import { getLatestActivities } from '../services/activityService';
import { getLatestPages } from '../services/informationService';
import CenteredLayout from '@/components/CentredLayout';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 190;

export default function HomeScreen() {
  interface Page {
    id: string;
    title: string;
    imageUrl: string;
  }

  const router = useRouter();
  
  const [lastestPages, setLatestPages] = useState<Page[]>([]);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOfset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          )
        },
        {
          scale: interpolate(
            scrollOfset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          )
        }
      ]
    }
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOfset.value,
        [0, HEADER_HEIGHT / 2],
        [0, 1]
      ),
    }
  });

  const headerImageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOfset.value,
        [0, HEADER_HEIGHT / 2],
        [0, 1]
      ),
    }
  });

  useEffect(() => {
    getLatestPages(5)
      .then((response) => {
        setLatestPages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching latest pages:', error);
      });
  }, []);

  return (
    <CenteredLayout>
      <View style={styles.container}>
          <Stack.Screen
            options={{
              headerTitle: () => (
                <Animated.Image
                  source={require('../assets/images/logo-cesizen.png')}
                  style={[styles.headerImage, headerImageAnimatedStyle]}
                />
              ),
              headerTransparent: true,
              headerBackground: () => <Animated.View style={[ styles.header, headerAnimatedStyle]}/>,
            }}
          />
          <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{width: '100%'}} >
            <Animated.Image
              source={require('../assets/images/background-header.png')}
              style={ [styles.image, imageAnimatedStyle] }
            />

            <View style={{ padding: 20, backgroundColor: '#fff', width: '100%' }}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Text style={ styles.h1 }>Bienvenue sur CESI<Text style={{fontFamily: 'Kaushan'}}>ZEN </Text>!</Text>
              </View>

              <Slider count={5} title='Derniers Articles' fetchFn={getLatestPages} type="information"/>

              <Slider count={5} title='Dernières Activités' fetchFn={getLatestActivities} type="activity"/>
            
              <View style={styles.textSection}>
                <Text style={styles.h2}>Pourquoi CESI ZEN ?</Text>
                <Text style={styles.text}>Dans un monde où les problématiques de santé mentale sont de plus en plus présentes, il est essentiel de fournir des outils accessibles et adaptés pour sensibiliser à ce sujet.</Text>
                <Text style={styles.text}>Le projet <Text style={{fontWeight: 'bold',}}>CESIZEN</Text> s’inscrit dans cette démarche de sensibilisation et d’accompagnement des individus face aux troubles liés au stress et à la santé mentale.</Text>
                <Text style={styles.text}>Parce qu'il est important d'en parler, nous mettons a votre disposition des articles d'informations ainsi que des activités, vous pouvez également <Text style={{fontWeight: "bold"}}>demander de l'aide</Text> en cliquant sur le bouton ci-dessous.</Text>
              </View>

              <View style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => Linking.openURL("tel:3114")} style={ styles.buttonFull }>
                  <Text style={ styles.buttonFullText }>J'ai besoin d'aide</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </Animated.ScrollView>
      </View>
    </CenteredLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
  },
  innerContent: {
    paddingTop: 0,
    maxWidth: 600,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
  },
  header: {
    backgroundColor: '#fff',
    height: 70,
  },
  headerImage: {
    width: 120, 
    height: 40, 
    resizeMode: 'contain' 
  },
  h1: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 16
  },
  h2: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  textSection: {
    marginBottom: 8,
    width: '100%',
  },
  buttonFull: {
    backgroundColor: '#28BF37',
    padding: 15,
    borderRadius: 8,
    maxWidth: 330,
    width: '100%',
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
  buttonFullText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      maxWidth: 300,
  },
  buttonEmptyText: {
      color: '#28BF37',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      maxWidth: 330,
  },
});