import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Barista } from "./src/builder/Barista";

export default function App() {
  const handleBuildCoffee = () => {
    // 1. Barista 인스턴스 생성 (Builder 역할)
    const coffee = new Barista()
      // 2. Builder 메서드로 원하는 속성을 단계별로 설정
      .setSize("medium") //  커피 사이즈는 미디엄으로 주시고
      .setType("latte") // 커피 종류는 라뗴로 주시고
      .setMilk("oat") // 우유는 오트밀크로 주시고
      .addShot() // 1샷 추가요
      .addShot() // 1샷 추가요
      // 3. build() 호출로 최종 완성된 바리스타가 Coffee 객체 반환함
      .build();

    // 4. 완성된 객체의 정보를 Alert로 출력
    Alert.alert("☕️ 커피 나왔슴다", coffee.describe());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>☕️ 커피 바리스타 예제의 Builder 패턴</Text>
      <TouchableOpacity style={styles.button} onPress={handleBuildCoffee}>
        <Text style={styles.buttonText}>커피 만들기</Text>
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
  button: {
    backgroundColor: "#8B4513",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
});
