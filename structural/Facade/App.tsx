import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  SafeAreaView,
} from "react-native";
import * as StorageFacade from "./src/facades/StorageFacade";
import type { User, UserSettings } from "./src/types/storage";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 입력 필드 상태
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  // 데이터 로드
  const loadData = () => {
    const userData = StorageFacade.getUser();
    const userSettings = StorageFacade.getUserSettings();
    const userToken = StorageFacade.getUserToken();
    const loginStatus = StorageFacade.isLoggedIn();

    setUser(userData);
    setSettings(userSettings);
    setToken(userToken);
    setIsLoggedIn(loginStatus);
  };

  // 사용자 저장
  const handleSaveUser = async () => {
    if (!userInput.name || !userInput.email) {
      Alert.alert("오류", "이름과 이메일을 입력해주세요.");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userInput.name,
      email: userInput.email,
    };

    const success = await StorageFacade.saveUser(newUser);

    if (success) {
      Alert.alert("성공", "사용자 정보가 저장되었습니다.");
      setUserInput({ name: "", email: "" });
      loadData();
    } else {
      Alert.alert("오류", "사용자 정보 저장에 실패했습니다.");
    }
  };

  // 토큰 저장
  const handleSaveToken = () => {
    const dummyToken = `token_${Date.now()}`;
    const success = StorageFacade.saveUserToken(dummyToken);

    if (success) {
      Alert.alert("성공", "토큰이 저장되었습니다.");
      loadData();
    } else {
      Alert.alert("오류", "토큰 저장에 실패했습니다.");
    }
  };

  // 테마 변경
  const handleToggleTheme = () => {
    if (settings) {
      const newSettings: UserSettings = {
        ...settings,
        theme: settings.theme === "light" ? "dark" : "light",
      };

      const success = StorageFacade.saveUserSettings(newSettings);

      if (success) {
        Alert.alert("성공", `테마가 ${newSettings.theme}로 변경되었습니다.`);
        loadData();
      }
    }
  };

  // 언어 변경
  const handleToggleLanguage = () => {
    if (settings) {
      const newSettings: UserSettings = {
        ...settings,
        language: settings.language === "ko" ? "en" : "ko",
      };

      const success = StorageFacade.saveUserSettings(newSettings);

      if (success) {
        Alert.alert("성공", `언어가 ${newSettings.language}로 변경되었습니다.`);
        loadData();
      }
    }
  };

  // 모든 데이터 삭제
  const handleClearAllData = () => {
    Alert.alert("확인", "모든 데이터를 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          StorageFacade.clearAllData();
          Alert.alert("완료", "모든 데이터가 삭제되었습니다.");
          loadData();
        },
      },
    ]);
  };

  // 캐시 통계 보기
  const handleShowCacheStats = () => {
    const stats = StorageFacade.getCacheStats();
    Alert.alert(
      "캐시 통계",
      `전체: ${stats.total}\n활성: ${stats.active}\n만료: ${stats.expired}`
    );
  };

  // 캐시 정리
  const handleCleanCache = () => {
    StorageFacade.cleanExpiredCache();
    Alert.alert("완료", "만료된 캐시가 정리되었습니다.");
    loadData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🏗️ Storage Facade Pattern Demo</Text>

        {/* 사용자 입력 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 사용자 정보 입력</Text>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
            value={userInput.name}
            onChangeText={(text) =>
              setUserInput((prev) => ({ ...prev, name: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="이메일을 입력하세요"
            value={userInput.email}
            onChangeText={(text) =>
              setUserInput((prev) => ({ ...prev, email: text }))
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSaveUser}
          >
            <Text style={styles.buttonText}>💾 사용자 저장</Text>
          </TouchableOpacity>
        </View>

        {/* 현재 데이터 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 현재 저장된 데이터</Text>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>사용자:</Text>
            <Text style={styles.dataValue}>
              {user ? `${user.name} (${user.email})` : "없음"}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>토큰:</Text>
            <Text style={styles.dataValue}>
              {token ? token.substring(0, 15) + "..." : "없음"}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>테마:</Text>
            <Text style={styles.dataValue}>
              {settings?.theme === "dark" ? "🌙 다크" : "☀️ 라이트"}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>언어:</Text>
            <Text style={styles.dataValue}>
              {settings?.language === "ko" ? "🇰🇷 한국어" : "🇺🇸 English"}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>로그인 상태:</Text>
            <Text
              style={[
                styles.dataValue,
                { color: isLoggedIn ? "#4CAF50" : "#F44336" },
              ]}
            >
              {isLoggedIn ? "✅ 로그인됨" : "❌ 로그아웃됨"}
            </Text>
          </View>
        </View>

        {/* 액션 버튼들 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ 액션</Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSaveToken}
          >
            <Text style={styles.buttonText}>🔑 토큰 생성</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleToggleTheme}
          >
            <Text style={styles.buttonText}>
              {settings?.theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleToggleLanguage}
          >
            <Text style={styles.buttonText}>
              {settings?.language === "ko" ? "🇺🇸 English" : "🇰🇷 한국어"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoButton}
            onPress={handleShowCacheStats}
          >
            <Text style={styles.buttonText}>📈 캐시 통계</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoButton}
            onPress={handleCleanCache}
          >
            <Text style={styles.buttonText}>🧹 캐시 정리</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.refreshButton} onPress={loadData}>
            <Text style={styles.buttonText}>🔄 데이터 새로고침</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearAllData}
          >
            <Text style={styles.buttonText}>🗑️ 모든 데이터 삭제</Text>
          </TouchableOpacity>
        </View>

        {/* 설명 섹션 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Facade 패턴이란?</Text>
          <Text style={styles.infoText}>
            복잡한 여러 서비스들(MMKV, Validation, Cache)을 하나의 간단한
            인터페이스로 통합하여 사용하기 쉽게 만든 디자인 패턴입니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#2c3e50",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e8ed",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "#95a5a6",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoButton: {
    backgroundColor: "#f39c12",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dangerButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7f8c8d",
    flex: 1,
  },
  dataValue: {
    fontSize: 16,
    color: "#2c3e50",
    flex: 2,
    textAlign: "right",
  },
  infoSection: {
    backgroundColor: "#e8f4fd",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2980b9",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#34495e",
    lineHeight: 20,
  },
});

export default App;
