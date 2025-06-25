# Builder

클래스 기반 Builder 패턴 학습용 React Native 예제

---

## Builder 개념

- 복잡한 객체를 단계별로 생성하는 디자인 패턴
- 객체 생성 과정을 분리하여, 동일한 생성 절차로 다양한 표현을 만들 수 있음
- 생성자 인자에 많은 옵션을 넘기는 대신, 메서드 체이닝으로 가독성 향상

---

## Builder 핵심 원칙

1. **복잡한 객체를 표현하는 Product 클래스 정의**
2. **Builder 클래스는 Product 객체를 단계별로 조립하는 메서드 제공**
3. **빌더 메서드들은 자신을 반환하여 메서드 체이닝 지원**
4. **최종 build() 메서드로 완성된 Product 객체 반환**

---

## React Native 예제 구성

- **Product**: `Coffee` 클래스 (크기, 종류, 우유, 추가 샷 등 속성 포함)
- **Builder**: `Barista` 클래스 (커피 속성 설정용 메서드 제공)
- **App.tsx**: Builder 패턴으로 커피 객체 생성 후 Alert로 결과 표시

---

## 예제 흐름

1. `Barista` 인스턴스 생성
2. `setSize()`, `setType()`, `setMilk()`, `addShot()` 등의 메서드로 속성 설정 (메서드 체이닝 가능)
3. `build()` 호출로 최종 `Coffee` 객체 생성
4. 생성된 커피 객체 정보를 사용자에게 알림(Alert)으로 출력

---

## 사용 예시

```ts
const coffee = new Barista()
  .setSize("large")
  .setType("latte")
  .setMilk("oat")
  .addShot()
  .addShot()
  .build();

Alert.alert("커피 생성 완료", coffee.describe());
```
