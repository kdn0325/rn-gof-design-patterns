import axios, { AxiosInstance } from "axios";

const TIMEOUT_MS = 5000;

class ApiClient {
  // 싱글톤 인스턴스를 저장할 정적 변수
  private static instance: AxiosInstance;

  // 생성자를 private으로 선언해 외부에서 직접 인스턴스 생성 금지
  private constructor() {}

  /**
   * AxiosInstance 싱글톤 인스턴스를 반환하는 메서드
   * 최초 호출 시 axios 인스턴스 생성 후 저장
   * 이후 호출부터는 저장된 인스턴스를 반환하여 동일 인스턴스 공유
   */
  public static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      // 인스턴스가 없으면 새로 생성
      ApiClient.instance = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com", // 테스트용 기본 API 주소
        timeout: TIMEOUT_MS, // 요청 제한 시간(ms)
        headers: {
          "Content-Type": "application/json", // 기본 헤더 설정
        },
      });
    }
    // 이미 생성된 인스턴스 반환
    return ApiClient.instance;
  }
}

export default ApiClient;
