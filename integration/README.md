# 기존 LookAtMe API 변경

결과 저장 API와 DB 마이그레이션은 2026-10-26 운영에 배포했습니다. Next.js의 `LOOKATME_API_URL`은 `https://api.lookatme.my`입니다.

- 백엔드 배포 커밋: `7ebe7e850b5f139c5f0a8ea4dc4fd44460fa330c`
- 기준 커밋: `f273cd6c44f98477ad8acc95b9d06b4f2f636c81`
- 마이그레이션: `Migration20261026170000`
- 운영 API: `POST https://api.lookatme.my/marry-test/results`
- 로컬 통합 작업 경로: `../.codex-work/marry-test-api-release`
- 포함: 저장 API, 서버 계산, 엔티티, DB 마이그레이션, 테스트, 로컬 실행기.

`lookatme-backend-marry-test.patch`는 위 배포 커밋의 기록용 패치입니다. 기존 NestJS 앱과 ORM에 모듈을 등록하며, 별도 API 앱을 만들지 않습니다. 운영 `main`과 `develop`에는 이미 반영했으므로 다시 적용하지 않습니다.

초기 로컬 커밋 `0835a0b`의 마이그레이션 번호 `Migration20261026120000`은 이후 배포된 재고 기능과 겹쳤습니다. 기존 재고 마이그레이션을 보존하고 테스트 저장용 번호를 `Migration20261026170000`으로 바꿨습니다. 예전 패치를 현재 운영 코드에 다시 적용하지 않습니다.

백엔드 `vercel.json`의 `build:vercel`은 DB 마이그레이션을 실행합니다. 이번 운영 빌드 로그에서 새 마이그레이션 적용을 확인했고, 실제 사이트에서 12문항 완료 후 `201`, 새로고침·재시도의 동일 저장 ID, 답변 변경 시 `409`를 검증했습니다.

로컬 실행·검증 절차는 백엔드의 `src/marry-test/README.md`, 배포 근거는 [BACKEND-DEPLOYMENT.md](../qa/BACKEND-DEPLOYMENT.md)를 참고합니다.
