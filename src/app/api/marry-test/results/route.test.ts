import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { POST } from "./route";

const body = {
  submissionId: "ec86b91f-0bf0-4874-91c0-395136690447",
  quizVersion: "marry-v1",
  answers: Array(12).fill(0),
};
const request = (
  value: unknown = body,
  headers: Record<string, string> = { "content-type": "application/json" },
) =>
  new Request("http://localhost:4173/api/marry-test/results", {
    method: "POST",
    headers,
    body: JSON.stringify(value),
  });
beforeEach(() => vi.stubEnv("LOOKATME_API_URL", "http://127.0.0.1:3017"));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

it("forwards only the validated payload to the configured NestJS service without cookies or auth", async () => {
  const fetch = vi
    .fn()
    .mockResolvedValue(Response.json({ id: "stored" }, { status: 201 }));
  vi.stubGlobal("fetch", fetch);
  const response = await POST(
    request(body, {
      "content-type": "application/json",
      cookie: "secret=not-forwarded",
      authorization: "Bearer not-forwarded",
    }),
  );
  expect(response.status).toBe(201);
  expect(response.headers.get("cache-control")).toBe("no-store");
  const [url, options] = fetch.mock.calls[0];
  expect(url.toString()).toBe("http://127.0.0.1:3017/marry-test/results");
  expect(options.headers).toEqual({ "Content-Type": "application/json" });
  expect(JSON.parse(options.body)).toEqual(body);
  expect(options.redirect).toBe("error");
});
it.each([
  { answers: Array(11).fill(0) },
  { answers: ["1", ...Array(11).fill(0)] },
  { answers: [4, ...Array(11).fill(0)] },
  { profileId: "forged" },
  { submissionId: "bad" },
  { quizVersion: "marry-v2" },
])("rejects invalid input before contacting API %#", async (patch) => {
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  expect((await POST(request({ ...body, ...patch }))).status).toBe(400);
  expect(fetch).not.toHaveBeenCalled();
});
it("rejects non-JSON and oversized payloads", async () => {
  expect(
    (await POST(request(body, { "content-type": "text/plain" }))).status,
  ).toBe(415);
  expect((await POST(request({ extra: "x".repeat(4096) }))).status).toBe(413);
});
it.each([400, 409, 429, 500])(
  "maps API error %i without exposing its body",
  async (status) => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          Response.json({ message: "internal detail" }, { status }),
        ),
    );
    const response = await POST(request());
    expect(response.status).toBe(status === 500 ? 502 : status);
    expect(await response.text()).not.toContain("internal detail");
  },
);
it("reports an upstream connection failure", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockRejectedValue(new Error("connect refused")),
  );
  expect((await POST(request())).status).toBe(502);
});
it("requires an explicit API URL in production", async () => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("LOOKATME_API_URL", "");
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  expect((await POST(request())).status).toBe(503);
  expect(fetch).not.toHaveBeenCalled();
});
