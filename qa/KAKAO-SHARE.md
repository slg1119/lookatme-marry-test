# 카카오톡 공유 검증

작업일: 2026-10-26. 대상: marry-test. 타로 참고: lookatme-web의 `src/contexts/fortune/infrastructure/kakao-share.ts`, `src/contexts/fortune/ui/share/share-sheet.tsx`, `__tests__/fortune-share-kakao.test.tsx`.

## 구현과 설정

- 타로와 동일한 SDK 지연 로드·한 번 초기화·실패 시 재시도·피드 템플릿 방식을 적용했다. 결혼 테스트는 이미 공개 유형 페이지가 있으므로 타로의 개인 리딩 공유 토큰/생성 API는 복사하지 않았다.
- 결과·공개 유형 화면에 노란 카카오톡 버튼을 추가했다. 카드 저장과 기존 기기 공유/링크 복사 동작을 유지했다.
- 메시지: 유형명과 설명, 해당 유형의 1200×630 이미지, `결과 보기`, `나도 테스트하기`. 모든 목적지는 `https://test.lookatme.my`이며 현재 페이지의 query/hash/session 값은 사용하지 않는다.
- SDK는 공식 2.8.4를 사용하며 SRI를 공식 문서와 다운로드 파일의 SHA-384로 대조했다. 타로에서 쓰던 2.7.4의 로더 구조를 참고했다.
- 기존 타로에서 브라우저에 공개한 JavaScript 키를 재사용해 marry-test의 Vercel Production `NEXT_PUBLIC_KAKAO_JS_KEY`에 등록했다. 키 값은 저장소·보고서에 기록하지 않았다. 로컬 `.env.local`은 Git 제외다.
- 키가 없으면 SDK나 카카오 전용 버튼을 로드하지 않는다. 네트워크 실패/10초 타임아웃에는 다시 연결 버튼과 기존 공유 대안을 제공한다.
- `sendDefault`는 클릭 안에서 동기 호출하며 발송 완료로 표시하지 않는다. 사용자에게 공유 창에서 보낼 사람을 고르도록 안내한다.

## 검증

- 단위 검사 **80개 통과**. 새 검사 13개는 유형 8개의 정확한 payload, 공개 주소·개인정보 제외, 서버/키 미설정, 중복 초기화, 초기화 실패, 동기 SDK 호출을 포함한다.
- 프로덕션 빌드 통과. 실제 키는 빌드 시 환경변수로 제공되며 소스에 하드코딩하지 않았다.
- 새 카카오 브라우저 시나리오 **12개 통과**: PC Chromium, Android Chromium, iPhone WebKit에서 정상 payload·사용자 활성 상태, SDK 실패와 재연결, 타임아웃, 기존 링크 복사 대안을 확인했다. 자동 테스트는 SDK 전송을 가로채 실제 메시지를 보내지 않는다.
- 기존 UI/공유/접근성/Next.js 검사 **18개 통과**. 이번 실행은 브라우저 기기 프로필이며 실물 Android/iPhone 검증은 아니다.
- 화면 증빙: `desktop-kakao-share.png`, `android-kakao-share.png`, `iphone-kakao-share.png`. 320px에서도 가로 넘침을 확인했다.
- 백엔드·DB 계약은 변경하지 않았다. 공유 유형 페이지에서 결과 저장 요청이 발생하지 않는지 검사했다.

## 공식 근거

- [카카오톡 공유 JavaScript](https://developers.kakao.com/docs/ko/kakaotalk-share/js-link): 사용자 정의 버튼에서 `Kakao.Share.sendDefault`를 호출하는 피드 공유.
- [SDK 설정과 도메인 등록](https://developers.kakao.com/docs/en/tutorial/js-share): JavaScript SDK 도메인과 제품 링크 웹 도메인 등록, JavaScript 키, 공식 2.8.4 SRI.

## 운영 확인

- 2026-10-26 13:17 KST, 구현 커밋 `457f2bb`의 Vercel Production 배포가 Ready인 것을 확인했다.
- 실제 Chrome에서 `https://test.lookatme.my/type/everyday-soulmate`를 열어 SDK 준비 후 노란 공유 버튼이 표시되는 것을 확인했다. 버튼을 클릭하자 실제 카카오 공유용 로그인 창이 열렸고, 로그인 후 이동 목적지는 `sharer.kakao.com/picker/link`였다.
- 로그인·수신자 선택·메시지 발송은 진행하지 않았다. 메시지 수신, 로그인 이후 링크 도메인 검증, 실물 모바일 앱 실행까지 완료했다고 주장하지 않는다.
- 사용자가 요청한 기존 프로젝트 환경변수 확인은 Vercel MCP가 세션에 제공되지 않아 인증된 Vercel CLI로 수행했다. `lookatme-web`에 카카오 JavaScript 키 환경변수가 있음을 확인했으나 Sensitive 값은 내려받을 수 없어, 동일 프로젝트의 운영 타로 클라이언트에 공개된 키를 재사용했다. marry-test의 Production에 해당 변수 등록과 배포 반영을 확인했다. 기존 프로젝트의 DB·로그인 비밀키는 복사하지 않았다.
