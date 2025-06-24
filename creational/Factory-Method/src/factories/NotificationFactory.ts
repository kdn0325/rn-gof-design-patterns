import { Notification } from "../products/Notification";

// 🔹 Creator (팩토리 메서드를 정의하는 추상 클래스)
// 어떤 Notification을 만들지는 서브클래스가 결정함

export abstract class NotificationFactory {
  abstract createNotification(): Notification;
}
