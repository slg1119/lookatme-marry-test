import { afterEach, describe, expect, it, vi } from "vitest";
import { submitResult } from "./result-api";
import { calculateResult, PROFILES, QUESTIONS } from "./quiz";
import { QUIZ_CONTRACT } from "./quiz-contract";

const submissionId = "ec86b91f-0bf0-4874-91c0-395136690447";
const answers = [...Array(6).fill(0), ...Array(6).fill(3)];
function receipt() {
  const result = calculateResult(answers);
  return {
    id: "0cc2b0c3-aab1-4c7a-a6cf-6ca9ada63a65",
    submissionId,
    quizVersion: "marry-v1",
    createdAt: "2026-10-26T03:00:00.000Z",
    result: {
      profileId: result.profile.id,
      self: result.self,
      partner: result.partner,
    },
  };
}
afterEach(() => vi.unstubAllGlobals());
describe("result storage API", () => {
  it("sends only versioned answers and a stable submission key, without credentials", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify(receipt()), { status: 201 }),
      );
    vi.stubGlobal("fetch", fetch);
    expect(await submitResult(submissionId, answers)).toMatchObject({
      submissionId,
    });
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("/api/marry-test/results");
    expect(JSON.parse(options.body)).toEqual({
      submissionId,
      quizVersion: "marry-v1",
      answers,
    });
    expect(options.credentials).toBe("omit");
  });
  it.each([400, 409, 500])(
    "does not report success on HTTP %i",
    async (status) => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(new Response("{}", { status })),
      );
      await expect(submitResult(submissionId, answers)).rejects.toThrow();
    },
  );
  it.each([
    { submissionId: "another-submission" },
    { quizVersion: "marry-v2" },
    { id: "not-an-id" },
    { createdAt: "invalid" },
    {
      result: {
        profileId: "everyday-soulmate",
        self: { pace: 0, closeness: 0, care: 0 },
        partner: { pace: 0, closeness: 0, care: 0 },
      },
    },
  ])("requires a matching server receipt %#", async (patch) => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ ...receipt(), ...patch }), {
            status: 201,
          }),
        ),
    );
    await expect(submitResult(submissionId, answers)).rejects.toThrow();
  });
  it("propagates network failure for explicit retry", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    );
    await expect(submitResult(submissionId, answers)).rejects.toThrow();
  });
});
describe("immutable marry-v1 contract", () => {
  it("matches all displayed questions, option scores, order and profile IDs", () => {
    expect(
      QUESTIONS.map((q) => ({
        id: q.id,
        axis: q.axis,
        perspective: q.perspective,
        scores: q.options.map((o) => o.score),
      })),
    ).toEqual(QUIZ_CONTRACT.questions);
    expect(PROFILES.map((p) => p.id)).toEqual(QUIZ_CONTRACT.profileIds);
  });
});
