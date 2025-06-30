// 데코레이터 함수: 원본 함수에 권한 체크 기능을 추가하는 역할
// - fn: 원본 함수 (삭제 기능 등)
// - role: 현재 사용자의 권한 정보

import { Alert } from "react-native";

export function withAuthorization<T extends (...args: any[]) => any>(
  func: T,
  userRole: string
): (...funcArgs: Parameters<T>) => ReturnType<T> | void {
  return (...args: Parameters<T>) => {
    if (userRole === "admin") {
      // 권한이 있으면 원본 함수 실행
      return func(...args);
    } else {
      Alert.alert("게스트는 권한이 없습니다.");
    }
  };
}
