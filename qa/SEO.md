# 검색 최적화 기록

검사일: 2026-10-26. 사용 스킬: `fire-your-seo-agency` (`leopard627/fire-your-seo-agency`).
적용 대상은 로컬 Next.js 프로젝트이며, 최종 도메인과 검색 도구 계정은 제공되지 않았다.

## 진단과 변경

| 레인 | 변경 전 | 변경 후 / 한계 |
|---|---|---|
| SEO | 홈·유형 본문 SSR, 대표 URL·사이트맵 없음 | 페이지별 metadata, canonical, sitemap, robots, 9개 OG PNG; 공개 도메인 설정 후 색인 활성화 |
| AEO | 공개 안내와 FAQ JSON-LD 없음 | `/about`의 5개 가시 FAQ와 동일한 JSON-LD; 리치 결과 노출을 보장하지 않음 |
| GEO | llms.txt 없음 | 실제 기능·한계·유형 링크를 제공; 공개 상태에서 검색·AI 크롤러에 같은 공개 콘텐츠 허용 |
| LLMO | 브랜드 이름은 있으나 엔티티 연결 없음 | `marry test` 표기와 WebSite/WebPage 참조 일관화; 모델의 실제 인지도 변화는 미측정 |
| NEO | 모바일 화면 존재, 검색 도구 등록 증거 없음 | 모바일 QA, 한국어 메타·canonical·Yeti에 공통 robots 정책; 네이버 등록·소유 확인·제출은 미실시 |
| 콘텐츠 | 블로그·피드 없음 | 사실에 기반한 안내 1개와 기존 유형 8개 연결. 검색 데이터 없이 블로그나 키워드 변형 페이지를 대량 생성하지 않음 |

`seo-after.json`은 도메인 미설정 로컬 정책, `seo-public-fixture.json`은 예약된 예시 도메인으로 빌드한 공개 정책의 검사 기록이다. 예시 도메인을 실제 운영 도메인으로 주장하지 않는다.

## 크롤러 검증

`python3 qa/seo-check.py`는 curl로 받은 HTML을 파싱하며 브라우저 JavaScript를 실행하지 않는다.
홈·안내·8개 유형의 SSR 본문, 고유 제목, 설명, OG·Twitter, JSON-LD를 확인한다.
FAQ 답변 5개는 가시 본문과 문자 단위로 비교한다. 공개 정책에서 사이트맵 10개 URL·canonical·index를 검사하고, 개인 결과·진행 화면은 메타와 HTTP 헤더의 noindex를 확인한다.
잘못된 페이지·유형·OG 3개는 404, 공유 이미지 9개는 실제 PNG 1200×630임을 검사한다.

## 공개 설정

1. `SITE_URL`에 최종 HTTPS origin을 설정하고 `SITE_NOINDEX=false`로 다시 빌드한다. preview는 색인 제외 상태를 유지한다.
2. Google Search Console, Bing Webmaster Tools, 네이버 서치어드바이저에서 사이트 소유권을 확인한다. 필요한 검증 문자열은 환경변수로 제공한다.
3. 최종 도메인의 `/sitemap.xml`을 각 도구에 제출하고 홈·안내·유형 페이지의 실제 수집을 확인한다.
4. 배포 URL로 crawler 검사를 다시 실행한다. robots.txt는 개인정보 보호나 접근 통제 기능이 아니며 `/result`의 noindex와 공개/개인 데이터 구분을 유지한다.

## 측정 계획

- 기준선: 현재 검색 노출·클릭·평균순위·색인수·AI 인용은 **미측정**이다. 0으로 대체하지 않는다.
- 공개일에 GSC 최근 28일과 네이버 노출·클릭, Bing 색인 상태, 봇 접근 로그를 기록한다. 신규 사이트이면 기간과 데이터 없음 상태를 그대로 적는다.
- 재측정: **2026-11-09**를 제안한다(2026-10-26 공개 가정). 공개가 늦어지면 **실제 공개일 +14일**로 옮긴다. 일정 서비스에 예약한 것은 아니다.
- 비교에서 집계가 덜 끝난 최근 2~3일은 제외한다. 날짜·기준 기간·도메인·화면 또는 CSV를 함께 보관한다.
- 추적 질문: ‘marry test는 어떤 테스트인가요?’, ‘marry test 결과는 무엇을 알려주나요?’, ‘marry test는 정식 MBTI 검사인가요?’. Google/Bing/네이버 및 검색 기능을 켠 AI에서 실제 출처 링크 유무를 기록한다. 확인하지 않은 인용을 성공으로 세지 않는다.
- LLMO 인지도는 공개일로부터 분기 후 재확인한다. 운영자가 검토한 브랜드 설명만 공개 채널에 사용한다.

## 근거와 제외 범위

- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): 기존 SEO 기본 요건이 적용되며 별도 AI 전용 최적화는 요구되지 않는다. llms.txt를 순위 상승이나 인용 보장 장치로 취급하지 않았다.
- [Google robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro): robots 수집 제한과 검색 색인 제외는 다르다.
- [네이버 대표 URL·robots 메타](https://searchadvisor.naver.com/guide/markup-structure): 절대 canonical과 index/noindex 정책.
- 실제 순위 상승·검색 클릭 증가·AI 인용·공개 서비스 배포는 이번 로컬 검증으로 입증하지 않았다. IndexNow 핑, 검색 도구 제출, 블로그 발행은 최종 도메인·소유권·검수 자료가 없어 수행하지 않았다.
