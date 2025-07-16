import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { userStore } from "../store/UserStore";
import { User } from "../types/User";

const ActionButtons: React.FC = () => {
  const handleLogin = (): void => {
    const userData: User = {
      id: 1,
      name: "김철수",
      email: "kim@example.com",
    };
    userStore.login(userData);
  };

  const handleLogout = (): void => {
    userStore.logout();
  };

  const handleUpdateProfile = (): void => {
    userStore.updateProfile({
      name: "김철수(수정됨)",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Observer 패턴 예시</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>프로필 업데이트</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ActionButtons;
