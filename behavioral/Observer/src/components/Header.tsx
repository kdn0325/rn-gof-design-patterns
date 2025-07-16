import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserObserver } from "../hooks/useUserObserver";

const Header: React.FC = () => {
  const user = useUserObserver();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>앱 헤더</Text>
      <Text style={styles.userInfo}>
        {user ? `환영합니다, ${user.name}님!` : "로그인이 필요합니다"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2196F3",
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfo: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
});

export default Header;
