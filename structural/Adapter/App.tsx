import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { User } from "./src/models/User";
import { UserAdapter } from "./src/adapters/UserApdapter";
import { getUserData } from "./src/api/user";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData()
      .then((externalUser) => {
        const adaptedUser = UserAdapter.adapt(externalUser);
        setUser(adaptedUser);
      })
      .catch((err) => console.error("API 에러:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔌 Adapter 패턴 예제</Text>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {!loading && user && (
        <View style={styles.userBox}>
          <Text>ID: {user.id}</Text>
          <Text>이름: {user.name}</Text>
          <Text>이메일: {user.email}</Text>
        </View>
      )}
      {!loading && !user && (
        <Text style={styles.error}>사용자 정보를 불러올 수 없습니다.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  userBox: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  error: {
    textAlign: "center",
    color: "red",
  },
});
