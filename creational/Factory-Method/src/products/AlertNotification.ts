import { Alert } from "react-native";
import { Notification } from "./Notification";

// 🔹 Concrete Product 1
// Alert 팝업 형태의 알림을 구현한 클래스

export class AlertNotification implements Notification {
  show(message: string): void {
    Alert.alert("알림", message);
  }
}
