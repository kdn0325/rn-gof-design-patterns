import { User } from "../models/User";

type ExternalUser = {
  id: number;
  name: string;
  email: string;
};

/**
 * UserAdapter 클래스는 외부 API에서 받은 데이터를
 * 내부 도메인에서 사용하는 User 모델 형태로 변환
 *
 * Adapter 패턴을 통해 서로 다른 데이터 구조 간의 호환성을 제공
 */
export class UserAdapter {
  /**
   * 외부 User 데이터를 내부 User 모델로 변환
   * @param externalUser 외부 API에서 받은 사용자 데이터
   * @returns 내부에서 사용할 User 객체
   */
  static adapt(externalUser: ExternalUser): User {
    return {
      // 내부 모델에서 ID는 문자열로 관리
      id: String(externalUser.id),
      name: externalUser.name,
      email: externalUser.email,
    };
  }
}
