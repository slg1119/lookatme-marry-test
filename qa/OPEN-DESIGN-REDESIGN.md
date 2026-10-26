# Open Design 전면 리디자인 적용 및 검증

검증일: 2026-10-26. 범위: marry-test. 기준 HEAD: `53ffe3b5ad40479d0b6cd590cdf48e1a1e1f92db`.

## 생성과 실제 적용

사용자가 추가 로그인 없는 자체 Codex 실행을 선택하여 Open Design **Local Codex**로 진행했습니다. Brief는 Showcase work / Rich single page / Warm human으로 확인했습니다. Showcase는 8가지 결혼 스타일을 소개하는 홈 구성으로, Rich single page는 풍부한 홈으로 해석하고 기존 기능 경로는 유지했습니다.

[완료된 Open Design 시안](http://127.0.0.1:50754/projects/look-at-me-a3c7/conversations/0f3f8dea-8221-431f-b160-20f2f3fe092d/files/index.html)

동일 작업의 자동 planning → production 연결을 추적했습니다. 최종 상태는 `succeeded`, `deliverableValid=true`, `terminal=true`입니다. 생성기의 브라우저 검증은 환경 제한으로 미완료(`productionReady=false`)였으므로 생성 성공을 제품 QA 완료로 취급하지 않았습니다. 아래 검증은 부모 Codex 세션에서 **실제 marry-test 저장소**에 적용한 뒤 별도로 실행한 결과입니다. 내장 브라우저는 `Browser is not available: iab`로 시안 자동 열기가 불가능하여 반환된 링크를 제공합니다.

lookatme-web은 토큰·폰트·레이아웃 참고에만 사용했습니다. 생성기의 임시 저장·공유 컨트롤러는 가져오지 않았고, 환경변수 값이나 실제 답변 데이터는 생성 프롬프트에 포함하지 않았습니다.

## 적용 내용

- Pretendard Variable, 종이색 #fffdfa, 로즈 #b52f4b와 연한 분홍 면. 토큰과 반응형 스타일을 새로 구성했습니다.
- 홈: 질문형 제목, 결과 예고, 문항 단계, 8개 유형 격자, 성향 설명, 대화 예시, FAQ, 시작 CTA.
- 질문: 한 문항에 집중하는 800px 구성, 12칸 진행률, 단계 안내, 선택·포커스 표시.
- 결과·공개 유형: 유형명과 해설의 위계, 공유 카드, 개인 성향/동반자, 대화 질문, API 저장 상태와 재시도.
- 안내·모달·favicon을 같은 시스템으로 맞췄습니다. SVG 8개를 웹·PNG·OG가 함께 사용합니다.
- PNG는 1080×1350, OG는 1200×630. 이미지 경로는 유지하고 버전 문자열을 `20261026-open-design`으로 갱신했습니다.

문항/선택지/점수/유형 ID, useQuizSession, useResultSync, API Route Handler, Kakao SDK·payload 구현, SEO 정책 파일은 변경하지 않았습니다. 홈의 삭제 요청된 익명 저장 문구는 복구하지 않았습니다. 공개 유형에는 개인 답변·점수·동반자 선호를 전달하지 않습니다.

## 검증 결과

| 항목          | 결과와 근거                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 단위 테스트   | `npm test`: 5 files, 80 passed                                                                                                       |
| 타입          | `npm run typecheck`: passed                                                                                                          |
| 프로덕션 빌드 | `npm run build`: passed, 27 static pages 생성                                                                                        |
| 브라우저 E2E  | 42 passed, 6 skipped, 실패/재시도 통과 없음. `qa/browser-results.json`                                                               |
| 브라우저 구성 | Chromium 1440px, Android Chromium 412px, iPhone WebKit 390px 에뮬레이션. 320/768px 추가 경계 검사                                    |
| 주요 흐름     | 12문항 완료, 선택 수정/이전, 새로고침, 중단/이어하기, 결과 재열기, 초기화/취소, 8개 미리보기, Escape, 복사/수동 링크, 다운로드       |
| API           | 통제된 503 → 재시도 201 → 재열기. 동일 submissionId/answers 재전송, 공개 유형은 전송 없음                                            |
| 카카오        | SDK 정상/오류/시간초과/재연결. 사용자 클릭에서 호출, 정확한 버튼 문구와 운영 web/mobile 목적지, 실패 시 링크/PNG 대안                |
| 내보내기      | 8개 유형 × 3 브라우저 실제 다운로드. PNG 헤더·크기 확인. 9개 OG HTTP 200 및 1200×630 확인                                            |
| 검색 노출     | 개발 모드 noindex/빈 sitemap, 로컬 프로덕션 빌드에서 canonical/10개 sitemap/FAQ JSON-LD 일치/비공개 경로 noindex/9개 OG 확인         |
| 접근성        | 홈·모달·질문·결과·안내·긴 공개 유형의 WCAG A/AA 자동 검사 위반 0. 키보드 skip/focus/선택/닫기, reduced-motion, 주요 컨트롤 44px 검사 |

실제 NestJS/PostgreSQL 통합 검사는 `MARRY_API_E2E=1`이 필요한 6개로, 이번에는 실행하지 않았습니다. API 응답 대역 통과를 실제 운영 저장 성공으로 보고하지 않습니다. 카카오 검증 역시 SDK/payload 통제 검사이며 실제 사람에게 메시지를 보내지 않았습니다.

자동 접근성 도구에는 일러스트 위 숫자와 스크롤 모달 일부 문구의 대비 판정 `incomplete`가 남습니다. 숫자색과 해당 SVG 바탕색의 계산 대비는 5.18–5.34:1입니다(`redesign/illustration-label-contrast.json`). 자동 검사 전체 통과를 완전한 접근성 인증으로 주장하지 않습니다.

## 직접 화면 확인

연결된 Chrome에서 390/320px 질문 선택·다음·이전과 선택 유지, 768px 안내, 412px 긴 유형명을 직접 확인했습니다. 홈 1440px와 iPhone 전체 스크린샷, 긴 유형 PNG, 홈/유형 OG를 열어 읽기 흐름·그래픽·문구 잘림을 확인했습니다. 물리 스마트폰 QA는 아닙니다.

- 현재 홈: `desktop-preview.png`, `desktop-home.png`, `iphone-home.png`
- 질문·결과: `<device>-question.png`, `<device>-result.png`
- 공유·모달: `<device>-shared.png`, `<device>-preview-modal.png`, `<device>-kakao-share.png`
- 유형별 내보내기: `redesign/card-*.png`, `redesign/og-*.png`
- SEO: `redesign/seo-development.json`, `redesign/seo-production-build.json`
- 접근성: `<device>-accessibility.json`, `<device>-additional-accessibility.json`

초기 기존 E2E는 Next 개발 서버의 127.0.0.1 HMR origin 차단 때문에 실패했습니다. 설치된 Next 가이드에 따라 개발용 `allowedDevOrigins`에 127.0.0.1을 추가한 뒤 기존 테스트 30개가 통과한 기준선을 확보했습니다. 새 화면에서 발견한 보조기기 이름 불일치를 수정했고, 예전 hash 주소 검사는 해시를 포함한 URL이 잘못 통과하지 않도록 실제 pathname과 도착 유형명을 확인합니다.

## 적용 경계

실제 저장소 적용과 로컬 검증까지 완료했습니다. 운영 배포·원격 main 반영·새 운영 데이터 저장은 수행하지 않았습니다. 생성 시안, 로컬 프로덕션 빌드 검사, 운영 배포는 별개입니다.
