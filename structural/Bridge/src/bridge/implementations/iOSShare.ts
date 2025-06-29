import { Share } from "react-native";
import { ShareInterface } from "../abstractions/ShareInterface";

/**
 * iOS 플랫폼 전용 공유 기능을 구현하는 클래스
 * AndroidShare와 달리, 추가적인 기능(공유 이력 관리, 토스트 메시지 알림 등)은 포함하지 않습니다.
 */
export class iOSShare implements ShareInterface {
  share(content: string): void {
    Share.share(
      {
        message: content,
      },
      {
        subject: "iOS에서 공유됨",
      }
    ).catch((error) => console.error("iOS 공유 실패:", error));
  }
}
