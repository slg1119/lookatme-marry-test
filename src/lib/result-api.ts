import { calculateResult } from "./quiz";
import { QUIZ_CONTRACT } from "./quiz-contract";

export type ResultReceipt = {
  id: string;
  submissionId: string;
  quizVersion: string;
  createdAt: string;
};

export async function submitResult(
  submissionId: string,
  answers: number[],
  signal?: AbortSignal,
): Promise<ResultReceipt> {
  const base = "/api";
  const expected = calculateResult(answers);
  const response = await fetch(`${base}/marry-test/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "omit",
    body: JSON.stringify({
      submissionId,
      quizVersion: QUIZ_CONTRACT.version,
      answers,
    }),
    signal,
  });
  if (!response.ok)
    throw new Error("결과를 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
  const receipt = await response.json();
  const scoresMatch = (value: unknown, scores: Record<string, number>) =>
    !!value &&
    typeof value === "object" &&
    Object.entries(scores).every(
      ([axis, score]) => (value as Record<string, unknown>)[axis] === score,
    );
  if (
    !receipt ||
    typeof receipt.id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      receipt.id,
    ) ||
    receipt.submissionId !== submissionId ||
    receipt.quizVersion !== QUIZ_CONTRACT.version ||
    typeof receipt.createdAt !== "string" ||
    !Number.isFinite(Date.parse(receipt.createdAt)) ||
    receipt.result?.profileId !== expected.profile.id ||
    !scoresMatch(receipt.result?.self, expected.self) ||
    !scoresMatch(receipt.result?.partner, expected.partner)
  )
    throw new Error("저장 확인을 받지 못했어요. 다시 시도해주세요.");
  return receipt;
}
