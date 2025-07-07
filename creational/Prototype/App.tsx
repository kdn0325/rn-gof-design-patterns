import React, { useState } from "react";
import { SafeAreaView, View, Text, Switch, StyleSheet } from "react-native";
import { NoticeCard } from "./components/NoticeCard";
import { getNotice } from "./prototype/getNoticeForUser";

export default function App() {
  // 1. 기본 프로토타입 객체를 getNotice 함수가 복사해서 반환
  // 2. 사용자 타입에 따라 복제된 객체의 일부 속성을 커스터마이징
  // 3. 이 커스터마이징된 객체를 UI에 전달해 재사용

  const [isMember, setIsMember] = useState(false);

  // 현재 사용자 타입에 맞는 안내문 가져오기
  // getNotice 함수가 프로토타입 객체를 복제하고 커스터마이징하여 반환
  const notice = getNotice(isMember ? "member" : "guest");

  const toggleSwitch = () => setIsMember((prev) => !prev);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.switchContainer}>
        <Text style={styles.userTypeText}>
          {isMember ? "회원 (Member)" : "게스트 (Guest)"}
        </Text>
        <Switch
          value={isMember}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#ccc", true: "#4caf50" }}
          thumbColor={isMember ? "#2e7d32" : "#f4f3f4"}
        />
      </View>

      <NoticeCard
        title={notice.title}
        message={notice.message}
        ctaText={notice.ctaText}
        onPress={() => alert("버튼 클릭")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 20,
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  userTypeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
