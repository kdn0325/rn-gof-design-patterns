import axios, { AxiosInstance } from "axios";

const TIMEOUT_MS = 5000;

// 함수형 싱글톤 패턴을 사용하여 Axios 인스턴스를 생성하고 반환하는 함수
const createApiClient = (() => {
  let instance: AxiosInstance | null = null;

  return (): AxiosInstance => {
    if (!instance) {
      instance = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com",
        timeout: TIMEOUT_MS,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return instance;
  };
})();

export default createApiClient;
