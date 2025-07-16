import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserStatus } from "../hooks/useUserStatus";

const Sidebar: React.FC = () => {
  const isLoggedIn = useUserStatus();

  const menuItems: string[] = isLoggedIn
    ? ["• 프로필", "• 설정", "• 알림"]
    : ["로그인 후 이용가능"];

  return (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarTitle}>메뉴</Text>
      {menuItems.map((item: string, index: number) => (
        <Text key={index} style={styles.menuItem}>
          {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 150,
    backgroundColor: "#e0e0e0",
    padding: 15,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
});

export default Sidebar;
