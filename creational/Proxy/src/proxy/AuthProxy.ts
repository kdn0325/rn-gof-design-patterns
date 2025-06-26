import { UserSettings } from "./UserSettings";
import { Alert } from "react-native";

// 프록시 클래스: 인증 확인 후 UserSettings 기능 위임
export class SettingsProxy {
  // 실제 작업을 수행하는 UserSettings 인스턴스 (Real Subject)
  private realSettings: UserSettings;
  // 사용자의 로그인 상태를 저장하는 변수
  private isLoggedIn: boolean;

  constructor(isLoggedIn: boolean) {
    // 프록시가 실제 객체를 생성하거나 참조
    this.realSettings = new UserSettings();
    this.isLoggedIn = isLoggedIn;
  }

  updateSettings(): void {
    if (this.isLoggedIn) {
      // 로그인 상태면 실제 UserSettings의 메서드를 호출
      this.realSettings.updateSettings();
      Alert.alert("✅ 설정 완료", "사용자 설정이 적용되었습니다.");
    } else {
      Alert.alert("⚠️ 로그인 필요", "설정을 변경하려면 먼저 로그인해주세요.");
    }
  }
}
