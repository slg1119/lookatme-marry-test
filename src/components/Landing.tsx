import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, BookOpen } from "lucide-react";
import { Illustration } from "./Illustration";
import { Faq, StyleTiles } from "./DesignParts";
import { PROFILES, type Profile } from "../lib/quiz";
import type { readSession } from "../lib/session";

const dimensions = [
  {
    label: "우리의 일상",
    left: "익숙한 편안함",
    right: "새로운 경험",
    text: "늘 가던 카페도, 처음 걷는 동네도. 내가 좋아하는 하루의 리듬을 알아봐요.",
  },
  {
    label: "둘 사이의 거리",
    left: "함께하는 시간",
    right: "각자의 시간",
    text: "같이 있을 때의 즐거움과 혼자만의 여유. 우리에게 편안한 거리를 생각해 봐요.",
  },
  {
    label: "마음을 나누는 법",
    left: "먼저 공감하기",
    right: "함께 해결하기",
    text: "충분히 들어주는 말, 부담을 덜어주는 행동. 내가 바라는 다정함을 찾아요.",
  },
];

export function Landing({
  onStart,
  onResume,
  saved,
  onPreview,
}: {
  onStart: () => void;
  onResume: () => void;
  saved: ReturnType<typeof readSession>;
  onPreview: (p: Profile) => void;
}) {
  const p = PROFILES[0];
  return (
    <>
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            나의 결혼 스타일 테스트
          </p>
          <h1 id="hero-title">
            어떤 사람과,
            <br />
            어떤 매일을
            <br />
            <em>함께할까요?</em>
          </h1>
          <p className="hero-description">
            설레는 첫 만남, 그다음의 우리.
            <br />
            12개의 작은 질문으로
            <br className="mobile-only" /> 나의 결혼 스타일을 만나보세요.
          </p>
          <div className="hero-actions">
            <button className="button primary" onClick={onStart}>
              나의 결혼상대 알아보기
              <ArrowRight size={20} />
            </button>
            <div className="hero-meta">
              <span>
                <Clock3 size={16} />약 3분
              </span>
              <span>
                <BookOpen size={16} />
                12개의 질문
              </span>
              <span>가입 없이, 가볍게</span>
            </div>
            {!!saved?.answers.length && (
              <button className="resume-link" onClick={onResume}>
                {saved.complete
                  ? "지난 결과 다시 보기"
                  : `${saved.answers.length}개의 답변이 남아 있어요. 이어서 하기`}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
        <figure className="hero-art">
          <Link className="hero-result" href={`/type/${p.id}`}>
            <div className="hero-art-heading">
              <span>우리가 함께할 보통날</span>
              <span>01 / 08</span>
            </div>
            <div className="hero-illustration">
              <Illustration typeId={p.id} />
            </div>
            <div className="hero-caption">
              <div>
                <span className="preview-label">이런 결혼을 꿈꾼다면</span>
                <h2>{p.name}</h2>
                <p>{p.tagline}</p>
              </div>
              <span className="round-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>
          <figcaption className="art-footnote">
            여덟 가지 이야기 중, 당신의 이야기는 무엇일까요?
          </figcaption>
        </figure>
      </section>
      <section className="intro-band" id="about">
        <div className="page-width intro-inner">
          <p>
            좋아하는 사람에서,
            <br />
            <strong>함께 살고 싶은 사람으로.</strong>
          </p>
          <div className="intro-step">
            <span className="step-index">01—06</span>
            <div>
              <strong>먼저, 나의 보통날</strong>
              <span>내가 편안해지는 생활과 마음</span>
            </div>
          </div>
          <span className="intro-arrow">
            <ArrowRight size={20} />
          </span>
          <div className="intro-step">
            <span className="step-index">07—12</span>
            <div>
              <strong>그리고, 내가 바라는 당신</strong>
              <span>곁에 있을 사람에게 바라는 모습</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="styles-section page-width section-space"
        id="types"
        aria-labelledby="styles-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">여덟 가지, 저마다의 행복</p>
            <h2 id="styles-title">
              우리의 행복은,
              <br className="mobile-only" /> 어떤 모양일까요?
            </h2>
          </div>
          <p>
            같은 사랑도, 살아가는 모습은 다르니까.
            <br />
            마음이 가는 이야기를 먼저 만나보세요.
          </p>
        </div>
        <StyleTiles onPreview={onPreview} />
      </section>
      <section className="dimensions-section">
        <div className="page-width dimensions-layout">
          <div className="dimensions-intro">
            <p className="eyebrow">마음을 이해하는 세 가지 방향</p>
            <h2>
              거창한 이상형보다,
              <br />
              우리의 <em>작은 일상.</em>
            </h2>
            <p>
              누가 더 좋은 사람인지 정하는 대신,
              <br />
              어떤 순간에 편안해지는지 살펴봐요.
              <br />
              나의 모습과 바라는 상대는 달라도 괜찮아요.
            </p>
            <Link className="text-link" href="/about">
              테스트 자세히 알아보기
              <ArrowRight size={18} />
            </Link>
            <div className="paired-cups" aria-hidden="true">
              <svg viewBox="0 0 220 120" width="220" height="120">
                <path d="M30 28h58v43q0 27-29 27T30 71Z" fill="#c64c65" />
                <path
                  d="M88 41h12q28 0 11 28l-23 7"
                  fill="none"
                  stroke="#c64c65"
                  strokeWidth="8"
                />
                <path d="M139 28h47v43q0 27-24 27t-23-27Z" fill="#83957a" />
                <path
                  d="M186 40h9q23 0 12 27l-21 7"
                  fill="none"
                  stroke="#83957a"
                  strokeWidth="8"
                />
                <path
                  d="M54 6v10m109-10v10"
                  stroke="#ab969a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path d="M17 106h195" stroke="#e2c8ce" strokeWidth="3" />
              </svg>
            </div>
          </div>
          <div className="dimensions-list">
            {dimensions.map((a, i) => (
              <article className="dimension" key={a.label}>
                <span className="dimension-number">0{i + 1}</span>
                <div>
                  <h3>{a.label}</h3>
                  <p>{a.text}</p>
                  <div className="dimension-scale">
                    <span>{a.left}</span>
                    <i aria-hidden="true" />
                    <span>{a.right}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="conversation-teaser page-width section-space">
        <div className="quote-art">
          <Illustration typeId={PROFILES[1].id} />
        </div>
        <div className="teaser-copy">
          <p className="eyebrow">결과는, 대화의 시작이니까</p>
          <h2>
            “함께 살며 꼭 만들고 싶은
            <br />
            작은 습관이 있어요?”
          </h2>
          <p>
            나의 스타일과 바라는 동반자,
            <br />
            그리고 둘이 함께 나눌 세 가지 질문.
            <br />
            조금 더 깊은 대화가 시작될 거예요.
          </p>
          <div className="teaser-caption">
            <span>일상의 단짝</span>유형에서 만나는 대화 질문
          </div>
        </div>
      </section>
      <section
        className="faq-section page-width section-space"
        aria-labelledby="faq-title"
      >
        <div>
          <p className="eyebrow">시작하기 전, 잠깐</p>
          <h2 id="faq-title">
            궁금한 마음도
            <br />
            가볍게 풀고 가요.
          </h2>
          <Link className="text-link" href="/about">
            더 자세한 안내
            <ArrowRight size={18} />
          </Link>
        </div>
        <Faq />
      </section>
      <section className="ending-section">
        <div className="page-width ending-inner">
          <p className="eyebrow">조금 더 나다운 사랑을 위해</p>
          <h2>
            우리의 이야기를 시작하기 전에,
            <br />내 마음부터 들여다볼까요?
          </h2>
          <p>정답은 없어요. 조금 더 나다운 쪽을 골라주세요.</p>
          <button className="button primary" onClick={onStart}>
            3분이면 충분해요
            <ArrowRight size={20} />
          </button>
          <span className="ending-note">약 3분 · 12개의 작은 질문</span>
        </div>
      </section>
    </>
  );
}
