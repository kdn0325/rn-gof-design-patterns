import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AlertFactory } from "./src/factories/AlertFactory";
import { ToastFactory } from "./src/factories/ToastFactory";
import { NotificationFactory } from "./src/factories/NotificationFactory";

// 🔹 UI 컴포넌트에서 상태 관리
export default function App() {
  // 'home' or 'factory' 중 현재 화면 상태
  const [screen, setScreen] = useState<"home" | "factory">("home");

  // 🔹 팩토리 메서드를 통해 알림 객체를 생성하고, 메시지를 보여줌
  const handleNotify = (factory: NotificationFactory) => {
    const notification = factory.createNotification();
    notification.show("안녕하세요! 팩토리 메서드 예제입니다.");
  };

  // 🔹 Factory Method 예제 화면
  if (screen === "factory") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>📢 Factory Method 예제</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNotify(new ToastFactory())}
        >
          <Text style={styles.buttonText}>Toast 알림</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNotify(new AlertFactory())}
        >
          <Text style={styles.buttonText}>Alert 알림</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.buttonText}>← 홈으로</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // 🔹 홈 화면
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎯 디자인 패턴 예제 홈</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setScreen("factory")}
      >
        <Text style={styles.buttonText}>Factory Method 예제 보기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// 🔹 공통 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4B9CD3",
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
  },
  backButton: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
