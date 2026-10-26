import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Download,
  Heart,
  Link2,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { Illustration } from "./components/Illustration";
import { Modal } from "./components/Modal";
import { calculateResult, getProfile, PROFILES, QUESTIONS } from "./lib/quiz";
import type { Axis, Profile } from "./lib/quiz";
import { clearSession, readSession, saveSession } from "./lib/session";
import { downloadCard, resultUrl, shareResult } from "./lib/share";

type Route = { page: "home" | "quiz" | "result" | "shared"; profile?: Profile };
const MEETING_URL =
  import.meta.env.VITE_MEETING_URL || "https://www.lookatme.my";
const AXES: { id: Axis; label: string; left: string; right: string }[] = [
  {
    id: "pace",
    label: "우리의 일상",
    left: "익숙한 편안함",
    right: "새로운 경험",
  },
  {
    id: "closeness",
    label: "둘 사이의 거리",
    left: "함께하는 시간",
    right: "각자의 시간",
  },
  {
    id: "care",
    label: "마음을 나누는 법",
    left: "먼저 공감하기",
    right: "함께 해결하기",
  },
];

function readRoute(): Route {
  const hash = window.location.hash;
  if (hash === "#/test") return { page: "quiz" };
  if (hash === "#/result") return { page: "result" };
  if (hash.startsWith("#/type/")) {
    const profile = getProfile(hash.slice(7));
    if (profile) return { page: "shared", profile };
  }
  return { page: "home" };
}

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button className="brand" onClick={onClick} aria-label="marry test 홈으로">
      <span className="brand-mark">
        <Heart size={22} strokeWidth={1.6} />
        <Heart size={22} strokeWidth={1.6} />
      </span>
      <span>
        marry <i>test</i>
        <span className="brand-dot">.</span>
      </span>
    </button>
  );
}

function Footer({ onAbout }: { onAbout: () => void }) {
  return (
    <footer className="footer">
      <span className="footer-brand">
        marry test<span>둘의 시작은, 나를 아는 것부터.</span>
      </span>
      <div>
        <button onClick={onAbout}>테스트 안내</button>
        <span>© {new Date().getFullYear()} marry test</span>
      </div>
    </footer>
  );
}

