import { getSiteUrl } from "../../lib/seo";
import { PROFILES } from "../../lib/quiz";

export const dynamic = "force-static";

export function GET() {
  const site = getSiteUrl();
  const link = (path: string) => (site ? new URL(path, site).href : path);
  const text = `# marry test

> 12개의 일상 질문으로 나의 결혼 스타일과 바라는 동반자를 살펴보는 관계 취향 테스트입니다.

## 서비스 안내
- [결혼 성향 테스트](${link("/")}): 약 3분, 가입 없이 참여합니다.
- [테스트 안내](${link("/about")}): 문항 구성, 결과의 의미, 저장 및 공유 안내입니다.

## 8가지 결혼 스타일
${PROFILES.map((p) => `- [${p.name}](${link(`/type/${p.id}`)}): ${p.tagline}`).join("\n")}

## 결과의 범위
앞의 6문항은 나의 모습, 뒤의 6문항은 내가 바라는 상대를 묻습니다.
이 사이트는 자체 문항과 8가지 스타일 설명의 원출처입니다. 심리학적 검증이나 실제 궁합을 예측하는 자료가 아닙니다.
정식 MBTI 검사나 심리 진단이 아니며, 실제 관계의 궁합이나 결혼을 예측하지 않아요.

## 저장과 공유
진행 중 답변은 이 탭에 잠시 저장해요.
공개 유형 페이지에는 개인의 답변, 성향 점수, 원하는 상대에 대한 개인 결과를 포함하지 않습니다.
`;
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
