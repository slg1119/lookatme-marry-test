"""Regenerate the small, OFL-licensed Pretendard subset used by social images.

Run with Python fonttools installed, after changing quiz names or OG copy.
The application and production build do not require Python.
"""
from pathlib import Path
from fontTools import subset

root = Path(__file__).resolve().parent.parent
text = "".join((root / path).read_text() for path in [
    "src/lib/quiz.ts", "src/app/og/[id]/route.tsx"
])
out = root / "src/assets"
out.mkdir(parents=True, exist_ok=True)
for weight in ["Regular", "Bold"]:
    font = subset.load_font(str(root / f"node_modules/pretendard/dist/public/static/Pretendard-{weight}.otf"), subset.Options())
    sub = subset.Subsetter()
    sub.populate(text=text)
    sub.subset(font)
    subset.save_font(font, str(out / f"pretendard-og-{weight.lower()}.otf"), subset.Options())
(out / "Pretendard-LICENSE.txt").write_text((root / "node_modules/pretendard/dist/LICENSE.txt").read_text())