function Landing({
  onStart,
  onResume,
  saved,
  onPreview,
  onAbout,
}: {
  onStart: () => void;
  onResume: () => void;
  saved: ReturnType<typeof readSession>;
  onPreview: (p: Profile) => void;
  onAbout: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="little-star">✳</span> 나와 잘 살 사람을 알아가는
            시간
          </div>
          <h1>
            어떤 사람과,
            <br />
            <span className="underlined">어떤 매일</span>을<br />
            함께할까요<span className="serif-question">?</span>
          </h1>
          <p className="hero-description">
            설레는 첫 만남, 그다음의 우리.
            <br />
            12개의 작은 질문으로
            <br className="mobile-break" /> 나의 결혼 스타일을 만나보세요.
          </p>
          <button className="button primary hero-button" onClick={onStart}>
            나의 결혼상대 알아보기 <ArrowRight size={19} />
          </button>
          <div className="hero-meta">
            <span>
              <Clock3 size={14} />약 3분
            </span>
            <span>
              <BookOpen size={14} />
              12개의 질문
            </span>
            <span>가입 없이, 가볍게</span>
          </div>
          {saved && saved.answers.length > 0 && (
            <button className="resume-link" onClick={onResume}>
              {saved.complete
                ? "지난 결과 다시 보기"
                : `${saved.answers.length}개의 답변이 남아 있어요. 이어서 할까요?`}{" "}
              <ChevronRight size={15} />
            </button>
          )}
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-small-note">a little glimpse of our future</div>
          <div className="art-paper">
            <div className="paper-label">THE EVERYDAY, TOGETHER</div>
            <Illustration scene="home" className="hero-illustration" />
            <div className="paper-caption">
              <span>너와 나의 보통날</span>
              <i>Our ordinary, lovely days.</i>
            </div>
          </div>
          <div className="art-stamp">
            <Heart size={23} strokeWidth={1.3} />
            <span>
              made
              <br />
              for two
            </span>
          </div>
          <div className="art-note">
            <span className="note-pin" />
            <span>
              거창하지 않아도 좋아.
              <br />
              같이 보내는 매일이라면.
            </span>
            <Heart size={17} />
          </div>
          <span className="art-spark spark-one">✳</span>
          <span className="art-spark spark-two">✧</span>
        </div>
      </section>
      <div className="scroll-cue">
        <span>A LITTLE CLOSER TO YOU</span>
        <ArrowDown size={14} />
      </div>
      <section className="about-section page-width" id="about">
        <div className="about-intro">
          <span className="eyebrow">MORE THAN A TYPE</span>
          <h2>
            좋아하는 사람에서,
            <br />
            함께 살고 싶은 사람으로.
          </h2>
          <p>
            우리가 궁금한 건 네 글자보다
            <br />
            조금 더 가까운, 당신의 일상이에요.
          </p>
          <button className="text-button" onClick={onAbout}>
            이 테스트가 궁금하다면 <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="about-points">
          <article>
            <span className="point-number">01</span>
            <div>
              <h3>내가 편안해지는 관계</h3>
              <p>
                어떤 주말을 보내고, 어떤 말에 위로받는지.
                <br />
                나도 몰랐던 마음의 취향을 알아봐요.
              </p>
            </div>
          </article>
          <article>
            <span className="point-number">02</span>
            <div>
              <h3>내가 바라는 동반자</h3>
              <p>
                나와 같은 사람을 원할 수도, 다를 수도 있죠.
                <br />
                나의 모습과 원하는 상대를 따로 살펴봐요.
              </p>
            </div>
          </article>
          <article>
            <span className="point-number">03</span>
            <div>
              <h3>첫 만남이 조금 더 깊어지도록</h3>
              <p>
                “취미가 뭐예요?” 다음에 나눌 이야기.
                <br />
                당신의 결과에 어울리는 대화 질문도 준비했어요.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="types-section" id="types">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EIGHT WAYS TO BE TOGETHER</span>
              <h2>우리의 행복은, 어떤 모양일까요?</h2>
            </div>
            <span className="section-note">8가지 결혼 스타일 미리보기</span>
          </div>
          <div className="type-grid">
            {(showAll ? PROFILES : PROFILES.slice(0, 4)).map((profile, i) => (
              <button
                className="type-card"
                key={profile.id}
                onClick={() => onPreview(profile)}
                style={{ "--card-color": profile.color } as React.CSSProperties}
              >
                <div className="type-art">
                  <span className="type-index">0{i + 1}</span>
                  <Illustration scene={profile.scene} compact />
                  <span className="type-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <span className="type-english">{profile.englishName}</span>
                <h3>{profile.name}</h3>
                <p>{profile.tagline}</p>
              </button>
            ))}
          </div>
          <button
            className="text-button all-types"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "접어두기" : "8가지 스타일 모두 보기"}{" "}
            <ArrowDown
              size={15}
              style={{ transform: showAll ? "rotate(180deg)" : undefined }}
            />
          </button>
        </div>
      </section>
      <section className="bottom-cta page-width">
        <span className="cta-doodle" aria-hidden="true">
          ♡
        </span>
        <div>
          <span className="eyebrow">YOUR NEXT CHAPTER</span>
          <h2>
            우리의 이야기를 시작하기 전에,
            <br />내 마음부터 들여다볼까요?
          </h2>
        </div>
        <button className="button cream" onClick={onStart}>
          3분이면 충분해요 <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}

