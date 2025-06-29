import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";

import { iOSShare } from "./src/bridge/implementations/iOSShare";
import { AndroidShare } from "./src/bridge/implementations/AndroidShare";
import { ShareButton } from "./src/components/ShareButton";

export default function App() {
  // Bridge 패턴: 구현과 추상화를 분리하여, 플랫폼에 따라 다른 공유 기능 사용
  const shareImplementation =
    Platform.OS === "ios" ? new iOSShare() : new AndroidShare();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔗 Bridge 패턴 예제</Text>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.description}>
          아래 버튼을 눌러 플랫폼에 맞는 공유 기능을 실행합니다.
        </Text>
        <ShareButton
          content="이것은 공유할 메시지입니다."
          implementation={shareImplementation}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
});
