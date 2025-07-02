import type { User, UserSettings, AppState } from "../types/storage";

/**
 * 이메일 형식이 올바른지 검증
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * User 객체가 올바른 구조인지 검증
 */
export const validateUser = (user: any): user is User => {
  return (
    user &&
    typeof user === "object" &&
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    isValidEmail(user.email) &&
    (user.avatar === undefined || typeof user.avatar === "string")
  );
};

/**
 * UserSettings 객체가 올바른 구조인지 검증
 */
export const validateUserSettings = (
  settings: any
): settings is UserSettings => {
  return (
    settings &&
    typeof settings === "object" &&
    ["light", "dark"].includes(settings.theme) &&
    ["ko", "en"].includes(settings.language) &&
    typeof settings.notifications === "boolean" &&
    ["small", "medium", "large"].includes(settings.fontSize)
  );
};

/**
 * AppState 객체가 올바른 구조인지 검증
 */
export const validateAppState = (state: any): state is AppState => {
  return (
    state &&
    typeof state === "object" &&
    typeof state.isFirstLaunch === "boolean" &&
    typeof state.lastLoginDate === "string" &&
    typeof state.version === "string"
  );
};

/**
 * 유효한 토큰 문자열인지 검증
 */
export const validateToken = (token: any): token is string => {
  return typeof token === "string" && token.trim().length > 0;
};

/**
 * 주어진 validator 함수로 data를 검증하고, 유효하지 않으면 null 반환
 */
export const validateData = <T>(
  data: any,
  validator: (data: any) => data is T
): T | null => {
  try {
    return validator(data) ? data : null;
  } catch (error) {
    console.error("Validation error:", error);
    return null;
  }
};

/**
 * 불완전하거나 잘못된 속성이 있을 수 있는 User 데이터를 정리 및 정규화
 * 필수 속성(id, name, email)이 없으면 null 반환
 */
export const sanitizeUser = (user: Partial<User>): User | null => {
  if (!user.id || !user.name || !user.email) {
    return null;
  }

  return {
    id: user.id.trim(),
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    avatar: user.avatar?.trim() || undefined,
  };
};
