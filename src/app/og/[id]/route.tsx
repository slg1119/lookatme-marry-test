import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProfile, PROFILES } from "../../../lib/quiz";

export const runtime = "nodejs";
export const dynamic = "force-static";
export function generateStaticParams() {
  return [{ id: "home" }, ...PROFILES.map(({ id }) => ({ id }))];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const profile = getProfile(id);
  if (id !== "home" && !profile)
    return new Response("Not found", { status: 404 });
  const [regular, bold, css] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/pretendard-og-regular.otf")),
    readFile(join(process.cwd(), "src/assets/pretendard-og-bold.otf")),
    readFile(join(process.cwd(), "src/tokens.css"), "utf8"),
  ]);
  const token = (name: string) => {
    const value = css.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1]?.trim();
    if (!value) throw new Error(`Missing design token: ${name}`);
    return value;
  };
  const family = token("--font-body").split(",")[0].replaceAll('"', "");
  const ink = token("--color-ink");
  const accent = token("--color-accent");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: token("--color-paper-2"),
        color: ink,
        fontFamily: family,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: accent,
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 700 }}>marry test.</span>
        <span style={{ fontSize: 24 }}>나와 잘 살 사람은?</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: profile ? 72 : 64,
            lineHeight: 1.25,
            fontWeight: 700,
            whiteSpace: "pre-wrap",
          }}
        >
          {profile ? profile.name : "어떤 사람과, 어떤 매일을\n함께할까요?"}
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.5 }}>
          {profile
            ? profile.tagline
            : "12개의 질문으로 만나는 나의 결혼 스타일"}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${token("--color-rule")}`,
          paddingTop: 24,
          color: token("--color-ink-2"),
          fontSize: 24,
        }}
      >
        <span>
          {profile ? profile.englishName : "약 3분, 가입 없이 가볍게"}
        </span>
        <span>
          {profile ? "8가지 결혼 스타일" : "내가 바라는 동반자 알아보기"}
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: family, data: regular, weight: 400, style: "normal" },
        { name: family, data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
