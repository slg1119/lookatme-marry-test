import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark, Faq, StyleTiles } from "../../components/DesignParts";
import { Illustration } from "../../components/Illustration";
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
      <header className="site-header">
        <div className="page-width header-inner">
          <Link className="brand" href="/">
            <BrandMark />
            <span className="sr-only">홈으로</span>
          </Link>
          <nav aria-label="주요 메뉴">
            <Link href="/#types">결혼 스타일</Link>
            <Link className="text-link" href="/test">
              테스트 시작하기
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      </header>
      <main id="main-content" className="about-page page-width" tabIndex={-1}>
        <div className="about-heading">
          <p className="eyebrow">테스트 이야기</p>
          <h1>
            둘의 시작은,
            <br />
            <em>나를 아는 것부터.</em>
          </h1>
          <p>
            12개의 질문으로 나의 결혼 스타일과 바라는 동반자를 살펴보고,
            <br />
            함께 나눌 대화 질문을 만나요.
          </p>
          <Link className="button primary" href="/test">
            나의 결혼 스타일 알아보기
            <ArrowRight size={20} />
          </Link>
        </div>
        <section className="about-content" aria-labelledby="guide-questions">
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
          <div className="about-illustration">
            <Illustration typeId="quiet-garden" />
          </div>
          <h2>테스트 전, 궁금한 것들</h2>
          <Faq full />
        </section>
        <section className="about-types" aria-labelledby="guide-types-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">어떤 모습이든, 저마다의 다정함</p>
              <h2 id="guide-types-title">8가지 결혼 스타일을 만나보세요</h2>
            </div>
          </div>
          <StyleTiles />
        </section>
      </main>
      <footer className="site-footer page-width">
        <div>
          <Link className="footer-brand" href="/">
            LOOK AT ME
          </Link>
          <p>둘의 시작은, 나를 아는 것부터.</p>
        </div>
        <div className="footer-links">
          <Link href="/test">테스트 하기</Link>
          <Link href="/">홈으로 돌아가기</Link>
          <span>© LOOK AT ME</span>
        </div>
      </footer>
    </>
  );
}
