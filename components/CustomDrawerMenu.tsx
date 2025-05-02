import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CustomDrawerMenu(props: any) {
  const router = useRouter();

  return (
    <View style={ styles.container }>
        <View style={ styles.header }>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', fontFamily: "Inter" }}>Menu</Text>
        </View>

        <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{}}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <View style={ styles.footer }>
            <TouchableOpacity onPress={() => router.push("/")} style={ styles.buttonFull }>
                <Text style={ styles.buttonFullText }>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/")} style={ styles.buttonEmpty }>
                <Text style={ styles.buttonEmptyText }>Inscription</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/")} style={ styles.buttonFull }>
                <Text style={ styles.buttonFullText }>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 18,
        backgroundColor: '#28BF37',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonFull: {
        backgroundColor: '#28BF37',
        padding: 15,
        borderRadius: 8,
    },
    buttonEmpty: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#28BF37',
    },
    buttonFullText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonEmptyText: {
        color: '#28BF37',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        padding: 20,
        paddingBottom: 20,
        gap: 10,
    },
});
