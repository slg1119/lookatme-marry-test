# marry-test Next.js · API 연동 검증

2026-10-26, Next.js 16.4.3 프로덕션 빌드(`next start`, localhost:4173), 실제 NestJS 모듈(localhost:3017), 전용 로컬 PostgreSQL 16(localhost:55478)에서 검증했습니다. 운영 서버나 운영 DB에는 적용하지 않았습니다.

## 결과

- Next.js 프로덕션 빌드 및 TypeScript 검사 통과.
- 프런트 단위 테스트 **52개 통과**: 계산, 불변 v1 계약, 저장 응답 검증, Next.js API 입력·오류 경계.
- 백엔드 계산 테스트 **17개 통과**, HTTP·PostgreSQL 통합 테스트 **15개 통과**.
- 백엔드 앱 모듈 테스트 **1개**, ORM 설정 테스트 **20개** 통과.
- 브라우저 전체 실행 **21개 통과**(21.0초): UI 15개 + 실제 API 저장 6개.
- 추가 Next.js 이전 검증 **3개 통과**(8.5초): 서버 HTML, 공유 메타데이터, 이전 해시 링크 이동.
- 별도 최종 디자인 검사: 3환경의 첫 방문 PNG 1080×1350, 자체 폰트 준비, 캡션 가림 없음, 320px 넘침 없음. 데스크톱 홈 axe 자동 탐지 위반 0개.

| 환경                                | UI     | 실제 API | Next.js 이전 |
| ----------------------------------- | ------ | -------- | ------------ |
| Chromium 데스크톱 1440×1000         | 5 통과 | 2 통과   | 1 통과       |
| Chromium Android 에뮬레이션 412×915 | 5 통과 | 2 통과   | 1 통과       |
| WebKit iPhone 에뮬레이션 390×844    | 5 통과 | 2 통과   | 1 통과       |

## 실제 저장 증거

`e2e/result-storage.spec.ts`는 브라우저에서 12개 질문을 직접 선택하고 Next.js → NestJS → PostgreSQL을 호출합니다. 응답 대역을 쓰지 않습니다. 네트워크 실패 시험에서 첫 요청만 차단한 뒤 실제 서버로 재시도합니다.

- 정상 저장 후 성공 안내, 서버가 계산한 자기/상대 점수 확인.
- 새로고침 후 같은 저장 ID·제출 번호 반환.
- 공유 페이지에서 저장 API 요청이 발생하지 않음.
- 네트워크 실패 시 답변 유지, 재시도 때 같은 제출 번호 사용.
- Next.js 이전 검증 전 DB 6행, 이후 12행이며 `count(*) = count(distinct submission_id) = 12`. 기존 Vite 검증 6건에 Next.js 검증 6건이 추가된 결과입니다.
- 백엔드 통합 테스트에서 12개 동시 요청이 한 행만 생성하는지 실제 DB로 확인. 변경된 답변에 같은 키 사용 시 409 및 원본 유지. 잘못된 요청/위조 필드는 400, DB 쓰기 없음.
- 통합 테스트용 `marry_test_integration` DB에서 실제 마이그레이션 적용과 롤백 확인.

`e2e/marry-test.spec.ts`의 일반 UI 테스트는 백엔드 없이 재현할 수 있도록 저장 응답만 대역을 사용합니다. 이 15개를 실제 DB 통합 검증으로 집계하지 않았습니다.

## 화면과 접근성

12문항 완료, 이전/수정, 새로고침/이어하기, 재시작 취소/확인, 8개 미리보기, 모달 Escape/닫기, 메뉴/본문 바로가기, 잘못된 경로와 저장 데이터, 공유 링크 개인정보 제외, 클립보드 성공/실패 대안, PNG 다운로드를 검증했습니다.

홈·모달·문항·결과를 각 환경에서 axe-core WCAG 2 A/AA·2.1 A/AA 규칙으로 검사했습니다. **12회 스캔 자동 탐지 위반 0개**입니다. 배경 질감과 겹침 때문에 자동 판정하지 못한 `incomplete` 항목은 JSON에 남겼습니다. 완전한 접근성 준수나 물리 기기 검증을 뜻하지 않습니다.

가로 넘침은 주요 화면과 320px 화면에서 확인했습니다. 실제 네트워크 오류를 의도한 시나리오 외에는 런타임 오류가 없었습니다. 없는 경로의 예상된 404 콘솔 기록은 제외했습니다. 최종 홈, 결과, 다운로드 카드를 이미지로 확인했습니다.

## 근거 파일

- `browser-results.json`: Next.js 환경의 21개 브라우저 테스트 결과.
- `api-browser-results.json`: 위 결과에서 실제 저장 시나리오만 추린 자료.
- `{desktop,android,iphone}-api-{saved,retry}.png`: 실제 저장/실패 화면.
- `{desktop,android,iphone}-{home,question,result,shared,preview-modal}.png`: UI 화면.
- `desktop-preview.png`: 최종 홈 미리보기.
- `{desktop,android,iphone}-download.png`: 앱이 다운로드한 PNG.
- `*-accessibility.json`, `refinement-results.json`: 접근성·최종 디자인 검사.
- `initial-accessibility-findings.json`: 최초 Vite 디자인에서 발견하고 수정한 대비 문제의 과거 근거.

## 재실행

```sh
npm run build
# .env.local에 LOOKATME_API_URL 설정 후, 별도 터미널에서
npm start
# 실제 NestJS 로컬 실행기도 실행한 다음
MARRY_API_E2E=1 npm run test:e2e
node qa/refinement-check.mjs
```

기본 `npm run test:e2e`는 실제 API 테스트 6개를 명시적으로 건너뜁니다. OS 공유 시트의 실제 타인 전송, 물리 Android/iPhone, 운영 배포·마이그레이션, 신청·결제·회원 연동은 검증 범위에 포함하지 않습니다.
