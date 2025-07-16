import { notificationCenter } from "../utils/NotificationCenter";
import { USER_EVENTS } from "../constants/UserEvents";
import { User } from "../types/User";

/**
 * ConcreteSubject 역할을 하는 클래스
 * 사용자 상태를 관리하고, 상태 변화 시 Observer들에게 알림
 *
 * Observer 패턴에서 이 클래스는:
 * 1. 상태(user)를 보유
 * 2. 상태가 변경될 때마다 Observer들에게 알림
 * 3. NotificationCenter를 통해 느슨한 결합 유지
 */

class UserStore {
  private user: User | null = null;
  private notificationCenter = notificationCenter;

  // 사용자 로그인 처리
  login(userData: User): void {
    this.user = userData;
    this.notificationCenter.notify({
      type: USER_EVENTS.LOGIN,
      user: userData,
    });
  }

  // 사용자 로그아웃 처리
  logout(): void {
    this.user = null;
    this.notificationCenter.notify({
      type: USER_EVENTS.LOGOUT,
    });
  }
  // 사용자 프로필 업데이트
  updateProfile(newData: Partial<User>): void {
    if (!this.user) return;

    this.user = { ...this.user, ...newData };
    this.notificationCenter.notify({
      type: USER_EVENTS.UPDATE,
      user: this.user,
    });
  }

  getCurrentUser(): User | null {
    return this.user;
  }
}

export const userStore = new UserStore();
