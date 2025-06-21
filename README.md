# React Native GoF 디자인 패턴 (Expo + TypeScript)

이 레포는 React Native와 Expo를 기반으로  
GoF 디자인 패턴 23가지를 생성(Creational), 구조(Structural), 행위(Behavioral)  
세 가지 그룹으로 나누어 구현한 학습용 프로젝트 모음

---

## 🎯 프로젝트 목표

- GoF 디자인 패턴을 React Native 환경에서 직접 구현하며 이해도를 높입니다.
- Expo를 활용해 빠르게 테스트하고 실행할 수 있도록 설계했습니다.
- 모바일 앱 개발에 디자인 패턴 적용 사례를 참고할 수 있습니다.
- 팀 내 학습 자료 및 코드 리뷰용으로 활용하기 좋습니다.

## 📂 폴더 구조 및 포함 패턴 목록

- `creational/` : 생성 패턴 예제 모음

  - Singleton
  - Factory Method
  - Abstract Factory
  - Builder
  - Prototype

- `structural/` : 구조 패턴 예제 모음

  - Adapter
  - Bridge
  - Composite
  - Decorator
  - Facade
  - Flyweight
  - Proxy

- `behavioral/` : 행위 패턴 예제 모음
  - Chain of Responsibility
  - Command
  - Interpreter
  - Iterator
  - Mediator
  - Memento
  - Observer
  - State
  - Strategy
  - Template Method
  - Visitor

각 패턴별로 독립된 Expo 프로젝트 폴더가 있으며,  
`App.tsx`, `package.json` 등이 포함된 개별 앱 형태입니다.

---

## 🚀 실행 방법

1. 원하는 패턴 폴더로 이동합니다.  
   예) `creational/Singleton`
2. 의존성 설치
   ```bash
   yarn install
   ```
3. Expo 실행

   ```bash
   npx expo start
   ```

4. Expo 개발자 도구에서 시뮬레이터나 기기로 실행합니다.
