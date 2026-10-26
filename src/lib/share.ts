import type { Profile } from "./quiz";

export function resultUrl(profile: Profile): string {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = `/type/${profile.id}`;
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
  await Promise.all([
    document.fonts.load('500 57px "Noto Serif KR"', profile.name),
    document.fonts.load('500 36px "DM Sans Variable"', "marry test"),
    document.fonts.load(
      '30px "Pretendard Variable"',
      `${profile.tagline}${profile.tags.join("")}나와 잘 살 사람을 알아가는 작은 여행당신은 어떤 매일을 꿈꾸나요?`,
    ),
  ]);
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("카드를 만들 수 없는 브라우저예요.");
  ctx.fillStyle = "#f8f5ed";
  ctx.fillRect(0, 0, 1080, 1350);
  ctx.strokeStyle = "#dbd5c8";
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, 1000, 1270);
  ctx.textAlign = "center";
  ctx.fillStyle = "#753d45";
  ctx.font = '500 36px "DM Sans Variable"';
  ctx.fillText("marry test", 540, 115);
  ctx.font = '24px "Pretendard Variable"';
  ctx.fillStyle = "#76766a";
  ctx.fillText("나와 잘 살 사람을 알아가는 작은 여행", 540, 165);
  ctx.fillStyle = profile.color;
  ctx.beginPath();
  ctx.roundRect(120, 210, 840, 565, [260, 260, 30, 30]);
  ctx.fill();
  if (illustration) {
    const source = new XMLSerializer().serializeToString(illustration);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      ctx.drawImage(img, 120, 200, 840, 630);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  ctx.fillStyle = "#727568";
  ctx.font = '24px "DM Sans Variable"';
  ctx.fillText(profile.englishName.toUpperCase(), 540, 835);
  ctx.fillStyle = "#343b32";
  ctx.font = '500 57px "Noto Serif KR"';
  const end = wrapText(ctx, profile.name, 540, 925, 880, 82);
  ctx.font = '30px "Pretendard Variable"';
  ctx.fillStyle = "#606658";
  wrapText(ctx, profile.tagline, 540, end + 26, 820, 48);
  ctx.fillStyle = "#753d45";
  ctx.font = '25px "Pretendard Variable"';
  ctx.fillText(profile.tags.map((t) => `#${t}`).join("   "), 540, 1175);
  ctx.font = '22px "Pretendard Variable"';
  ctx.fillStyle = "#777a6e";
  ctx.fillText("당신은 어떤 매일을 꿈꾸나요? · marry test", 540, 1260);
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
