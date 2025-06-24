import { NotificationFactory } from "./NotificationFactory";
import { AlertNotification } from "../products/AlertNotification";

// Alert 팝업 형태의 알림을 구현한 클래스
export class AlertFactory extends NotificationFactory {
  createNotification() {
    return new AlertNotification();
  }
}
