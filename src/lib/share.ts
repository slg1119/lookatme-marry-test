import type { Profile } from "./quiz";

export function resultUrl(profile: Profile): string {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.pathname = `/type/${profile.id}`;
  return url.toString();
}

export async function shareResult(
  profile: Profile,
): Promise<"shared" | "copied" | "cancelled" | "manual"> {
  const url = resultUrl(profile);
  if (navigator.share) {
    try {
      await navigator.share({
        title: `나의 결혼 스타일은 ${profile.name}`,
        text: `${profile.tagline}\n당신은 어떤 사람과, 어떤 매일을 함께하고 싶나요?`,
        url,
      });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError")
        return "cancelled";
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "manual";
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number,
): number {
  let line = "";
  for (const char of text) {
    if (ctx.measureText(line + char).width > width) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else line += char;
  }
  if (line) ctx.fillText(line, x, y);
  return y + lineHeight;
}

export async function downloadCard(
  profile: Profile,
  illustration: SVGSVGElement | null,
): Promise<void> {
  const theme = getComputedStyle(document.documentElement);
  const color = (name: string) => theme.getPropertyValue(name).trim();
  const font = theme.getPropertyValue("--font-body").trim();
  await Promise.all([
    document.fonts.load(`720 60px ${font}`, profile.name),
    document.fonts.load(`800 34px ${font}`, "LOOK AT ME"),
    document.fonts.load(
      `450 30px ${font}`,
      `${profile.tagline}${profile.tags.join("")}나의 결혼 스타일둘의 시작은, 나를 아는 것부터.`,
    ),
  ]);
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("카드를 만들 수 없는 브라우저예요.");
  ctx.fillStyle = color("--color-paper");
  ctx.fillRect(0, 0, 1080, 1350);
  ctx.strokeStyle = color("--color-rule");
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(40, 40, 1000, 1270, 24);
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.fillStyle = color("--color-accent");
  ctx.font = `800 34px ${font}`;
  ctx.fillText("LOOK AT ME", 540, 116);
  ctx.font = `450 26px ${font}`;
  ctx.fillStyle = color("--color-muted");
  ctx.fillText("나의 결혼 스타일", 540, 166);
  if (illustration) {
    const source = new XMLSerializer().serializeToString(illustration);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      // Preserve the illustration's 600:480 aspect ratio in the export.
      ctx.drawImage(img, 120, 212, 840, 672);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  ctx.fillStyle = color("--color-ink");
  ctx.font = `720 60px ${font}`;
  const end = wrapText(ctx, profile.name, 540, 956, 880, 78);
  ctx.font = `450 30px ${font}`;
  ctx.fillStyle = color("--color-ink-2");
  wrapText(ctx, profile.tagline, 540, end + 8, 840, 46);
  ctx.fillStyle = color("--color-accent");
  ctx.font = `550 25px ${font}`;
  ctx.fillText(profile.tags.join("  ·  "), 540, 1190);
  ctx.strokeStyle = color("--color-rule");
  ctx.beginPath();
  ctx.moveTo(112, 1230);
  ctx.lineTo(968, 1230);
  ctx.stroke();
  ctx.font = `450 24px ${font}`;
  ctx.fillStyle = color("--color-muted");
  ctx.fillText("둘의 시작은, 나를 아는 것부터.", 540, 1276);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (value) =>
        value ? resolve(value) : reject(new Error("카드 저장에 실패했어요.")),
      "image/png",
    ),
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `marry-test-${profile.id}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
