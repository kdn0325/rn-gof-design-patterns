// 타입별 아이콘 문자열을 저장하는 플라이웨이트 저장소
// 동일한 타입의 아이콘을 한 번만 생성하고 재사용하여 메모리 절약
const iconCache = new Map<string, string>();

export const getIcon = (type: string): string => {
  // 캐시에 해당 타입 아이콘이 없으면 생성 후 저장
  if (!iconCache.has(type)) {
    const icon = generateIconForType(type);
    iconCache.set(type, icon);
  }
  // 캐시된 아이콘을 재사용하는 것이 플라이웨이트 패턴의 핵심
  return iconCache.get(type)!;
};

// 타입별 아이콘 문자열 생성 함수
const generateIconForType = (type: string): string => {
  switch (type) {
    case "comment":
      return "💬";
    case "like":
      return "❤️";
    case "follow":
      return "👤";
    default:
      return "🔔";
  }
};
