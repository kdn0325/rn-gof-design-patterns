import { Share, ToastAndroid } from "react-native";
import { ShareInterface } from "../abstractions/ShareInterface";

/**
 * Android 플랫폼 전용 공유 기능을 구현하는 클래스입니다.
 * Bridge 패턴을 사용하여 플랫폼에 따라 안드로이드 플랫폼은 공유 이력 관리 , 사용자 알림 기능을 추가해서 독립적으로 관리 할 수 있음
 *
 * 1. 공유 이력 관리:
 * 2. 사용자 알림 기능 추가
 */

export class AndroidShare implements ShareInterface {
  private shareHistory: string[] = [];

  share(content: string): void {
    // 공유 이력에 저장
    this.shareHistory.push(content);

    // 공유하기 전 토스트 메시지 출력
    ToastAndroid.show("공유를 시작합니다.", ToastAndroid.SHORT);

    Share.share(
      {
        message: content,
      },
      {
        dialogTitle: "Android에서 공유됨",
      }
    )
      .then(() => {
        ToastAndroid.show("공유 완료!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.error("Android 공유 실패:", error);
        ToastAndroid.show("공유 실패!", ToastAndroid.SHORT);
      });
  }

  // 공유 이력 조회 메서드 (필요 시 호출 가능)
  getShareHistory(): string[] {
    return this.shareHistory;
  }
}
