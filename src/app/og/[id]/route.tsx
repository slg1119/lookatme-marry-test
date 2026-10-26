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
  const [regular, bold, css, scene] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/pretendard-og-regular.otf")),
    readFile(join(process.cwd(), "src/assets/pretendard-og-bold.otf")),
    readFile(join(process.cwd(), "src/tokens.css"), "utf8"),
    readFile(join(process.cwd(), "src/assets/marry-social-scene-v1.png")),
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
        padding: "56px 60px",
        background: token("--color-paper"),
        color: ink,
        fontFamily: family,
      }}
    >
      <img
        alt=""
        src={`data:image/png;base64,${scene.toString("base64")}`}
        width={546}
        height={546}
        style={{ position: "absolute", right: 28, top: 42, borderRadius: 40 }}
      />
      <div
        style={{
          display: "flex",
          color: accent,
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 700 }}>marry test.</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 520,
          flex: 1,
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: profile ? 64 : 80,
            lineHeight: 1.2,
            fontWeight: 700,
            whiteSpace: "pre-wrap",
          }}
        >
          {profile ? profile.name : "나와 잘 살\n사람은?"}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            color: token("--color-ink-2"),
            maxWidth: 490,
          }}
        >
          {profile
            ? profile.tagline
            : "12개의 질문으로 알아보는\n나의 결혼 스타일과 동반자"}
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
        <span>{profile ? profile.englishName : "결혼 성향 테스트"}</span>
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
