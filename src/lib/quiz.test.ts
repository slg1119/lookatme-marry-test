import { describe, expect, it } from "vitest";
import {
  calculateResult,
  getProfile,
  PROFILES,
  QUESTIONS,
  type Axis,
} from "./quiz";

const fullAnswers = (option = 0) =>
  Array<number>(QUESTIONS.length).fill(option);

describe("question and profile content", () => {
  it("has 12 unique questions, four choices each, and two questions per axis and perspective", () => {
    expect(QUESTIONS).toHaveLength(12);
    expect(new Set(QUESTIONS.map((question) => question.id)).size).toBe(12);
    expect(
      QUESTIONS.slice(0, 6).every(
        (question) => question.perspective === "self",
      ),
    ).toBe(true);
    expect(
      QUESTIONS.slice(6).every(
        (question) => question.perspective === "partner",
      ),
    ).toBe(true);

    for (const perspective of ["self", "partner"]) {
      for (const axis of ["pace", "closeness", "care"]) {
        expect(
          QUESTIONS.filter(
            (question) =>
              question.perspective === perspective && question.axis === axis,
          ),
        ).toHaveLength(2);
      }
    }
    for (const question of QUESTIONS) {
      expect(question.options).toHaveLength(4);
      expect(question.options.map((option) => option.score)).toEqual([
        -3, -1, 1, 3,
      ]);
    }
  });

  it("has eight unique, retrievable profiles and safely handles an unknown id", () => {
    expect(PROFILES).toHaveLength(8);
    expect(new Set(PROFILES.map((profile) => profile.id)).size).toBe(8);
    for (const profile of PROFILES) {
      expect(getProfile(profile.id)).toBe(profile);
      expect(profile.conversation).toHaveLength(3);
    }
    expect(getProfile("unknown")).toBeUndefined();
    expect(getProfile("__proto__")).toBeUndefined();
  });
});

describe("calculateResult", () => {
  it("makes all eight profiles reachable through the three independent self axes", () => {
    const reached = new Set<string>();
    for (let bits = 0; bits < 8; bits += 1) {
      const positive: Record<Axis, boolean> = {
        pace: Boolean(bits & 4),
        closeness: Boolean(bits & 2),
        care: Boolean(bits & 1),
      };
      const answers = QUESTIONS.map((question) =>
        positive[question.axis] ? 3 : 0,
      );
      const result = calculateResult(answers);
      reached.add(result.profile.id);
      expect(result.profile).toBe(PROFILES[bits]);
    }
    expect(reached.size).toBe(8);
  });

  it("normalizes both sides to the inclusive -100 to 100 scale", () => {
    expect(calculateResult(fullAnswers(0)).self).toEqual({
      pace: -100,
      closeness: -100,
      care: -100,
    });
    expect(calculateResult(fullAnswers(3)).partner).toEqual({
      pace: 100,
      closeness: 100,
      care: 100,
    });
    expect(calculateResult(fullAnswers(1)).self).toEqual({
      pace: -33,
      closeness: -33,
      care: -33,
    });
    expect(calculateResult(fullAnswers(2)).partner).toEqual({
      pace: 33,
      closeness: 33,
      care: 33,
    });
  });

  it("preserves exact ties as neutral and discloses the representative type fallback", () => {
    const answers = QUESTIONS.map((_, index) => (index % 2 === 0 ? 0 : 3));
    const result = calculateResult(answers);
    expect(result.self).toEqual({ pace: 0, closeness: 0, care: 0 });
    expect(result.partner).toEqual({ pace: 0, closeness: 0, care: 0 });
    expect(result.profile.id).toBe("everyday-soulmate");
    expect(result.note).toContain("균형");
    expect(result.note).toContain("대표 표현");
    expect(result.partnerTraits).toEqual([
      "편안한 일상과 새로운 경험을 상황에 맞게 나누는 사람",
      "함께하는 시간과 혼자만의 시간을 유연하게 조율하는 사람",
      "마음을 들어주는 일과 구체적인 도움을 함께 챙기는 사람",
    ]);
  });

  it("changes desired partner traits without changing the self profile or self scores", () => {
    const first = calculateResult(fullAnswers(0));
    const second = calculateResult(
      QUESTIONS.map((question) => (question.perspective === "self" ? 0 : 3)),
    );
    expect(second.profile).toBe(first.profile);
    expect(second.self).toEqual(first.self);
    expect(second.partner).toEqual({ pace: 100, closeness: 100, care: 100 });
    expect(
      second.partnerTraits.every(
        (trait, index) => trait !== first.partnerTraits[index],
      ),
    ).toBe(true);
  });

  it("changes the self profile without changing desired partner scores or traits", () => {
    const first = calculateResult(fullAnswers(0));
    const second = calculateResult(
      QUESTIONS.map((question) => (question.perspective === "self" ? 3 : 0)),
    );
    expect(second.profile.id).not.toBe(first.profile.id);
    expect(second.partner).toEqual(first.partner);
    expect(second.partnerTraits).toEqual(first.partnerTraits);
  });

  it.each([
    { answers: [] },
    { answers: [0] },
    { answers: Array<number>(11).fill(0) },
    { answers: Array<number>(13).fill(0) },
  ])("rejects incomplete or oversized answers: $answers", ({ answers }) => {
    expect(() => calculateResult(answers)).toThrow(RangeError);
  });

  it.each([
    -1,
    4,
    0.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    "0",
    null,
    undefined,
    {},
    [],
    "__proto__",
  ])("rejects an invalid answer index: %j", (invalid) => {
    const answers = fullAnswers();
    answers[4] = invalid as number;
    expect(() => calculateResult(answers)).toThrow("5번");
  });

  it("rejects a sparse array, even when its length is correct", () => {
    expect(() => calculateResult(new Array<number>(12))).toThrow(RangeError);
  });

  it("rejects non-arrays from untrusted saved data", () => {
    for (const input of [null, undefined, "000000000000", { length: 12 }]) {
      expect(() => calculateResult(input as number[])).toThrow(RangeError);
    }
  });

  it("does not mutate answers and returns independent conversation arrays", () => {
    const answers = fullAnswers();
    const before = [...answers];
    const result = calculateResult(answers);
    result.conversation.pop();
    expect(answers).toEqual(before);
    expect(calculateResult(answers).conversation).toHaveLength(3);
    expect(result.profile.conversation).toHaveLength(3);
  });

  it("frames the result as a conversation guide without predicting compatibility", () => {
    expect(calculateResult(fullAnswers()).note).toContain(
      "공식 MBTI 검사나 심리 진단이 아니며",
    );
    expect(calculateResult(fullAnswers()).note).toContain(
      "결혼의 성공을 예측하지 않아요",
    );
  });
});
