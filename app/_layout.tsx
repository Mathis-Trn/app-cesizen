import 'react-native-gesture-handler'
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import CustomDrawerMenu from "../components/CustomDrawerMenu";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

const DrawerLayout = () => {
  const [fontsLoaded] = useFonts({
    Kaushan: require('../assets/fonts/KaushanScript-Regular.ttf'),
    Inter: require('../assets/fonts/Inter.ttf'),
    'Inter-Italic': require('../assets/fonts/Inter-Italic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomDrawerMenu} screenOptions={{
        drawerHideStatusBarOnOpen: false,
        drawerActiveBackgroundColor: "#28BF37",
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: {
          marginLeft: 0,
          fontSize: 15,
          fontFamily: "Inter"
        },
      }}>
        <Drawer.Screen name="index" options={{ 
          drawerLabel: "Accueil",
          headerTitle: "Accueil",
          drawerIcon: ({ size, color}) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }} />
        <Drawer.Screen name="informations" options={{ 
          drawerLabel: "Articles d'information",
          headerTitle: "Articles d'information",
          drawerIcon: ({ size, color}) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          )
        }} />
        <Drawer.Screen name="activities" options={{ 
          drawerLabel: "Activités",
          headerTitle: "Activités",
          drawerIcon: ({ size, color}) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          )
        }} />
        <Drawer.Screen name="profile" options={{ 
          drawerLabel: "Profil",
          headerTitle: "Profil",
          drawerIcon: ({ size, color}) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }} />
        <Drawer.Screen name="settings" options={{ 
          drawerLabel: "Paramètres",
          headerTitle: "Paramètres",
          drawerIcon: ({ size, color}) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )
        }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default DrawerLayout;
