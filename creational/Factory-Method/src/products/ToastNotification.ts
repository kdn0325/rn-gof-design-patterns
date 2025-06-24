import { ToastAndroid, Alert, Platform } from "react-native";
import { Notification } from "./Notification";

// 🔹 Concrete Product 2
// Android에서만 지원하는 Toast 알림을 구현한 클래스

export class ToastNotification implements Notification {
  show(message: string): void {
    if (Platform.OS === "android") {
      ToastAndroid.show("이건 Toast입니다.", ToastAndroid.SHORT);
    } else {
      Alert.alert("Toast는 Android에서만 지원됩니다.");
    }
  }
}
