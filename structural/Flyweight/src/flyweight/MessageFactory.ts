// 타입별 메시지 템플릿 캐시 (플라이웨이트 저장소)
// 동일한 타입의 메시지 생성 함수를 공유하여 중복 생성 방지
const templateCache = new Map<string, (username: string) => string>();

export const getMessageTemplate = (
  type: string
): ((username: string) => string) => {
  // 캐시에 템플릿 함수가 없으면 새로 생성 후 저장
  if (!templateCache.has(type)) {
    templateCache.set(type, createTemplate(type));
  }
  // 캐시된 템플릿 함수를 재사용 (플라이웨이트 핵심)
  return templateCache.get(type)!;
};

// 타입별 메시지 템플릿 생성 함수
// 유저 이름(username)은 외부에서 주입하는 변하는 상태(extrinsic state)
const createTemplate = (type: string): ((username: string) => string) => {
  switch (type) {
    case "comment":
      return (username: string) => `${username}님이 댓글을 남겼습니다.`;
    case "like":
      return (username: string) => `${username}님이 좋아요를 눌렀습니다.`;
    case "follow":
      return (username: string) => `${username}님이 팔로우했습니다.`;
    default:
      return (username: string) => `${username}님의 알림입니다.`;
  }
};
