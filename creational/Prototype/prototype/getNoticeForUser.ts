import { Notice } from "./notice";
import { baseNotice } from "./notice";

// 사용자 유형에 맞게 프로토타입을 복사 후 커스터마이징하는 함수
export function getNotice(userType: "guest" | "member"): Notice {
  // 1) 프로토타입 복제 (얕은 복사)
  const noticeCopy = { ...baseNotice };

  // 2) 사용자 타입별로 필요한 필드 값 변경
  if (userType === "guest") {
    noticeCopy.message = "회원가입 후 다양한 기능을 이용할 수 있습니다.";
    noticeCopy.ctaText = "회원가입하기";
  } else if (userType === "member") {
    noticeCopy.message = "프로필을 완성해 주세요.";
    noticeCopy.ctaText = "프로필 완료하기";
  }

  // 3) 커스터마이징된 새 객체 반환
  return noticeCopy;
}
