import * as MMKVService from "../services/MMKVService";
import * as ValidationService from "../services/ValidationService";
import * as CacheService from "../services/CacheService";
import type { User, UserSettings, AppState } from "../types/storage";

/**
 * 👤 사용자 데이터 저장
 * - 데이터 정제 및 검증 후 MMKV와 캐시에 저장
 */
export const saveUser = async (user: User): Promise<boolean> => {
  try {
    const sanitizedUser = ValidationService.sanitizeUser(user);

    if (!sanitizedUser || !ValidationService.validateUser(sanitizedUser)) {
      throw new Error("사용자 데이터가 유효하지 않습니다.");
    }

    MMKVService.setData("user", sanitizedUser);
    CacheService.setCache("user", sanitizedUser);

    return true;
  } catch (error) {
    console.error("사용자 저장 중 오류 발생:", error);
    return false;
  }
};

/**
 * 👤 사용자 데이터 가져오기
 * - 캐시 → 스토리지 순으로 조회하며, 유효한 경우 캐시에 저장
 */
export const getUser = (): User | null => {
  try {
    let user = CacheService.getCache<User>("user");
    if (user) return user;

    user = MMKVService.getData<User>("user");

    if (user && ValidationService.validateUser(user)) {
      CacheService.setCache("user", user);
      return user;
    }

    return null;
  } catch (error) {
    console.error("사용자 불러오기 중 오류 발생:", error);
    return null;
  }
};

/**
 * 🔐 사용자 토큰 저장
 * - 유효성 검사 후 MMKV + 캐시에 저장 (30분 TTL)
 */
export const saveUserToken = (token: string): boolean => {
  try {
    if (!ValidationService.validateToken(token)) {
      throw new Error("토큰이 유효하지 않습니다.");
    }

    MMKVService.setData("userToken", token);
    CacheService.setCache("userToken", token, 30 * 60 * 1000); // 30분

    return true;
  } catch (error) {
    console.error("토큰 저장 중 오류 발생:", error);
    return false;
  }
};

/**
 * 🔐 사용자 토큰 가져오기
 * - 캐시 → 스토리지 순으로 조회하며, 유효한 경우 캐시에 저장
 */
export const getUserToken = (): string | null => {
  try {
    let token = CacheService.getCache<string>("userToken");
    if (token) return token;

    token = MMKVService.getData<string>("userToken");

    if (token && ValidationService.validateToken(token)) {
      CacheService.setCache("userToken", token, 30 * 60 * 1000);
      return token;
    }

    return null;
  } catch (error) {
    console.error("토큰 불러오기 중 오류 발생:", error);
    return null;
  }
};

/**
 * ⚙️ 사용자 설정 저장
 * - 유효성 검증 후 MMKV + 캐시에 저장
 */
export const saveUserSettings = (settings: UserSettings): boolean => {
  try {
    if (!ValidationService.validateUserSettings(settings)) {
      throw new Error("사용자 설정이 유효하지 않습니다.");
    }

    MMKVService.setData("userSettings", settings);
    CacheService.setCache("userSettings", settings);

    return true;
  } catch (error) {
    console.error("사용자 설정 저장 중 오류 발생:", error);
    return false;
  }
};

/**
 * ⚙️ 사용자 설정 가져오기
 * - 캐시 → 스토리지 → 기본값 순으로 조회 및 저장
 */
export const getUserSettings = (): UserSettings | null => {
  try {
    let settings = CacheService.getCache<UserSettings>("userSettings");
    if (settings) return settings;

    settings = MMKVService.getData<UserSettings>("userSettings");

    if (settings && ValidationService.validateUserSettings(settings)) {
      CacheService.setCache("userSettings", settings);
      return settings;
    }

    // 유효한 설정이 없을 경우 기본값 반환 및 저장
    const defaultSettings: UserSettings = {
      theme: "light",
      language: "ko",
      notifications: true,
      fontSize: "medium",
    };

    saveUserSettings(defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error("사용자 설정 불러오기 중 오류 발생:", error);
    return null;
  }
};

/**
 * 🧭 앱 상태 저장
 * - 유효성 검증 후 MMKV + 캐시에 저장
 */
export const saveAppState = (state: AppState): boolean => {
  try {
    if (!ValidationService.validateAppState(state)) {
      throw new Error("앱 상태 데이터가 유효하지 않습니다.");
    }

    MMKVService.setData("appState", state);
    CacheService.setCache("appState", state);

    return true;
  } catch (error) {
    console.error("앱 상태 저장 중 오류 발생:", error);
    return false;
  }
};

/**
 * 🧭 앱 상태 가져오기
 * - 캐시 → 스토리지 순으로 조회
 */
export const getAppState = (): AppState | null => {
  try {
    let state = CacheService.getCache<AppState>("appState");
    if (state) return state;

    state = MMKVService.getData<AppState>("appState");

    if (state && ValidationService.validateAppState(state)) {
      CacheService.setCache("appState", state);
      return state;
    }

    return null;
  } catch (error) {
    console.error("앱 상태 불러오기 중 오류 발생:", error);
    return null;
  }
};

/**
 * ❌ 사용자 관련 데이터 삭제
 * - 사용자 정보 및 토큰 제거 (스토리지 + 캐시)
 */
export const clearUserData = (): void => {
  MMKVService.removeData("user");
  MMKVService.removeData("userToken");

  CacheService.removeCache("user");
  CacheService.removeCache("userToken");
};

/**
 * 💥 모든 데이터 삭제
 * - 앱 전체 데이터 초기화 (스토리지 + 캐시)
 */
export const clearAllData = (): void => {
  MMKVService.clearAll();
  CacheService.clearAllCache();
};

/**
 * ✅ 로그인 상태 확인
 * - 유효한 사용자 + 토큰이 모두 존재하면 true
 */
export const isLoggedIn = (): boolean => {
  return getUserToken() !== null && getUser() !== null;
};

/**
 * 📊 캐시 상태 정보 조회
 */
export const getCacheStats = () => {
  return CacheService.getCacheStats();
};

/**
 * 🧽 만료된 캐시 항목 제거
 */
export const cleanExpiredCache = (): void => {
  CacheService.clearExpiredCache();
};
