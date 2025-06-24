# Factory Method

클래스 기반 Factory Method 패턴 학습용 React Native 예제

---

## Factory Method 개념

- 객체 생성을 서브클래스(하위 클래스)에 위임하여,
- **객체 생성 로직과 사용 로직을 분리**하는 디자인 패턴
- 생성할 객체의 구체적인 타입을 미리 알 필요 없이, **동일한 인터페이스**를 통해 사용할 수 있음

---

## Factory Method 핵심 원칙

1. **Product 인터페이스 정의**
   - 생성될 객체가 따라야 할 공통 규칙 정의
2. **Concrete Product 구현**
   - 실제로 생성되는 다양한 객체들을 구현 (예: Alert, Toast 등)
3. **Creator(Factory) 추상 클래스**
   - 객체 생성 메서드를 추상화하여 서브클래스에게 구현을 위임
4. **Concrete Factory 구현**
   - 각각의 생성 책임을 가지는 서브 팩토리 클래스 제공

---

## React Native 예제 구성

- **Product**: `Notification` 인터페이스 (`show(message: string)` 메서드)
- **Concrete Products**:
  - `AlertNotification`: `Alert`로 알림 표시
  - `ToastNotification`: `ToastAndroid`로 알림 표시 (Android 한정)
- **Factories**:
  - `NotificationFactory`: 추상 팩토리 클래스
  - `AlertFactory` / `ToastFactory`: 실제 인스턴스 생성 팩토리

---

## 예제 흐름

1. 버튼을 눌러 `ToastFactory` 또는 `AlertFactory` 선택
2. 각 팩토리는 `Notification` 객체(Alert/Toast)를 생성
3. `notification.show("...")` 호출 → 실제 알림 표시

---

## 사용 예시

```ts
const factory: NotificationFactory = new ToastFactory();
const notification = factory.createNotification();
notification.show("Hello from Factory!");
```
