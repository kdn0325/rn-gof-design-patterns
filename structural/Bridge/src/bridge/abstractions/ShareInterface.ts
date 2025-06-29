// ✅ Implementation 인터페이스 (공유 동작의 명세 정의)
// - 여러 플랫폼에서 공통으로 따라야 할 공유 메서드 정의

export interface ShareInterface {
  share(content: string): void;
}
