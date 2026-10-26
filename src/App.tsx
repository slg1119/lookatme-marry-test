"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuizSession } from "./components/QuizSessionProvider";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Download,
  Link2,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { Landing } from "./components/Landing";
import { BrandMark } from "./components/DesignParts";
import { Illustration } from "./components/Illustration";
import { Modal } from "./components/Modal";
import { KakaoShareButton } from "./components/KakaoShareButton";
import { calculateResult, getProfile, QUESTIONS } from "./lib/quiz";
import type { Axis, Profile } from "./lib/quiz";
import { clearSession, saveSession } from "./lib/session";
import { downloadCard, resultUrl, shareResult } from "./lib/share";
import { useResultSync } from "./lib/use-result-sync";
import type { SyncStatus } from "./lib/use-result-sync";

type Route = { page: "home" | "quiz" | "result" | "shared"; profile?: Profile };
const MEETING_URL =
  process.env.NEXT_PUBLIC_MEETING_URL || "https://www.lookatme.my";
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

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button className="brand" onClick={onClick}>
      <BrandMark />
      <span className="sr-only">홈으로</span>
    </button>
  );
}
function Footer({ onAbout }: { onAbout: () => void }) {
  return (
    <footer className="site-footer page-width">
      <div>
        <Link className="footer-brand" href="/">
          LOOK AT ME
        </Link>
        <p>둘의 시작은, 나를 아는 것부터.</p>
      </div>
      <div className="footer-links">
        <Link href="/about">테스트 자세히 알아보기</Link>
        <button onClick={onAbout}>테스트 안내</button>
        <span>© {new Date().getFullYear()} LOOK AT ME</span>
      </div>
    </footer>
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
        <button className="text-link" onClick={onExit}>
          <ArrowLeft size={15} /> 잠시 쉬어가기
        </button>
        <span className="quiz-count">
          <b>{String(step + 1).padStart(2, "0")}</b> / {QUESTIONS.length}
        </span>
      </div>
      <div
        className="quiz-progress"
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
      <div className="phase-line">
        <span className={step < 6 ? "active" : ""}>01 나의 모습</span>
        <span className={step >= 6 ? "active" : ""}>02 내가 바라는 상대</span>
      </div>
      <section className="question-panel" key={question.id}>
        <p className="eyebrow">
          {question.chapter}
          <span className="question-number">질문 {step + 1}</span>
        </p>
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
              <span className="answer-marker" aria-hidden="true">
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
            className="text-link"
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
            {step === QUESTIONS.length - 1 ? "나의 결과 만나보기" : "다음 질문"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <p className="question-reassurance">
          정답은 없어요. 조금 더 나다운 쪽을 골라주세요.
        </p>
      </section>
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
  syncStatus,
  onRetrySync,
  onNotice,
}: {
  profile: Profile;
  result: ReturnType<typeof calculateResult> | null;
  shared: boolean;
  onStart: () => void;
  onShare: () => void;
  onSave: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
  syncStatus: SyncStatus;
  onRetrySync: () => void;
  onNotice: (message: string) => void;
}) {
  return (
    <main className="result-page page-width">
      <div className="result-heading">
        <p className="eyebrow">
          {shared ? "여덟 가지 이야기 중 하나" : "당신이 꿈꾸는 결혼 스타일"}
        </p>
        <h1>{profile.name}</h1>
        <p>{profile.tagline}</p>
      </div>
      <div className="result-layout">
        <div className="result-card-wrap">
          <div
            className="result-card"
            ref={cardRef}
            style={{ "--card-color": profile.color } as React.CSSProperties}
          >
            <div className="result-card-brand">
              LOOK AT ME<span>나의 결혼 스타일</span>
            </div>
            <div className="result-illustration">
              <Illustration scene={profile.scene} typeId={profile.id} />
            </div>
            <div className="result-card-copy">
              <h2>{profile.name}</h2>
              <p>{profile.tagline}</p>
              <div className="tags">
                {profile.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="card-signature">둘의 시작은, 나를 아는 것부터.</div>
          </div>
          <div className="share-actions">
            <KakaoShareButton profile={profile} onNotice={onNotice} />
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
            <p className="eyebrow">
              {shared
                ? "이런 매일을 꿈꾸는 사람이에요."
                : "나의 관계를 읽는 작은 이야기"}
            </p>
            <h2>이런 관계에서 편안해져요</h2>
            <p>{profile.description}</p>
            <ul className="strengths">
              {profile.strengths.map((s) => (
                <li key={s}>
                  <Check size={16} aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </section>
          {result && (
            <section className="result-section">
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
            <h2>
              {result ? "곁에 이런 사람이 있다면" : "나에게 맞는 동반자는?"}
            </h2>
            {result ? (
              <ol>
                {result.partnerTraits.map((trait) => (
                  <li key={trait}>{trait}</li>
                ))}
              </ol>
            ) : (
              <>
                <p>
                  같은 유형이어도 바라는 상대는 다를 수 있어요. 직접 답하고,
                  나만의 동반자 이야기를 확인해보세요.
                </p>
                <button className="text-link" onClick={onStart}>
                  테스트 하기 <ArrowRight size={15} />
                </button>
              </>
            )}
          </section>
        </div>
      </div>
      <section className="conversation-section">
        <div className="section-heading">
          <div>
            <h2>처음 만난 날, 이런 이야기는 어때요?</h2>
          </div>
          <BookOpen size={28} strokeWidth={1.2} />
        </div>
        <div className="conversation-grid">
          {(result?.conversation ?? profile.conversation)
            .slice(0, 3)
            .map((question, i) => (
              <article key={question}>
                <span>대화 0{i + 1}</span>
                <p>“{question}”</p>
              </article>
            ))}
        </div>
      </section>
      {!shared && (
        <div
          className={`result-storage ${syncStatus}`}
          aria-live="polite"
          data-testid="result-storage"
        >
          <div>
            <strong>
              {syncStatus === "saved"
                ? "결과가 안전하게 저장됐어요."
                : syncStatus === "saving"
                  ? "결과를 저장하고 있어요."
                  : syncStatus === "error"
                    ? "아직 서버에 저장되지 않았어요."
                    : "이전 결과를 서버에 저장할 수 있어요."}
            </strong>
            <p>
              {syncStatus === "saved"
                ? "답변과 결과를 룩앳미 서버에 익명으로 보관했어요."
                : syncStatus === "saving"
                  ? "잠시만 기다려주세요. 아래에서 결과를 먼저 볼 수 있어요."
                  : "답변은 이 탭에 남아 있어요. 연결을 확인한 뒤 저장해주세요."}
            </p>
          </div>
          {(syncStatus === "error" || syncStatus === "idle") && (
            <button className="button outline" onClick={onRetrySync}>
              {syncStatus === "error" ? "저장 다시 시도" : "결과 저장하기"}
            </button>
          )}
          {syncStatus === "saved" && <Check size={22} aria-hidden="true" />}
        </div>
      )}
      <section className="meeting-banner">
        <div>
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
          룩앳미에서 만남 찾아보기
          <span className="sr-only"> (새 창)</span>
        </a>
      </section>
      <div className="result-end">
        <button className="text-link" onClick={onStart}>
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

export default function App({
  page,
  typeId,
}: {
  page: Route["page"];
  typeId?: string;
}) {
  const router = useRouter();
  const route: Route = {
    page,
    profile: typeId ? getProfile(typeId) : undefined,
  };
  const { saved, setSaved, answers, setAnswers, step, setStep, hydrated } =
    useQuizSession();
  const [about, setAbout] = useState(false);
  const [preview, setPreview] = useState<Profile | null>(null);
  const [restart, setRestart] = useState(false);
  const [toast, setToast] = useState("");
  const [manualLink, setManualLink] = useState("");
  const [saving, setSaving] = useState(false);
  const sync = useResultSync(
    saved?.submissionId,
    answers,
    route.page === "result" && saved?.complete === true,
  );
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (page !== "home") return;
    const oldPath = window.location.hash.slice(1);
    if (
      oldPath === "/test" ||
      oldPath === "/result" ||
      /^\/type\/[a-z-]+$/.test(oldPath)
    ) {
      router.replace(oldPath);
    } else if (oldPath === "/") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [page, router]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4200);
    return () => clearTimeout(timer);
  }, [toast]);
  const go = (path: string) => {
    router.push(path);
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
    go("/test");
  };
  const persist = (
    nextAnswers: number[],
    nextStep: number,
    complete = false,
    submissionId?: string,
  ) => {
    const value = {
      answers: nextAnswers,
      step: nextStep,
      complete,
      submissionId,
    };
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
      persist(answers, step, true, saved?.submissionId ?? crypto.randomUUID());
      go("/result");
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
      go(saved.complete ? "/result" : "/test");
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
      go(`/#${id}`);
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
      <header className="site-header">
        <div className="page-width header-inner">
          <Brand onClick={() => go("/")} />
          <nav aria-label="주요 메뉴">
            <button onClick={() => scrollSection("types")}>결혼 스타일</button>
            <Link href="/about">테스트 소개</Link>
            <button className="header-start" onClick={start}>
              시작하기
              <ArrowUpRight size={17} />
            </button>
          </nav>
        </div>
      </header>
      <div id="main-content" tabIndex={-1}>
        {!hydrated && (page === "quiz" || page === "result") ? (
          <main className="route-message page-width" aria-live="polite">
            나의 이야기를 불러오고 있어요.
          </main>
        ) : route.page === "quiz" ? (
          <Quiz
            answers={answers}
            step={step}
            onChoose={choose}
            onNext={next}
            onPrevious={previous}
            onExit={() => go("/")}
          />
        ) : showResult ? (
          <Result
            profile={profile}
            result={route.page === "shared" ? null : result}
            shared={route.page === "shared"}
            onStart={start}
            onShare={share}
            onSave={save}
            onNotice={setToast}
            cardRef={cardRef}
            syncStatus={sync.status}
            onRetrySync={() => {
              if (!saved?.submissionId)
                persist(answers, step, true, crypto.randomUUID());
              else sync.retry();
            }}
          />
        ) : (
          <main>
            <Landing
              onStart={start}
              onResume={resume}
              saved={saved}
              onPreview={setPreview}
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
            룩앳미 결혼 스타일 테스트는 내가 편안해지는 일상과 바라는 관계를
            알아보는 12문항의 작은 테스트예요.
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
            예측하지 않아요. 진행 중 답변은 이 탭에 잠시 저장하며, 완료하면
            답변과 결과를 룩앳미 서버에 익명으로 저장해요. 이름이나 연락처는
            수집하지 않아요. 공유 링크에는 유형만 담겨요.
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
            style={{ "--card-color": preview.color } as React.CSSProperties}
          >
            <Illustration scene={preview.scene} typeId={preview.id} compact />
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
          <p>
            이 탭의 답변을 지우고 첫 질문부터 다시 시작해요. 이미 서버에 저장한
            익명 결과는 그대로 남아요.
          </p>
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
