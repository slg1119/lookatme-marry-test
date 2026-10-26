# 결과 저장 API 운영 배포

검증일: 2026-10-26 (KST)

## 운영 반영

- 백엔드 커밋: `7ebe7e850b5f139c5f0a8ea4dc4fd44460fa330c`
- 원격 `main`·`develop`이 위 커밋으로 일치.
- Production: `dpl_3xdZcratnNJLRgzDEiDfurj1EqGd`, READY, 커밋 SHA 일치.
- 운영 도메인 `https://api.lookatme.my`가 위 Production 배포를 가리키는 것을 확인.
- Preview (`develop`): `dpl_GNUVWwtxK1NdVpw79WJB1UbhyuYq`, READY, 동일 SHA.
- 프런트 Production 환경: `LOOKATME_API_URL=https://api.lookatme.my`.
- 백엔드 기존 재고 마이그레이션 `Migration20261026120000`을 보존하고 결과 저장에는 `Migration20261026170000` 사용.

운영 빌드 로그 (UTC):

```text
2026-10-26T09:07:20.872Z [migrator] Processing 'Migration20261026170000'
2026-10-26T09:07:22.216Z [migrator] Applied 'Migration20261026170000'
2026-10-26T09:07:24.442Z Successfully migrated up to the latest version
```

## 배포 전 검증

Node 22.18.0에서 `npm run build` 통과. 결과 계산, ORM 등록, 앱 모듈 조립, 서버 초기화 관련 4개 스위트·44개 테스트 통과. 전용 로컬 PostgreSQL의 HTTP 통합 테스트 15개 통과: 실제 저장, 12개 동시 재시도에서 단일 행 유지, 변경된 답변 충돌, 잘못된 입력 미저장, 마이그레이션 적용·롤백을 포함한다. 전체 백엔드 테스트 스위트를 실행한 결과는 아니다.

프런트와 백엔드의 `quiz-contract.ts`는 파일 비교로 동일함을 확인했다. 최신 운영 기준 커밋 `f273cd6` 위에 결과 저장 변경만 통합했으며, 다른 작업자의 체크아웃은 수정하지 않았다.

## 운영 브라우저 검증

실제 `https://test.lookatme.my`를 Chromium 390×844에서 열어 12문항을 완료했다. 응답 대역 없이 Next.js → NestJS → PostgreSQL 경로를 사용했다.

- 저장: `POST /api/marry-test/results`가 `201`, 화면에 저장 완료 표시.
- 서버 결과: `everyday-soulmate`, 자기 점수 세 축 `-100`, 상대 점수 세 축 `100`.
- 새로고침과 동일 제출 재요청: `201`, 동일 저장 ID·제출 ID·생성 시각 반환.
- 같은 제출 ID에 다른 답변: `409`. 이후 원래 답변 재요청에서 원래 결과 유지.
- 공개 유형 페이지 방문: 결과 저장 요청 0회.
- 브라우저 pageerror: 0개.
- 잘못된 빈 요청: 백엔드 `400` 응답으로 입력 검증 확인.

[운영 응답 기록](backend-production-save-result.json)과 [모바일 결과 화면](backend-production-saved-mobile.png).

검증에는 사람의 실제 답변 대신 고정된 합성 답변을 사용했다. 첫 실행은 저장 성공 후 보조 문구까지 포함된 화면에 완전 일치 검증을 적용해 중단됐다. 기존 E2E와 같은 포함 검증으로 수정한 두 번째 실행에서 위 절차가 모두 통과했다. 총 2개의 합성 제출을 생성했으며 재시도에는 같은 제출 ID를 사용했다. 운영 DB 직접 조회나 기존 결과 조회는 하지 않았다.
