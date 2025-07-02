import { MMKV } from "react-native-mmkv";
import type { StorageKeys } from "../types/storage";

// ✅ MMKV 인스턴스 생성
const storage = new MMKV({
  id: "app-storage", // 저장소 식별자
  encryptionKey: "mySecretKey123", // ⚠️ 프로덕션에서는 안전한 키 관리 방식 사용 (예: 환경 변수, Keychain)
});

/**
 * 📦 데이터 저장
 * @param key 저장할 키 (StorageKeys 타입)
 * @param value 저장할 값 (Generic 타입)
 */
export const setData = <T>(key: StorageKeys, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    storage.set(key, serializedValue);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    throw new Error(`Failed to save ${key}`);
  }
};

/**
 * 📥 데이터 가져오기
 * @param key 가져올 키 (StorageKeys 타입)
 * @returns T 또는 null
 */
export const getData = <T>(key: StorageKeys): T | null => {
  try {
    const value = storage.getString(key);
    if (value === undefined) return null;

    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

/**
 * ❌ 특정 데이터 삭제
 * @param key 삭제할 키
 */
export const removeData = (key: StorageKeys): void => {
  try {
    storage.delete(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
};

/**
 * 🧹 모든 데이터 삭제
 */
export const clearAll = (): void => {
  try {
    storage.clearAll();
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};

/**
 * 🔍 특정 키가 존재하는지 확인
 * @param key 검사할 키
 * @returns 존재 여부 (boolean)
 */
export const hasKey = (key: StorageKeys): boolean => {
  return storage.contains(key);
};

/**
 * 🗂 저장소 내 모든 키 반환
 * @returns string 배열 (모든 키 리스트)
 */
export const getAllKeys = (): string[] => {
  return storage.getAllKeys();
};
