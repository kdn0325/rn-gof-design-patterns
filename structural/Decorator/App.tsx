import React, { useState } from "react";
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  Switch,
  View,
  Text,
} from "react-native";
import { withAuthorization } from "./src/decorators/withAuthorization";
import { DeleteButton } from "./src/components/DeleteButton";

const ADMIN = "admin";
const GUEST = "guest";

export default function App() {
  // 권한 상태 (admin 또는 guest)
  const [isAdmin, setIsAdmin] = useState(false);

  // // 실제 사용자 데이터 삭제 함수 (원본 함수)
  const deleteUserData = () => {
    Alert.alert("삭제 완료", "사용자 데이터가 삭제되었습니다.");
  };

  // 권한 확인하기
  const userRole = isAdmin ? ADMIN : GUEST;

  // 데코레이터 적용: 권한 체크 기능이 추가된 삭제 함수 생성
  const deleteWithAuth = withAuthorization(deleteUserData, userRole);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>권한: {userRole.toUpperCase()}</Text>
        <Switch
          value={isAdmin}
          onValueChange={setIsAdmin}
          trackColor={{ false: "#ccc", true: "#4682B4" }}
          thumbColor={isAdmin ? "#fff" : "#888"}
        />
      </View>

      {/* 삭제 버튼 */}
      <DeleteButton onDelete={deleteWithAuth} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
