# 개발 컨벤션

코드를 작성할 때 반드시 지켜야 할 규칙.

---

## 파일 규모

- **파일당 200줄 미만** 유지
- 200줄에 근접하면 즉시 분리 검토

---

## 설계 원칙

- **단일 책임 원칙(SRP)** 엄수 — 하나의 파일/함수는 한 가지 책임만
- **함수는 최대한 분리** — 확장 가능성을 고려해 잘게 쪼갠다
- 중복 로직은 공용 레이어로 추출

---

## API 호출 분리

- 컴포넌트/페이지에 `fetch` / `axios` 등 API 호출을 **직접 작성 금지**
- 모든 외부 호출은 별도 레이어(`shared/api`, `entities/*/api`, `features/*/api`)로 분리
- 호출 함수는 입출력 타입을 명시하고, 에러 처리를 일관된 방식으로 구현

---

## 폴더 구조 — FSD (Feature-Sliced Design)

레이어 구분:

```
src/
├── app/        # Next.js App Router (라우팅, 페이지 엔트리)
├── views/      # FSD pages 레이어 (페이지 컴포지션). Next.js의 Pages Router와 이름 충돌 방지 위해 views로 사용
├── widgets/    # 독립적 UI 블록 (헤더, 사이드바, 대시보드 패널 등)
├── features/   # 사용자 인터랙션 기반 기능 단위
├── entities/   # 비즈니스 엔티티 (User, Project, Metric 등)
└── shared/     # 공용 리소스 (UI 킷, lib, api 클라이언트, config 등)
```

### 레이어 import 규칙
- 상위 레이어는 하위 레이어만 import 가능 (역방향 금지)
  - `app → views → widgets → features → entities → shared`
- 같은 레이어 내 슬라이스 간 import 금지

### 슬라이스 내부 세그먼트
각 슬라이스(`entities/user`, `features/auth` 등)는 용도별 세그먼트로 구성:
- `ui/` — 컴포넌트
- `model/` — 상태, 타입, 비즈니스 로직
- `api/` — 외부 호출
- `lib/` — 유틸

---

## Next.js App Router + FSD 병행

- `src/app/`은 Next의 라우팅 전용 — 비즈니스 로직 배치 금지
- 페이지 구현은 `src/views/*` 또는 `widgets/*`를 조합하여 `src/app/*/page.tsx`에서 렌더
- Server Actions / Route Handlers도 FSD 슬라이스 내부에 정의하고 `app/`에서 re-export

---

## 타입 / 네이밍

- 타입/인터페이스는 해당 슬라이스의 `model/`에 위치
- 공용 타입만 `shared/types`에 둔다
