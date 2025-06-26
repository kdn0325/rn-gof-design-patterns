# Proxy

클래스 기반 Proxy 패턴 학습용 React Native 예제

---

## Proxy 개념

- 특정 객체에 대한 접근을 제어하거나 추가 기능을 제공하기 위해
- 실제 객체(Real Subject) 앞에 대리인(Proxy)을 두는 디자인 패턴
- 클라이언트는 프록시를 통해 실제 객체에 간접 접근하며, 접근 권한 검사, 캐싱, 지연 초기화 등의 부가 기능을 수행할 수 있음

---

## Proxy 핵심 원칙

1. **Real Subject 클래스**
   - 실제 작업을 수행하는 클래스
2. **Proxy 클래스**
   - Real Subject와 동일한 인터페이스를 구현하거나 동일 메서드를 가짐
   - 클라이언트 요청을 가로채 접근 제어, 권한 검사 등을 수행
3. **클라이언트**
   - 직접 Real Subject를 호출하지 않고 Proxy를 통해 작업 요청

---

## React Native 예제 구성

- **Real Subject**: `UserSettings` 클래스 (사용자 설정 변경 실제 기능 담당)
- **Proxy**: `SettingsProxy` 클래스 (로그인 상태를 검사해 접근 제어)
- **클라이언트**: React Native 앱 UI에서 `SettingsProxy`를 생성해 사용

---

## 예제 흐름

1. UI에서 로그인 상태를 토글로 설정
2. 설정 변경 버튼을 누르면 `SettingsProxy.updateSettings()` 호출
3. 프록시는 로그인 여부를 확인해,
   - 로그인 상태일 경우 `UserSettings.updateSettings()` 실행
   - 아니면 로그인 필요 메시지 표시

---

## 사용 예시

```ts
const proxy = new SettingsProxy(isLoggedIn);
proxy.updateSettings();
```

---

## React Native에서 활용

- 사용자 권한에 따른 접근 제어
- 네트워크 요청 캐싱, 비용이 큰 작업의 지연 초기화
- 리소스 관리 및 로깅 기능 추가 등
