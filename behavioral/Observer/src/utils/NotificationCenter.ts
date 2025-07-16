import { UserEvent } from "../types/Events";

/**
 * Observer 패턴의 핵심 구현체
 * Subject(Observable) 역할을 하는 클래스
 *
 * Observer 패턴 구성요소:
 * 1. Subject(Observable): 상태 변화를 관찰당하는 객체 (이 클래스)
 * 2. Observer: 상태 변화를 관찰하는 객체 (subscribers)
 * 3. ConcreteSubject: 구체적인 Subject 구현체 (UserStore)
 * 4. ConcreteObserver: 구체적인 Observer 구현체 (React 컴포넌트들)
 */

type Observer<T> = (data: T) => void;

class NotificationCenter<T> {
  private observers: Observer<T>[] = [];
  /**
   * Observer 등록 메서드
   * 새로운 Observer를 observers 배열에 추가
   *
   * @param observer 상태 변화를 관찰할 함수
   * @returns cleanup 함수 (Observer 해제용)
   */

  subscribe(observer: Observer<T>): () => void {
    this.observers.push(observer);
    return () => this.unsubscribe(observer);
  }

  /**
   * Observer 해제 메서드
   * 특정 Observer를 observers 배열에서 제거
   */
  private unsubscribe(observer: Observer<T>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  /**
   * 모든 Observer들에게 상태 변화 알림
   * Observer 패턴의 핵심 메커니즘
   *
   * @param data 전달할 이벤트 데이터
   */
  notify(data: T): void {
    this.observers.forEach((observer) => observer(data));
  }
}

export const notificationCenter = new NotificationCenter<UserEvent>();
