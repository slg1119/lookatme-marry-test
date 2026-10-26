import { QUESTIONS } from "./quiz";

const KEY = "marry-test:v1";
export type SavedSession = {
  answers: number[];
  step: number;
  complete: boolean;
  submissionId?: string;
};

export function readSession(): SavedSession | null {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (
      !parsed ||
      !Array.isArray(parsed.answers) ||
      parsed.answers.length > QUESTIONS.length
    )
      return null;
    if (
      !parsed.answers.every(
        (value: unknown, i: number) =>
          Number.isInteger(value) &&
          (value as number) >= 0 &&
          (value as number) < QUESTIONS[i].options.length,
      )
    )
      return null;
    if (
      !Number.isInteger(parsed.step) ||
      parsed.step < 0 ||
      parsed.step >= QUESTIONS.length ||
      parsed.step > parsed.answers.length
    )
      return null;
    return {
      answers: parsed.answers,
      step: parsed.step,
      complete:
        parsed.complete === true && parsed.answers.length === QUESTIONS.length,
      submissionId:
        typeof parsed.submissionId === "string" &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          parsed.submissionId,
        )
          ? parsed.submissionId
          : undefined,
    };
  } catch {
    return null;
  }
}

export function saveSession(session: SavedSession) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* The test also works when storage is unavailable. */
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* No storage is also a clean session. */
  }
}
