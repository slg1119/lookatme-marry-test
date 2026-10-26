import { QUESTIONS } from "./quiz";

const KEY = "marry-test:v1";
export type SavedSession = {
  answers: number[];
  step: number;
  complete: boolean;
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
