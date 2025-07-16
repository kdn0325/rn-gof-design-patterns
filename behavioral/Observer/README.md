# Observer Pattern

행동 패턴 중 하나인 Observer 패턴 학습용 React Native 예제

---

## Observer 패턴 개념

- 객체의 상태 변화를 **관찰하고 있는 여러 객체들에게 자동으로 알림**을 보내는 디자인 패턴
- **Subject(주체)**와 **Observer(관찰자)**간의 **느슨한 결합**으로 유연한 시스템 구조 구현
- 상태 변화에 대한 **일관된 업데이트**와 **확장 가능한 알림 시스템** 제공

---

## Observer 패턴 핵심 원칙

1. **Subject(주체) 관리**
   - 상태 변화를 감지하고 Observer들에게 알림
   - Observer 등록/해제 메서드 제공
2. **Observer(관찰자) 등록**

   - Subject의 상태 변화를 관찰하고 싶은 객체들이 등록
   - 상태 변화 시 자동으로 알림 받음

3. **느슨한 결합**
   - Subject와 Observer는 서로 구체적인 구현을 알 필요 없음
   - 인터페이스를 통한 통신으로 유연성 확보

---

## React Native 예제 구성

- NotificationCenter: 📢 Subject 역할 (상태 변화 알림)
- Custom Hooks: 🎯 Observer 역할 (상태 변화 감지)
- 컴포넌트: 🔄 Observer 패턴 활용 (자동 UI 업데이트)

---

## 사용 예시

사용자 상태 변경에 따라 `NotificationCenter`를 통해 각 UI 컴포넌트가 반응하는 구조입니다.

---

### 초기화 흐름

- `App.tsx`에서 주요 컴포넌트 마운트
  - `Header`, `Sidebar`, `NotificationBanner`, `ActionButtons` 등
- 각 컴포넌트는 `notificationCenter`에 Observer 등록

```ts
useEffect(() => {
  const unsubscribe = notificationCenter.subscribe(handler);
  return () => unsubscribe();
}, []);
```

---

### 🔐 로그인 흐름

1. `userStore.login()` 호출 → 사용자 상태 업데이트
2. `notificationCenter.notify({ type: 'USER_LOGIN', user })` 실행
3. 각 컴포넌트의 반응:

| 컴포넌트             | 반응                    |
| -------------------- | ----------------------- |
| `Header`             | 사용자 이름 표시        |
| `Sidebar`            | 로그인 메뉴 활성화      |
| `NotificationBanner` | 로그인 성공 메시지 표시 |

---

### 🛠️ 프로필 수정 흐름

1. `userStore.updateProfile()` 호출
2. `notificationCenter.notify({ type: 'USER_UPDATE', user })`
3. 반응:

| 컴포넌트             | 반응                           |
| -------------------- | ------------------------------ |
| `Header`             | 사용자 이름 갱신               |
| `NotificationBanner` | "프로필이 수정되었습니다" 표시 |

---

### 🚪 로그아웃 흐름

1. `userStore.logout()` 호출
2. `notificationCenter.notify({ type: 'USER_LOGOUT' })`
3. 반응:

| 컴포넌트             | 반응                 |
| -------------------- | -------------------- |
| `Header`             | 사용자 정보 초기화   |
| `Sidebar`            | 로그아웃 상태로 전환 |
| `NotificationBanner` | 로그아웃 메시지 표시 |

---

### 🧹 언마운트 처리

각 컴포넌트는 `useEffect` cleanup을 통해 옵저버 해제

```ts
return () => unsubscribe();
```

---

---

## React Native에서 활용

- **상태 관리**: 사용자 정보, 인증 상태 등 전역 상태 변화 감지
- **이벤트 시스템**: 앱 내 다양한 컴포넌트 간 이벤트 전파
- **일관성**: 모든 컴포넌트가 동일한 상태를 동시에 반영
- **실시간 업데이트**: 채팅, 알림 등 실시간 데이터 동기화
- **느슨한 결합**: 컴포넌트들이 서로를 직접 참조하지 않음
