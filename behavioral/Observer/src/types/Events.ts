import { User } from "./User";

/**
 * Observer 패턴에서 Subject(Observable)가 Observer들에게 전달하는 이벤트 타입들
 * 각 이벤트는 type 필드로 구분되며, 필요한 데이터를 포함
 */

export interface UserLoginEvent {
  type: "USER_LOGIN";
  user: User;
}

export interface UserLogoutEvent {
  type: "USER_LOGOUT";
}

export interface UserUpdateEvent {
  type: "USER_UPDATE";
  user: User;
}

export type UserEvent = UserLoginEvent | UserLogoutEvent | UserUpdateEvent;
