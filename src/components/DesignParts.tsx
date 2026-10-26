import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Illustration } from "./Illustration";
import { PROFILES, type Profile } from "../lib/quiz";
import { TEST_FAQ } from "../lib/test-guide";

export function BrandMark() {
  return (
    <>
      <svg
        className="brand-symbol"
        viewBox="0 0 36 32"
        width="36"
        height="32"
        aria-hidden="true"
      >
        <path
          d="M17 25C11 22 2 16 2 9 2-1 15-1 18 7 21-1 34-1 34 9c0 7-9 13-15 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path d="M18 9v14" stroke="currentColor" strokeWidth="2.4" />
      </svg>
      <span>
        LOOK AT ME<small>마음을 잇는 작은 발견</small>
      </span>
    </>
  );
}

export function StyleTiles({
  onPreview,
}: {
  onPreview?: (profile: Profile) => void;
}) {
  return (
    <div className="styles-grid">
      {PROFILES.map((p, i) => {
        const content = (
          <>
            <div className="style-art">
              <Illustration typeId={p.id} />
              <span className="style-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="style-copy">
              <div className="style-title">
                <h3>{p.name}</h3>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
              <p>{p.tagline}</p>
            </div>
          </>
        );
        return onPreview ? (
          <button
            className="style-tile type-card"
            key={p.id}
            onClick={() => onPreview(p)}
          >
            {content}
          </button>
        ) : (
          <Link className="style-tile" href={`/type/${p.id}`} key={p.id}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}

export function Faq({ full = false }: { full?: boolean }) {
  return (
    <div className="faq-list">
      {TEST_FAQ.slice(0, full ? TEST_FAQ.length : 4).map(
        ({ question, answer }) => (
          <details key={question}>
            <summary>
              {question}
              <Plus size={20} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ),
      )}
    </div>
  );
}
