// 사용자 정보를 정의하는 인터페이스
export interface User {
  id: string; // 사용자 고유 ID
  name: string; // 사용자 이름
  email: string; // 사용자 이메일 주소
  avatar?: string; // (선택) 사용자 아바타 이미지 URL
}

// 사용자 설정 정보를 정의하는 인터페이스
export interface UserSettings {
  theme: "light" | "dark"; // 테마 모드 (밝은 테마 또는 어두운 테마)
  language: "ko" | "en"; // 언어 설정 (한국어 또는 영어)
  notifications: boolean; // 알림 활성화 여부
  fontSize: "small" | "medium" | "large"; // 폰트 크기 설정
}

// 앱의 전체적인 상태 정보를 정의하는 인터페이스
export interface AppState {
  isFirstLaunch: boolean; // 앱 첫 실행 여부
  lastLoginDate: string; // 마지막 로그인 날짜 (ISO 형식)
  version: string; // 현재 앱 버전
}

// 로컬 저장소에서 사용할 수 있는 키 목록을 정의한 타입
export type StorageKeys =
  | "user" // 사용자 정보
  | "userToken" // 사용자 인증 토큰
  | "userSettings" // 사용자 설정 정보
  | "appState" // 앱 상태 정보
  | "cache"; // 임시 캐시 데이터

// 캐시 항목의 구조를 정의하는 제네릭 인터페이스
export interface CacheItem<T = any> {
  data: T; // 실제 캐시 데이터
  timestamp: number; // 데이터가 저장된 시간 (Unix timestamp)
  expiry: number; // 만료 시간 (Unix timestamp)
}
