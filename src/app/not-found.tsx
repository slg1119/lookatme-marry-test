import Link from "next/link";

export default function NotFound() {
  return (
    <main className="route-message page-width">
      <span className="eyebrow">LET'S START AGAIN</span>
      <h1>이 이야기는 아직 없어요.</h1>
      <p>첫 화면에서 나의 결혼 스타일을 찾아보세요.</p>
      <Link className="button primary" href="/">
        첫 화면으로
      </Link>
    </main>
  );
}
