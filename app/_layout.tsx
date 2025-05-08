import 'react-native-gesture-handler'
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import CustomDrawerMenu from "../components/CustomDrawerMenu";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from "../context/AuthContext";
import api from '../services/api';

const DrawerLayout = () => {
  const [fontsLoaded] = useFonts({
    Kaushan: require('../assets/fonts/KaushanScript-Regular.ttf'),
    Inter: require('../assets/fonts/Inter.ttf'),
    'Inter-Italic': require('../assets/fonts/Inter-Italic.ttf'),
  });

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={CustomDrawerMenu} screenOptions={{
          drawerActiveBackgroundColor: "#28BF37",
          drawerActiveTintColor: "#fff",
          drawerLabelStyle: {
            marginLeft: 0,
            fontSize: 15,
            fontFamily: "Inter"
          },
          drawerType: "slide",
          drawerHideStatusBarOnOpen: false,
          headerTitleAlign: 'center',
          swipeEdgeWidth: 70,
          headerTintColor: "#28BF37",
        }}>
          <Drawer.Screen name="index" options={{ 
            drawerLabel: "Accueil",
            drawerIcon: ({ size, color}) => (
              <Ionicons name="home-outline" size={size} color={color} />
            )
          }} />
          <Drawer.Screen name="informations/index" options={{ 
            drawerLabel: "Articles d'information",
            drawerIcon: ({ size, color}) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            )
          }} />
          <Drawer.Screen name="activities/index" options={{ 
            drawerLabel: "Activités",
            drawerIcon: ({ size, color}) => (
              <Ionicons name="barbell-outline" size={size} color={color} />
            )
          }} />
          <Drawer.Screen name="favorites" options={{
            drawerLabel: "Favoris",
            drawerIcon: ({ size, color}) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            )
          }} />
          <Drawer.Screen name="profile" options={{ 
            drawerLabel: "Profil",
            drawerIcon: ({ size, color}) => (
              <Ionicons name="person-outline" size={size} color={color} />
            )
          }} />
          <Drawer.Screen name={"activities/[id]"} options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }} />
          <Drawer.Screen name={"informations/[id]"} options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }} />
          <Drawer.Screen name={"login"} options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }} />
          <Drawer.Screen name={"register"} options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }} />
          <Drawer.Screen name={"forgot-password"} options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }} />
          <Drawer.Screen name={"reset-password"} options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }} />
          <Drawer.Screen name={"change-password"} options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }} />
          <Drawer.Screen name={"edit-profile"} options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }} />
        </Drawer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

export default DrawerLayout;
