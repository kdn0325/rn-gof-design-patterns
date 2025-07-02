import type { CacheItem } from "../types/storage";

// ✅ 메모리 기반 캐시 저장소 (Map 객체 사용)
const cache = new Map<string, CacheItem>();

// ⏱ 기본 만료 시간: 5분 (밀리초)
const DEFAULT_EXPIRY = 5 * 60 * 1000;

/**
 * 📦 캐시에 데이터 저장
 * @param key 캐시 키
 * @param data 저장할 데이터
 * @param expiryMs 커스텀 만료 시간 (ms). 생략 시 기본값 사용
 */
export const setCache = <T>(key: string, data: T, expiryMs?: number): void => {
  const now = Date.now();
  const expiry = expiryMs || DEFAULT_EXPIRY;

  const cacheItem: CacheItem<T> = {
    data,
    timestamp: now,
    expiry: now + expiry,
  };

  cache.set(key, cacheItem);
};

/**
 * 📥 캐시에서 데이터 가져오기
 * @param key 캐시 키
 * @returns 유효한 캐시 데이터 or null
 */
export const getCache = <T>(key: string): T | null => {
  const item = cache.get(key);

  if (!item) return null;

  // 캐시 만료 여부 확인
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item.data as T;
};

/**
 * ❌ 특정 캐시 항목 삭제
 * @param key 삭제할 키
 */
export const removeCache = (key: string): void => {
  cache.delete(key);
};

/**
 * 🧹 만료된 캐시 항목 정리
 */
export const clearExpiredCache = (): void => {
  const now = Date.now();

  for (const [key, item] of cache.entries()) {
    if (now > item.expiry) {
      cache.delete(key);
    }
  }
};

/**
 * 🚨 모든 캐시 삭제
 */
export const clearAllCache = (): void => {
  cache.clear();
};

/**
 * 📊 캐시 통계 정보 반환
 * @returns 전체, 활성, 만료된 항목 수
 */
export const getCacheStats = () => {
  const now = Date.now();
  let expired = 0;
  let active = 0;

  for (const item of cache.values()) {
    if (now > item.expiry) {
      expired++;
    } else {
      active++;
    }
  }

  return {
    total: cache.size,
    active,
    expired,
  };
};

/**
 * 🔍 특정 키의 캐시 존재 여부 확인 (유효성 포함)
 * @param key 검사할 키
 * @returns 존재 및 유효 여부
 */
export const hasCache = (key: string): boolean => {
  const item = cache.get(key);

  if (!item || Date.now() > item.expiry) {
    cache.delete(key); // 만료되었으면 정리
    return false;
  }

  return true;
};

/**
 * 📁 현재 저장된 모든 캐시 키 목록 반환
 * @returns string[]
 */
export const getCacheKeys = (): string[] => {
  return Array.from(cache.keys());
};
