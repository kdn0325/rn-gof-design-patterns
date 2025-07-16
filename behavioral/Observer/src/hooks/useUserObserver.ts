import { useState, useEffect } from "react";
import { notificationCenter } from "../utils/NotificationCenter";
import { USER_EVENTS } from "../constants/UserEvents";
import { User } from "../types/User";
import { UserEvent } from "../types/Events";

/**
 * ConcreteObserver 역할을 하는 Custom Hook
 * 사용자 정보 변화를 관찰하고 React 컴포넌트 상태에 반영
 *
 * Observer 패턴에서 이 훅은:
 * 1. NotificationCenter에 자신을 Observer로 등록
 * 2. 상태 변화 알림을 받으면 로컬 상태 업데이트
 * 3. 컴포넌트 언마운트 시 Observer 해제
 */

export const useUserObserver = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleUserChange = (data: UserEvent): void => {
      switch (data.type) {
        case USER_EVENTS.LOGIN:
          setUser(data.user);
          break;
        case USER_EVENTS.LOGOUT:
          setUser(null);
          break;
        case USER_EVENTS.UPDATE:
          setUser(data.user);
          break;
      }
    };

    const unsubscribe = notificationCenter.subscribe(handleUserChange);
    return unsubscribe;
  }, []);

  return user;
};
