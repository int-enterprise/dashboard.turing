# Typography

## 폰트 (Font Family)

프로젝트 전역에서 **Pretendard만 사용한다.**

- 모든 UI 텍스트 (본문, 제목, 레이블, 버튼, 내비게이션) — Pretendard
- 모노스페이스 표현 (ID, 레이블, 코드 느낌 텍스트) — 동일하게 Pretendard
  - 별도 monospace 폰트 도입 금지. Pretendard의 `tnum` 피처로 숫자 일관성 확보
- 시스템/대체 폰트는 Pretendard 로드 실패 시의 fallback에만 사용

## 적용 방식

- 패키지: `pretendard` (npm)
- 로드: `src/app/layout.tsx`에서 `pretendard/dist/web/variable/pretendardvariable.css` 전역 import
- CSS 변수: `--font-sans`, `--font-mono` 모두 Pretendard 기반으로 정의 (`src/app/globals.css`)
- Tailwind에서 `font-sans`, `font-mono` 유틸리티 모두 Pretendard로 연결됨

## Font Features

`body`에 기본 적용:

- `ss03`, `ss04`, `cv01` — Pretendard 스타일리스틱 세트 (한글 가독성 향상)
- `tnum` — tabular numbers (지표/테이블 숫자 정렬)


## 금지 사항

- Google Fonts, Geist, Inter, Pretendard 이외의 어떤 웹폰트도 로드 금지
- 인라인 `font-family` 지정 금지 (모든 폰트는 Tailwind 유틸리티 또는 semantic CSS 변수 경유)
