import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { getToken, logout } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function CustomDrawerMenu(props: any) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', fontFamily: "Inter" }}>Menu</Text>
      </View>

      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        {!isAuthenticated && (
          <>
            <TouchableOpacity onPress={() => router.push("/login")} style={styles.buttonFull}>
              <Text style={styles.buttonFullText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/register")} style={styles.buttonEmpty}>
              <Text style={styles.buttonEmptyText}>Inscription</Text>
            </TouchableOpacity>
          </>
        )}
        {isAuthenticated && (
          <TouchableOpacity onPress={handleLogout} style={styles.buttonFull}>
            <Text style={styles.buttonFullText}>Déconnexion</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 1200,
  },
  header: {
    padding: 18,
    backgroundColor: '#28BF37',
    alignItems: 'center',
    justifyContent: 'center',
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
  footer: {
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    padding: 20,
    gap: 10,
  },
});