function Quiz({
  answers,
  step,
  onChoose,
  onNext,
  onPrevious,
  onExit,
}: {
  answers: number[];
  step: number;
  onChoose: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onExit: () => void;
}) {
  const question = QUESTIONS[step];
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);
  return (
    <main className="quiz-page page-width">
      <div className="quiz-top">
        <button className="text-button" onClick={onExit}>
          <ArrowLeft size={15} /> 잠시 쉬어가기
        </button>
        <span className="quiz-count">
          <strong>{String(step + 1).padStart(2, "0")}</strong> /{" "}
          {QUESTIONS.length}
        </span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="테스트 진행"
        aria-valuemin={0}
        aria-valuemax={QUESTIONS.length}
        aria-valuenow={step + 1}
      >
        {QUESTIONS.map((q, i) => (
          <span key={q.id} className={i <= step ? "filled" : ""} />
        ))}
      </div>
      <div className="quiz-layout">
        <aside className="quiz-scene">
          <div className="chapter-label">
            CHAPTER {question.perspective === "self" ? "01" : "02"}
          </div>
          <h2>
            {question.perspective === "self" ? (
              <>
                나의 보통날을
                <br />
                상상해보세요.
              </>
            ) : (
              <>
                곁에 있을 사람을
                <br />
                떠올려보세요.
              </>
            )}
          </h2>
          <Illustration
            scene={
              step % 3 === 0 ? "home" : step % 3 === 1 ? "table" : "garden"
            }
          />
          <div className="scene-bottom">
            <span>ONE QUESTION, ONE LITTLE DISCOVERY</span>
            <Heart size={17} />
          </div>
        </aside>
        <section className="question-panel" key={question.id}>
          <div className="question-label">
            <span>
              {question.perspective === "self"
                ? "나의 모습"
                : "내가 바라는 상대"}
            </span>
            <span>{question.chapter}</span>
          </div>
          <p className="question-scene">{question.scene}</p>
          <h1 ref={titleRef} tabIndex={-1}>
            {question.prompt}
          </h1>
          <p className="question-hint">{question.hint}</p>
          <fieldset className="answers">
            <legend className="sr-only">
              가장 가까운 답변 하나를 선택해주세요
            </legend>
            {question.options.map((option, index) => (
              <label
                className={`answer ${answers[step] === index ? "selected" : ""}`}
                key={option.text}
              >
                <input
                  type="radio"
                  name={question.id}
                  checked={answers[step] === index}
                  onChange={() => onChoose(index)}
                />
                <span className="answer-letter" aria-hidden="true">
                  {answers[step] === index ? (
                    <Check size={16} />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span className="answer-copy">
                  <strong>{option.text}</strong>
                  {option.detail && <span>{option.detail}</span>}
                </span>
              </label>
            ))}
          </fieldset>
          <div className="question-actions">
            <button
              className="text-button"
              onClick={onPrevious}
              disabled={step === 0}
            >
              <ArrowLeft size={16} /> 이전 질문
            </button>
            <button
              className="button primary"
              onClick={onNext}
              disabled={answers[step] === undefined}
            >
              {step === QUESTIONS.length - 1
                ? "나의 결과 만나보기"
                : "다음 질문"}{" "}
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="question-reassurance">
            정답은 없어요. 조금 더 나다운 쪽을 골라주세요.
          </p>
        </section>
      </div>
    </main>
  );
}

function Result({
  profile,
  result,
  shared,
  onStart,
  onShare,
  onSave,
  cardRef,
}: {
  profile: Profile;
  result: ReturnType<typeof calculateResult> | null;
  shared: boolean;
  onStart: () => void;
  onShare: () => void;
  onSave: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <main className="result-page page-width">
      <div className="result-heading">
        <span className="eyebrow">
          {shared
            ? "A LITTLE NOTE FROM SOMEONE"
            : "THIS COULD BE YOUR EVERYDAY"}
        </span>
        <h1>
          {shared ? (
            "이런 매일을 꿈꾸는 사람이에요."
          ) : (
            <>
              당신이 꿈꾸는 결혼은,
              <br />
              이런 모습이네요.
            </>
          )}
        </h1>
        <p>
          {shared
            ? "공유받은 결혼 스타일이에요. 나의 모습도 알아볼까요?"
            : "당신이 고른 작은 장면들을 한 장의 이야기로 모았어요."}
        </p>
      </div>
      <div className="result-layout">
        <div className="result-card-wrap">
          <div
            className="result-card"
            ref={cardRef}
            style={{ "--card-color": profile.color } as React.CSSProperties}
          >
            <div className="result-card-top">
              <span>MY MARRIAGE STORY</span>
              <Heart size={16} />
            </div>
            <div className="result-illustration">
              <Illustration scene={profile.scene} />
            </div>
            <span className="type-english">{profile.englishName}</span>
            <h2>{profile.name}</h2>
            <p className="result-tagline">{profile.tagline}</p>
            <div className="tags">
              {profile.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <div className="card-signature">
              marry <i>test.</i>
              <span>our ordinary, lovely days</span>
            </div>
          </div>
          <div className="share-actions">
            <button className="button outline" onClick={onSave}>
              <Download size={17} /> 카드 저장
            </button>
            <button className="button outline" onClick={onShare}>
              <Link2 size={17} /> 결과 공유
            </button>
          </div>
          <p className="share-note">공유 카드와 링크에는 유형만 담겨요.</p>
        </div>
        <div className="result-details">
          <section className="result-section">
            <span className="eyebrow">01 · MY KIND OF LOVE</span>
            <h2>이런 관계에서 편안해져요</h2>
            <p>{profile.description}</p>
            <ul className="strengths">
              {profile.strengths.map((s) => (
                <li key={s}>
                  <span>✳</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
          {result && (
            <section className="result-section">
              <span className="eyebrow">02 · THE WAY WE LIVE</span>
              <h2>내 마음의 세 가지 방향</h2>
              <div className="axis-list">
                {AXES.map((axis) => (
                  <div className="axis" key={axis.id}>
                    <div className="axis-title">
                      <strong>{axis.label}</strong>
                      <span>
                        {result.self[axis.id] === 0
                          ? "두 쪽 모두 좋아요"
                          : Math.abs(result.self[axis.id]) <= 50
                            ? "조금 더 끌려요"
                            : "이쪽이 편안해요"}
                      </span>
                    </div>
                    <div
                      className="axis-track"
                      role="img"
                      aria-label={`${axis.label}: ${result.self[axis.id] === 0 ? "균형" : result.self[axis.id] < 0 ? axis.left : axis.right}`}
                    >
                      <span
                        style={{
                          left: `${Math.max(4, Math.min(96, (result.self[axis.id] + 100) / 2))}%`,
                        }}
                      />
                    </div>
                    <div className="axis-labels">
                      <span>{axis.left}</span>
                      <span>{axis.right}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="result-small-note">{result.note}</p>
            </section>
          )}
          <section className="result-section partner-section">
            <span className="eyebrow">
              {result ? "03" : "02"} · SOMEONE BESIDE YOU
            </span>
            <h2>
              {result ? "곁에 이런 사람이 있다면" : "나에게 맞는 동반자는?"}
            </h2>
            {result ? (
              <ul>
                {result.partnerTraits.map((trait, i) => (
                  <li key={trait}>
                    <span>0{i + 1}</span>
                    {trait}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p>
                  같은 유형이어도 바라는 상대는 다를 수 있어요. 직접 답하고,
                  나만의 동반자 이야기를 확인해보세요.
                </p>
                <button className="text-button" onClick={onStart}>
                  나도 테스트하기 <ArrowRight size={15} />
                </button>
              </>
            )}
          </section>
        </div>
      </div>
      <section className="conversation-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LET’S TALK ABOUT US</span>
            <h2>처음 만난 날, 이런 이야기는 어때요?</h2>
          </div>
          <BookOpen size={28} strokeWidth={1.2} />
        </div>
        <div className="conversation-grid">
          {(result?.conversation ?? profile.conversation)
            .slice(0, 3)
            .map((question, i) => (
              <article key={question}>
                <span>QUESTION 0{i + 1}</span>
                <p>“{question}”</p>
                <span className="conversation-heart" aria-hidden="true">
                  ♡
                </span>
              </article>
            ))}
        </div>
      </section>
      <section className="meeting-banner">
        <div>
          <span className="eyebrow">FROM A LITTLE TEST TO A REAL HELLO</span>
          <h2>
            이런 이야기를 나눌 사람,
            <br />
            직접 만나볼까요?
          </h2>
          <p>결혼을 생각하는 사람들과의 새로운 시작.</p>
        </div>
        <a
          className="button primary"
          href={MEETING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          룩앳미에서 만남 찾아보기 <ArrowUpRight size={18} />
          <span className="sr-only"> (새 창)</span>
        </a>
      </section>
      <div className="result-end">
        <button className="text-button" onClick={onStart}>
          <RotateCcw size={15} />
          {shared ? "나의 결혼 스타일 알아보기" : "처음부터 다시 해보기"}
        </button>
        <p>
          답변으로 살펴보는 관계 취향이에요.
          <br className="mobile-break" /> 심리 진단이나 실제 궁합을 예측하는
          검사는 아니에요.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute);
  const [saved, setSaved] = useState(readSession);
  const [answers, setAnswers] = useState<number[]>(
    () => readSession()?.answers ?? [],
  );
  const [step, setStep] = useState(() => readSession()?.step ?? 0);
  const [about, setAbout] = useState(false);
  const [preview, setPreview] = useState<Profile | null>(null);
  const [restart, setRestart] = useState(false);
  const [toast, setToast] = useState("");
  const [manualLink, setManualLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [pendingSection, setPendingSection] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4200);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (pendingSection && route.page === "home") {
      document
        .getElementById(pendingSection)
        ?.scrollIntoView({ behavior: "instant" });
      setPendingSection("");
    }
  }, [pendingSection, route.page]);
  const go = (hash: string) => {
    if (window.location.hash === hash) {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: "instant" });
    } else window.location.hash = hash;
  };
  const start = () => {
    setPreview(null);
    if (answers.length > 0) setRestart(true);
    else reset();
  };
  const reset = () => {
    clearSession();
    setSaved(null);
    setAnswers([]);
    setStep(0);
    setRestart(false);
    go("#/test");
  };
  const persist = (
    nextAnswers: number[],
    nextStep: number,
    complete = false,
  ) => {
    const value = { answers: nextAnswers, step: nextStep, complete };
    saveSession(value);
    setSaved(value);
  };
  const choose = (index: number) => {
    const next = answers.slice();
    next[step] = index;
    setAnswers(next);
    persist(next, step);
  };
  const next = () => {
    if (answers[step] === undefined) return;
    if (step === QUESTIONS.length - 1) {
      persist(answers, step, true);
      go("#/result");
    } else {
      setStep(step + 1);
      persist(answers, step + 1);
    }
  };
  const previous = () => {
    if (step > 0) {
      setStep(step - 1);
      persist(answers, step - 1);
    }
  };
  const resume = () => {
    if (saved) {
      setAnswers(saved.answers);
      setStep(saved.step);
      go(saved.complete ? "#/result" : "#/test");
    }
  };
  const result =
    answers.length === QUESTIONS.length ? calculateResult(answers) : null;
  const profile = route.page === "shared" ? route.profile : result?.profile;
  const showResult =
    (route.page === "result" || route.page === "shared") && profile;
  const scrollSection = (id: string) => {
    if (route.page === "home")
      document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    else if (id === "types") {
      setPendingSection(id);
      go("#/");
    } else setAbout(true);
  };
  const share = async () => {
    if (!profile) return;
    const status = await shareResult(profile);
    if (status === "copied")
      setToast("결과 링크를 복사했어요. 소중한 사람에게 보내보세요.");
    else if (status === "manual") setManualLink(resultUrl(profile));
  };
  const save = async () => {
    if (!profile || saving) return;
    setSaving(true);
    try {
      await downloadCard(
        profile,
        cardRef.current?.querySelector("svg.illustration") ??
          cardRef.current?.querySelector(".result-illustration svg") ??
          null,
      );
      setToast("결과 카드를 저장했어요. 다운로드 목록을 확인해주세요.");
    } catch {
      setToast("카드를 저장하지 못했어요. 결과 링크로 공유해보세요.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        본문으로 이동
      </a>
      <header className="header page-width">
        <Brand onClick={() => go("#/")} />
        <nav aria-label="주요 메뉴">
          <button onClick={() => scrollSection("about")}>테스트 소개</button>
          <button onClick={() => scrollSection("types")}>결혼 스타일</button>
          <span className="nav-note">
            <span />
            조금 더 나다운 사랑
          </span>
        </nav>
      </header>
      <div id="main-content" tabIndex={-1}>
        {route.page === "quiz" ? (
          <Quiz
            answers={answers}
            step={step}
            onChoose={choose}
            onNext={next}
            onPrevious={previous}
            onExit={() => go("#/")}
          />
        ) : showResult ? (
          <Result
            profile={profile}
            result={route.page === "shared" ? null : result}
            shared={route.page === "shared"}
            onStart={start}
            onShare={share}
            onSave={save}
            cardRef={cardRef}
          />
        ) : (
          <main>
            <Landing
              onStart={start}
              onResume={resume}
              saved={saved}
              onPreview={setPreview}
              onAbout={() => setAbout(true)}
            />
          </main>
        )}
      </div>
      <Footer onAbout={() => setAbout(true)} />
      {about && (
        <Modal
          title="둘의 시작은, 나를 아는 것부터."
          onClose={() => setAbout(false)}
        >
          <p>
            marry test는 내가 편안해지는 일상과 바라는 관계를 알아보는 12문항의
            작은 테스트예요.
          </p>
          <div className="about-modal-list">
            <p>
              <strong>앞의 6문항</strong> 나의 생활과 마음을 살펴봐요.
            </p>
            <p>
              <strong>뒤의 6문항</strong> 내가 바라는 상대를 떠올려봐요.
            </p>
            <p>
              <strong>결과에서는</strong> 나의 스타일, 동반자 취향, 대화 질문을
              만나요.
            </p>
          </div>
          <p className="modal-small">
            정식 MBTI 검사나 심리 진단이 아니며, 실제 관계의 궁합이나 결혼을
            예측하지 않아요. 답변은 서버로 전송하지 않고 이 브라우저의 탭에만
            잠시 저장해요. 공유 링크에는 유형만 담겨요.
          </p>
          <button className="button primary" onClick={() => setAbout(false)}>
            알겠어요 <Check size={17} />
          </button>
        </Modal>
      )}
      {preview && (
        <Modal title={preview.name} onClose={() => setPreview(null)}>
          <div
            className="preview-illustration"
            style={{ backgroundColor: preview.color }}
          >
            <Illustration scene={preview.scene} compact />
          </div>
          <span className="type-english">{preview.englishName}</span>
          <p>{preview.description}</p>
          <div className="tags">
            {preview.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <p className="modal-small">
            8가지 결과 중 하나를 미리 보고 있어요. 나의 답변으로 나만의 이야기를
            만나보세요.
          </p>
          <button className="button primary" onClick={start}>
            나의 스타일 알아보기 <ArrowRight size={17} />
          </button>
        </Modal>
      )}
      {restart && (
        <Modal
          title="새로운 마음으로 시작할까요?"
          onClose={() => setRestart(false)}
        >
          <p>지금까지 고른 답변을 지우고 첫 질문부터 다시 시작해요.</p>
          <div className="modal-actions">
            <button
              className="button outline"
              onClick={() => setRestart(false)}
            >
              돌아가기
            </button>
            <button className="button primary" onClick={reset}>
              처음부터 시작 <ArrowRight size={17} />
            </button>
          </div>
        </Modal>
      )}
      {manualLink && (
        <Modal
          title="이 링크로 마음을 나눠보세요."
          onClose={() => setManualLink("")}
        >
          <p>아래 링크를 길게 누르거나 선택해서 복사해주세요.</p>
          <input
            className="share-link-input"
            aria-label="공유할 결과 링크"
            value={manualLink}
            readOnly
            onFocus={(e) => e.currentTarget.select()}
          />
          <button className="button primary" onClick={() => setManualLink("")}>
            확인했어요
          </button>
        </Modal>
      )}
      <div
        className={`toast ${toast || saving ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {saving ? (
          <>
            <Sparkles size={17} />
            카드를 예쁘게 준비하고 있어요.
          </>
        ) : (
          <>
            <Check size={17} />
            {toast}
          </>
        )}
        {toast && (
          <button onClick={() => setToast("")} aria-label="알림 닫기">
            <X size={15} />
          </button>
        )}
      </div>
    </>
  );
}
