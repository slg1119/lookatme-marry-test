import Link from "next/link";
import { PROFILES } from "../../lib/quiz";
import { TEST_FAQ } from "../../lib/test-guide";
import { StructuredData } from "../../components/StructuredData";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "결혼 성향 테스트 안내와 8가지 스타일",
  description:
    "marry test의 12개 질문 구성과 8가지 결혼 스타일, 결과의 의미를 알아보세요. 나의 성향과 바라는 동반자를 따로 살펴보는 방법, 답변 저장과 유형 공유에 대한 안내를 확인할 수 있어요.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: TEST_FAQ.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
      <a className="skip-link" href="#main-content">
        본문으로 이동
      </a>
      <header className="header page-width">
        <Link className="brand" href="/" aria-label="marry test 홈으로">
          marry test.
        </Link>
        <nav aria-label="주요 메뉴">
          <Link href="/test">테스트 시작하기</Link>
        </nav>
      </header>

      <main id="main-content" className="guide-page page-width" tabIndex={-1}>
        <section className="guide-intro" aria-labelledby="guide-title">
          <h1 id="guide-title">결혼 성향 테스트, 무엇을 알아볼 수 있나요?</h1>
          <p>
            12개의 질문으로 나의 결혼 스타일과 바라는 동반자를 살펴보고, 함께
            나눌 대화 질문을 만나요.
          </p>
          <Link className="button primary" href="/test">
            나의 결혼 스타일 알아보기
          </Link>
        </section>

        <section className="guide-section" aria-labelledby="guide-questions">
          <h2 id="guide-questions">나의 일상에서, 내가 바라는 관계까지</h2>
          <p>
            앞의 6문항은 나의 생활과 마음을, 뒤의 6문항은 내가 바라는 상대를
            살펴봐요. 익숙한 일상과 새로운 경험, 함께하는 시간과 각자의 시간,
            공감과 구체적인 도움 중 어떤 모습이 편안한지 생각해 보세요.
          </p>
          <p>
            결과에서는 나의 결혼 스타일, 동반자에게 바라는 모습, 함께 나눌 대화
            질문을 확인할 수 있어요. 나의 모습과 원하는 상대를 따로 살펴보며
            이야기를 시작해 보세요.
          </p>
        </section>

        <section className="guide-section" aria-labelledby="guide-types-title">
          <h2 id="guide-types-title">8가지 결혼 스타일을 만나보세요</h2>
          <p>각 유형의 이름을 누르면 소개와 대화 질문을 미리 볼 수 있어요.</p>
          <ul className="guide-types">
            {PROFILES.map((profile) => (
              <li key={profile.id}>
                <Link href={`/type/${profile.id}`}>
                  <h3>{profile.name}</h3>
                  <p>{profile.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="guide-section" aria-labelledby="guide-faq-title">
          <h2 id="guide-faq-title">테스트 전, 궁금한 것들</h2>
          <div className="guide-faq">
            {TEST_FAQ.map(({ question, answer }) => (
              <article key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="guide-section" aria-labelledby="guide-start-title">
          <h2 id="guide-start-title">나는 어떤 매일을 함께하고 싶을까요?</h2>
          <p>멋져 보이는 답보다, 평소 내 모습에 가까운 답을 골라주세요.</p>
          <Link className="button primary" href="/test">
            테스트 시작하기
          </Link>
        </section>
      </main>
    </>
  );
}
