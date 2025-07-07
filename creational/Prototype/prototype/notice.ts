// 프로토타입 역할을 하는 기본 안내문 객체 타입 및 데이터 정의
export interface Notice {
  title: string;
  message: string;
  ctaText: string;
}

// 기본 안내문 (프로토타입 원형 객체)
export const baseNotice: Notice = {
  title: "안내",
  message: "기본 안내 메시지입니다.",
  ctaText: "확인",
};
