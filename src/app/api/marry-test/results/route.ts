import { QUIZ_CONTRACT } from "../../../../lib/quiz-contract";

export const runtime = "nodejs";
const headers = { "Cache-Control": "no-store" };
const failure = (status: number) =>
  Response.json(
    { message: "결과를 저장하지 못했어요. 잠시 후 다시 시도해주세요." },
    { status, headers },
  );

export async function POST(request: Request): Promise<Response> {
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return failure(415);
  const text = await request.text();
  if (new TextEncoder().encode(text).length > 4096) return failure(413);
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return failure(400);
  }
  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).sort().join(",") !== "answers,quizVersion,submissionId" ||
    typeof body.submissionId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      body.submissionId,
    ) ||
    body.quizVersion !== QUIZ_CONTRACT.version ||
    !Array.isArray(body.answers) ||
    body.answers.length !== 12 ||
    !body.answers.every(
      (v: unknown) =>
        Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 3,
    )
  )
    return failure(400);

  const base =
    process.env.LOOKATME_API_URL ||
    (process.env.NODE_ENV === "development" ? "http://127.0.0.1:3017" : "");
  if (!base) return failure(503);
  try {
    const endpoint = new URL(`${base.replace(/\/$/, "")}/marry-test/results`);
    if (
      !["http:", "https:"].includes(endpoint.protocol) ||
      endpoint.username ||
      endpoint.password
    )
      return failure(503);
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (upstream.status !== 201)
      return failure(
        [400, 409, 429].includes(upstream.status) ? upstream.status : 502,
      );
    return Response.json(await upstream.json(), { status: 201, headers });
  } catch {
    return failure(502);
  }
}
