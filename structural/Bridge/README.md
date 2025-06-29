# Bridge Pattern

플랫폼별 공유 기능을 분리한 React Native 브릿지 패턴 예제

---

## Bridge 패턴 개념

- 추상화(Abstraction)와 구현(Implementation)을 독립적으로 분리하는 구조적 디자인 패턴
- 추상화는 UI나 상위 로직을 담당하고, 구현은 플랫폼별 구체적 기능을 담당
- 두 계층을 분리하여 서로 독립적으로 확장 가능하고 유연한 설계를 지원

---

## Bridge 패턴 핵심 원칙

1. **Abstraction (추상화) 역할**

   - 클라이언트에 노출되는 인터페이스와 UI를 담당
   - 구체적인 기능 호출을 구현체에 위임

2. **Implementor (구현체 인터페이스)**

   - 실제 기능을 수행할 메서드를 정의하는 인터페이스

3. **Concrete Implementor (구체적 구현체)**
   - 플랫폼별 혹은 상황별로 구현된 기능 제공 (예: Android, iOS)

---

## React Native 예제 구성

- `ShareButton` 컴포넌트: 공유 버튼 UI와 공유 요청 인터페이스 (Abstraction)
- `ShareInterface`: 공유 기능을 수행하는 메서드 정의 (Implementor)
- `AndroidShare`: Android 전용 공유 기능 구현, 토스트 메시지 및 공유 이력 기능 추가 (Concrete Implementor)
- `iOSShare`: iOS 전용 공유 기능 구현, 기본 공유 기능만 제공 (Concrete Implementor)

---

## 사용 예시

- 앱은 사용자가 공유 버튼을 누르면 공유할 내용을 `ShareButton` 컴포넌트에 전달함
- `ShareButton`은 내부적으로 현재 실행 중인 플랫폼(Android 또는 iOS)에 맞는 공유 구현체(AndroidShare 또는 iOSShare)를 선택함
- 공유 요청은 구현체에 위임되어 각 플랫폼별 맞춤형 공유 기능이 수행됨
- 이를 통해 UI 코드는 플랫폼에 독립적이며, 기능 구현은 플랫폼별로 분리되어 관리되므로 유지보수가 쉬워짐

---

## React Native에서 활용

- 플랫폼별 API 차이나 기능 차이를 효과적으로 분리 및 관리 가능
- UI와 로직 분리로 코드 유지보수와 확장성 향상
- 다양한 플랫폼에서 동일한 UI를 유지하며, 플랫폼 특화 기능을 유연하게 적용 가능

---
