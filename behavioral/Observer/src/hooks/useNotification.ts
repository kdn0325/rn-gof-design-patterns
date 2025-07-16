import { useState, useEffect } from "react";
import { notificationCenter } from "../utils/NotificationCenter";
import { USER_EVENTS } from "../constants/UserEvents";
import { UserEvent } from "../types/Events";

export const useNotification = (): string => {
  const [message, setMessage] = useState<string>("");

  /**
   * 알림 메시지를 관찰하는 Observer Hook
   * 일시적인 알림 표시를 위한 전용 Observer
   */

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleUserChange = (data: UserEvent): void => {
      let newMessage = "";

      switch (data.type) {
        case USER_EVENTS.LOGIN:
          newMessage = `${data.user.name}님이 로그인했습니다!`;
          break;
        case USER_EVENTS.LOGOUT:
          newMessage = "로그아웃되었습니다.";
          break;
        case USER_EVENTS.UPDATE:
          newMessage = "프로필이 업데이트되었습니다.";
          break;
      }

      setMessage(newMessage);

      if (newMessage) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => setMessage(""), 2000);
      }
    };

    const unsubscribe = notificationCenter.subscribe(handleUserChange);
    return () => {
      unsubscribe();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return message;
};
