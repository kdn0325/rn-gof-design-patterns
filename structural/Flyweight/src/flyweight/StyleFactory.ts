import { ViewStyle, TextStyle } from "react-native";

// 타입별 스타일 객체를 저장하는 캐시 (플라이웨이트 저장소)
// 이미 생성된 스타일 객체를 재사용하여 메모리 사용 최적화
const styleCache = new Map<string, { container: ViewStyle; text: TextStyle }>();

export const getStyle = (type: string) => {
  // 캐시에 스타일이 없으면 새로 생성 후 저장
  if (!styleCache.has(type)) {
    styleCache.set(type, createStyle(type));
  }
  // 생성된 스타일 객체를 재사용 (플라이웨이트 핵심)
  return styleCache.get(type)!;
};

// 타입별 스타일 생성 함수
// 스타일 객체를 여러 알림 아이템에서 공유하여 중복 생성 방지
const createStyle = (
  type: string
): { container: ViewStyle; text: TextStyle } => {
  switch (type) {
    case "comment":
      return {
        container: {
          backgroundColor: "#e0f7fa",
          padding: 10,
          marginVertical: 5,
        },
        text: { color: "#00796b", fontWeight: "bold" },
      };
    case "like":
      return {
        container: {
          backgroundColor: "#ffebee",
          padding: 10,
          marginVertical: 5,
        },
        text: { color: "#c62828", fontWeight: "bold" },
      };
    case "follow":
      return {
        container: {
          backgroundColor: "#e8f5e9",
          padding: 10,
          marginVertical: 5,
        },
        text: { color: "#2e7d32", fontWeight: "bold" },
      };
    default:
      return {
        container: {
          backgroundColor: "#eeeeee",
          padding: 10,
          marginVertical: 5,
        },
        text: { color: "#424242", fontWeight: "bold" },
      };
  }
};
