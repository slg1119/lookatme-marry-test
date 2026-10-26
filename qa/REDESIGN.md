# 리디자인 검증 기록

검사일: 2026-10-26. 기준 커밋: `0630770181feabd0122c20576491cbeada8231e4`.
사용자 요청: Hallmark full redesign, 더 밝고 친근한 분위기, 어드민처럼 Pretendard 사용.

## 변경

| 항목 | 이전 | 현재 |
|---|---|---|
| 글꼴 | Noto Serif KR, DM Sans, Pretendard | 화면·저장 카드·OG 이미지 모두 Pretendard |
| 화면 | 기울어진 종이, 장식 스탬프와 영문 소제목 | 크림·블러시·세이지 바탕, 읽기 쉬운 한글 위계 |
| 홈 | 설명 다음 유형 미리보기, PC 네 열 | 유형을 먼저 소개, PC 두 열의 가로형 항목, 모바일 한 열 |
| 질문 | 장식 프레임과 챕터 라벨 | 질문·선택지 중심, 큰 터치 영역과 명확한 선택 상태 |
| 결과 | 종이 카드와 장식 라벨 | 원본 삽화와 유형 설명, 구분되는 대화 질문 |
| 공유 | 서로 다른 글꼴의 저장 카드 | 공통 색상 토큰과 Pretendard를 쓰는 카드 |

`src/App.tsx`의 기존 컴포넌트 안에서 마크업을 변경했다. `src/styles.css`를 재구성하고 `src/tokens.css`, `src/base.css`, `design.md`를 추가했다. Modal·404의 장식 라벨을 제거하고 `src/lib/share.ts`의 카드 표현을 맞췄다. SEO 요청으로 `/about`, 메타데이터, 검색 관련 경로와 OG 이미지를 추가했다. 기존 파일·라우트를 삭제하지 않았다.

## 보존과 문구 변경

- 기존 문항, 8개 유형의 사실·설명, 개인정보·진단 한계 안내, 채점·저장 계약을 보존했다. 기존 테스트 파일은 변경하지 않았다.
- Hallmark 기계 비교: 링크 **3/3**, 핸들러 **42/42**, 테스트 훅 **1/1**, 제목 **11/11**, figure **1/1** 보존. 이는 해당 도구가 기록한 홈/소스 범위의 수치이며 모든 동작을 증명하는 수치는 아니다. 동작은 별도 E2E로 검사했다.
- 원본 유형 삽화는 사용자 콘텐츠로 유지했다(waive 80). 유형 전체를 누르는 미리보기 버튼도 기존 동작과 터치 영역을 유지했다(waive 39b).
- 삭제한 장식 라벨 → 없음: `나와 잘 살 사람을 알아가는 시간`, `a little glimpse of our future`, `THE EVERYDAY, TOGETHER`, `Our ordinary, lovely days.`, `made for two`, `A LITTLE CLOSER TO YOU`, `MORE THAN A TYPE`, `EIGHT WAYS TO BE TOGETHER`, `YOUR NEXT CHAPTER`, `CHAPTER 01`, `CHAPTER 02`, `ONE QUESTION, ONE LITTLE DISCOVERY`, `A LITTLE NOTE FROM SOMEONE`, `THIS COULD BE YOUR EVERYDAY`, `MY MARRIAGE STORY`, `01 · MY KIND OF LOVE`, `02 · THE WAY WE LIVE`, `02/03 · SOMEONE BESIDE YOU`, `LET’S TALK ABOUT US`, `FROM A LITTLE TEST TO A REAL HELLO`, `MARRY TEST · A LITTLE NOTE`, `LET'S START AGAIN`. Hallmark 54·66의 장식 라벨 정리에 해당하며 실제 한글 제목·설명은 남겼다.
- `QUESTION 01–03` → `대화 01–03`. 저장 카드의 `당신은 어떤 매일을 꿈꾸나요? · marry test` → `당신은 어떤 매일을 꿈꾸나요?`; 브랜드는 카드 상단에 유지했다. 저장 카드의 유형 영문명은 원래 데이터의 대소문자를 사용한다.
- 별·하트 장식, 링크 옆 화살표 일부를 제거했고 강점의 별은 체크 아이콘으로 바꿨다. 기능상 이동·진행 아이콘은 유지했다.
- 새 안내 링크 `테스트 자세히 알아보기`와 `/about`은 별도 SEO 요청으로 추가했다. 원래 안내 모달도 유지했다.

## 검증 결과

- `npm test`: **63개 통과**(기존 52개와 SEO 설정 정책 11개).
- `npm run typecheck`, `npm run build`: 통과.
- `MARRY_API_E2E=1 npm run test:e2e`: **24개 통과**. Desktop Chromium, Android Chromium, iPhone WebKit 브라우저 프로필로 실행했다. 실물 기기 검증은 아니다.
- 실제 로컬 Nest API와 PostgreSQL을 사용한 저장·새로고침 중복 방지·네트워크 실패 후 재시도 **6개**를 포함한다. 운영 서버 저장/배포를 검증한 것은 아니다.
- 12문항, 수정, 새로고침·이어하기, 결과, 재시작, 공유·PNG 다운로드, 잘못된 URL 복구, 접근성 검사를 포함한다. `qa/browser-results.json`과 기기별 이미지·접근성 JSON에 결과를 보관했다.
- Hallmark 홈: 이전 **151 FAIL / 202 REFLEX** → 현재 **0 FAIL / 0 WARN / 2 WAIVED / 2 ANSWERED**. 자동 규칙의 발견 수이며 사용자 결함 수와 같지 않다. `after-home.txt` 참조.
- 질문·공개 유형·안내 화면: **0 FAIL / 0 WARN**, 원본 삽화 예외와 F7 응답. `after-app.txt` 참조.
- 독립 hero review: **ship, 수정 0건**. 1280/1440/1920/375 화면 확인.
- 독립 finish review: **ship, 수정 0건**. 원본/현재 홈과 질문·유형·안내·개인 결과의 PC/모바일, 저장 카드 확인. 기존 네 열의 유형 비교 밀도는 줄었지만 현재 설명 가독성과 등장 순서는 개선됐다는 판정이다.

## 결과물과 한계

- 전후 비교: [`.hallmark/compare.html`](../.hallmark/compare.html). 원본/현재 캡처를 참조하는 로컬 파일이며 Hallmark 기본 정책으로 Git에서는 제외한다.
- 최종 홈: [`desktop-preview.png`](desktop-preview.png). 질문·결과·공유 화면은 기기별 PNG를 참고한다.
- 추가 이미지 슬롯·임시 이미지·구매 사진은 없다. 원본의 의자·식탁·정원 등 유형 삽화를 유지했다. 향후 실제 소개팅 현장 사진이 준비되면 서비스 설명 자료로 활용할 수 있으나 이번 화면에 임의로 추가하지 않았다.
- 운영 배포와 최종 도메인은 아직 확정되지 않았다. SEO 공개 설정·크롤러 증빙·재측정 일정은 [SEO.md](SEO.md)에 별도로 기록했다.
