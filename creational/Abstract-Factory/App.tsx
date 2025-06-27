import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
  View,
  StatusBar,
} from "react-native";
import { darkThemeFactory } from "./src/abstractFactory/factory/DarkThemeFactory";
import { lightThemeFactory } from "./src/abstractFactory/factory/LightThemeFactory";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // 현재 선택된 테마 팩토리
  const factory = isDarkTheme ? darkThemeFactory : lightThemeFactory;

  // 테마에 맞는 버튼과 입력 필드 생성
  const themedButton = factory.createButton("확인", () =>
    Alert.alert("입력값", inputValue || "입력값이 없습니다")
  );
  const themedInput = factory.createInput(
    "내용을 입력하세요",
    inputValue,
    setInputValue
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: factory.getBackgroundColor() },
      ]}
    >
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={factory.getBackgroundColor()}
      />
      <Text style={[styles.title, { color: factory.getTitleColor() }]}>
        🎨 Abstract Factory 패턴 예제
      </Text>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: factory.getTitleColor() }]}>
          {isDarkTheme ? "다크 테마" : "라이트 테마"}
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={setIsDarkTheme}
          trackColor={factory.getSwitchTrackColor()}
          thumbColor={factory.getSwitchThumbColor(isDarkTheme)}
        />
      </View>

      <ScrollView contentContainerStyle={styles.inner}>
        {themedInput}
        {themedButton}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 24,
  },
  inner: {
    paddingHorizontal: 24,
    gap: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 18,
  },
});
