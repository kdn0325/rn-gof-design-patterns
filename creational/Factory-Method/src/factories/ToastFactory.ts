import { NotificationFactory } from "./NotificationFactory";
import { ToastNotification } from "../products/ToastNotification";

// Toast 알림을 생성하는 팩토리
export class ToastFactory extends NotificationFactory {
  createNotification() {
    return new ToastNotification();
  }
}
