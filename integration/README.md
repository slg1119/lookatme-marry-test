# 기존 LookAtMe API 변경

`lookatme-backend-marry-test.patch`는 기존 NestJS 백엔드에 적용하는 전체 변경입니다. 별도 API를 새로 만드는 것이 아니라 기존 앱/ORM에 모듈을 등록합니다.

- 기준 커밋: `c807ad8`
- 변경 커밋: `0835a0b`
- 로컬 브랜치: `feat/marry-test-results`
- 로컬 작업 경로: `../.codex-work/marry-test-api`
- 포함: 저장 API, 서버 계산, 엔티티, DB 마이그레이션, 테스트, 로컬 실행기.

백엔드 저장소에서 새 브랜치를 만든 뒤 이 패치를 `git am /path/to/lookatme-backend-marry-test.patch`로 적용할 수 있습니다. 현재 작업 환경에는 해당 커밋이 이미 있으므로 다시 적용할 필요가 없습니다.

백엔드는 로컬 커밋까지만 완료했습니다. 해당 저장소의 `vercel.json`은 빌드 시 `build:vercel`을 실행하고, 이 스크립트는 DB 마이그레이션도 실행합니다. 운영 배포와 DB 변경을 이 작업에서 실행하지 않고, 검토 가능한 패치를 프런트 저장소에 함께 제공합니다.

적용 후 `src/marry-test/README.md`의 로컬 실행·검증 절차를 따릅니다. Next.js 서버에는 배포된 API 주소를 `LOOKATME_API_URL`로 설정합니다.
