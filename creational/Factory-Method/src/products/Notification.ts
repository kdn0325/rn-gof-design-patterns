// 🔹 Product 인터페이스
// 모든 알림 클래스들이 구현해야 할 공통 기능을 정의

export interface Notification {
  show(message: string): void;
}
