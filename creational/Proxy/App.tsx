import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  View,
} from "react-native";
import { SettingsProxy } from "./src/proxy/AuthProxy";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 사용자의 로그인 상태

  const handleUpdateSettings = () => {
    // 🧱 프록시 객체를 통해 UserSettings에 간접 접근 - 프록시는 내부에서 로그인 여부를 확인한 후 실제 객체에 요청을 전달할지 말지를 결정
    const settings = new SettingsProxy(isLoggedIn);
    settings.updateSettings();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔐 Proxy 패턴 예제</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>로그인 상태:</Text>
        <Switch
          value={isLoggedIn}
          onValueChange={setIsLoggedIn}
          trackColor={{ false: "#ccc", true: "#4682B4" }}
          thumbColor={isLoggedIn ? "#fff" : "#888"}
        />
        <Text>{isLoggedIn ? "ON" : "OFF"}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdateSettings}>
        <Text style={styles.buttonText}>설정 변경하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 36 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
    padding: 16,
  },
  label: {
    fontSize: 16,
  },

  button: {
    backgroundColor: "#4682B4",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});
