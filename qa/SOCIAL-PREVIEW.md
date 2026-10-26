# 공유 이미지 제작과 미리보기 수정

작업일: 2026-10-26. 운영 도메인: https://test.lookatme.my.

## 재현한 원인

운영 HTML의 `og:image`와 `twitter:image`가 `http://localhost:4173/og/home`이었다. 실제 공개 `/og/home`은 200 PNG 1200×630으로 제공됐지만 외부 크롤러는 메타데이터에 적힌 localhost에 접근할 수 없다. 도메인 미설정 빌드 때문에 `noindex, follow`도 함께 노출됐다. 원본 측정은 `seo-live-before.json`에 기록했다.

## 변경

- 확정된 공개 도메인을 프로덕션 빌드의 기본값으로 사용한다. 명시적인 `SITE_URL`은 계속 우선한다.
- OG·Twitter 이미지 URL은 절대 주소이며 HTTPS 이미지에는 `secure_url`, MIME type, 크기, 대체 설명을 제공한다. 새 이미지 버전 `v=20261026`을 사용한다.
- Vercel preview와 `SITE_NOINDEX=true`는 계속 검색 제외한다. 개인 결과와 질문 진행 화면의 noindex도 유지한다.
- 밝은 크림·테라코타·세이지로 두 의자와 커피 두 잔을 그린 일러스트를 제작했다. 제목과 설명은 실제 Pretendard 폰트로 렌더해 정확한 한글을 유지한다.
- 홈과 유형 8개의 1200×630 PNG를 빌드 때 생성한다. 브라우저 JavaScript, 외부 이미지 호스팅, 이미지 생성 API를 운영 시점에 호출하지 않는다.

## 이미지 파일과 생성 방식

- 원본: `src/assets/marry-social-scene-v1.png` (1254×1254).
- 최종 홈 카드: `qa/seo-og-home.png` (1200×630).
- 유형 카드 예시: `qa/seo-og-everyday-soulmate.png` (1200×630).
- 소비 코드: `src/app/og/[id]/route.tsx`. 공통 색상·글꼴은 `src/tokens.css`에서 가져온다.
- 내장 `image_gen` 도구로 원본을 생성했다. CLI/API fallback은 사용하지 않았다. 원본을 프로젝트로 복사한 후 Next.js ImageResponse로 Pretendard 문구와 함께 구성했다.

최종 생성 프롬프트:

```text
Use case: illustration-story. Asset type: original artwork for a Korean marriage-style quiz social sharing card, to be composed with separately typeset Pretendard text. Create a polished, warm editorial gouache and colored-pencil illustration with matte paper texture: two inviting empty chairs, one muted terracotta and one sage green, angled toward a small round wooden table with two ceramic coffee cups and a tiny vase holding a simple flower. Behind is a softly rounded sunlit window, pale linen curtain, gentle green hills, a small houseplant. Quiet everyday companionship, welcoming and hopeful, bright and friendly rather than wedding luxury. Square canvas, central balanced complete scene with a generous cream margin, no clipping. Palette cream #fdfbf7, blush #f6eae5, sage #eef2e8, dark olive #343b32 with tiny burgundy #753d45 accents. A compact lovely room vignette, rich tactile details but calm uncluttered silhouettes, thoughtful asymmetry, beautiful soft natural light. No people, no text, no letters, no numbers, no logo, no watermark, no hearts floating, no border or mockup. The illustration will occupy the right half of a 1200 by 630 website Open Graph card; ensure the subject reads at thumbnail size.
```

## 검증

- 수정 전 도메인 누락/빈 값/공백과 preview 메타데이터에 대한 회귀 검사 4개 실패를 재현했다.
- 수정 후 단위 검사 67개 통과, 프로덕션 빌드 통과.
- `SITE_URL` 없이 빌드한 로컬 서버의 공개 도메인 메타, 사이트맵 10개, 공유 이미지 9개, FAQ 5개, 개인 화면 noindex를 curl로 확인했다. `seo-domain-fallback.json` 참조.
- 검사 도구는 실제 HTML의 OG 이미지 URL을 추출해 도메인·프로토콜·Twitter 일치와 해당 이미지의 응답을 확인한다. 이미지 경로만 별도로 검사해 잘못된 호스트를 놓치지 않는다.
- 홈·유형 카드의 한글, 잘림, 배치, 크기를 직접 확인했다.

## 카카오 캐시

사이트 수정 후에도 이전 미리보기가 남으면 카카오 공유 디버거에서 해당 페이지의 캐시를 초기화한 뒤 다시 조회한다. 이미지 버전 변경만으로 기존 HTML 캐시가 반드시 갱신되지는 않는다. [카카오 공식 FAQ](https://developers.kakao.com/docs/ko/message-template/faq).

검색 순위·클릭·AI 인용 증가는 이번 이미지/메타데이터 수정으로 입증하지 않았다. 실제 검색 성과는 공개 후 14일 재측정 계획을 유지한다.
