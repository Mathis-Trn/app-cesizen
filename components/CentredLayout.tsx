import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

export default function CenteredLayout({ children }: { children: ReactNode }) {
  return <View style={styles.center}>{children}</View>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
});