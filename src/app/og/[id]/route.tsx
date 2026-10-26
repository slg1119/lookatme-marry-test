import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getProfile, PROFILES } from "../../../lib/quiz";
import { Illustration } from "../../../components/Illustration";

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
        padding: "72px 76px",
        background: token("--color-paper"),
        color: ink,
        fontFamily: family,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 36,
          top: 36,
          width: 1128,
          height: 558,
          border: `2px solid ${token("--color-rule")}`,
          borderRadius: 24,
        }}
      />
      <div
        style={{ display: "flex", position: "absolute", right: 76, top: 112 }}
      >
        <Illustration
          scene={profile?.scene ?? "home"}
          typeId={profile?.id ?? "everyday-soulmate"}
          width={480}
          height={384}
        />
      </div>
      <div
        style={{
          display: "flex",
          color: accent,
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 700 }}>LOOK AT ME</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 510,
          flex: 1,
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", color: accent, fontSize: 22 }}>
          {profile ? "나의 결혼 스타일" : "나의 결혼 스타일 테스트"}
        </div>
        <div
          style={{
            fontSize: profile ? 54 : 58,
            lineHeight: 1.3,
            fontWeight: 700,
            whiteSpace: "pre-wrap",
          }}
        >
          {profile ? profile.name : "어떤 사람과,\n어떤 매일을\n함께할까요?"}
        </div>
        <div
          style={{
            fontSize: 26,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            color: token("--color-ink-2"),
            maxWidth: 490,
          }}
        >
          {profile ? profile.tagline : "약 3분 · 12개의 작은 질문"}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: accent,
          fontSize: 24,
        }}
      >
        <span>
          {profile
            ? "어떤 사람과, 어떤 매일을 함께할까요?"
            : "둘의 시작은, 나를 아는 것부터."}
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
