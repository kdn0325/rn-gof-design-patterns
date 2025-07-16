import { useState, useEffect } from "react";
import { notificationCenter } from "../utils/NotificationCenter";
import { USER_EVENTS } from "../constants/UserEvents";
import { UserEvent } from "../types/Events";

/**
 * 로그인 상태만 관찰하는 전용 Observer Hook
 * 관심사가 다른 Observer들이 독립적으로 동작할 수 있음을 보여줌
 */

export const useUserStatus = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  /**
   * 로그인 상태만 관심있는 Observer
   * 동일한 이벤트를 받지만 다른 방식으로 처리
   */
  useEffect(() => {
    const handleUserChange = (data: UserEvent): void => {
      switch (data.type) {
        case USER_EVENTS.LOGIN:
          setIsLoggedIn(true);
          break;
        case USER_EVENTS.LOGOUT:
          setIsLoggedIn(false);
          break;
        case USER_EVENTS.UPDATE:
          // 업데이트 시에는 로그인 상태 변경 없음
          break;
      }
    };

    const unsubscribe = notificationCenter.subscribe(handleUserChange);
    return unsubscribe;
  }, []);

  return isLoggedIn;
};
