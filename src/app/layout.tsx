import type { Metadata, Viewport } from "next";
import "@fontsource/noto-serif-kr/400.css";
import "@fontsource/noto-serif-kr/500.css";
import "@fontsource-variable/dm-sans";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../styles.css";
import { QuizSessionProvider } from "../components/QuizSessionProvider";

export const metadata: Metadata = {
  title: {
    default: "marry test — 나와 잘 살 사람은?",
    template: "%s | marry test",
  },
  description:
    "어떤 사람과, 어떤 매일을 함께할까요? 12개의 질문으로 만나는 나의 결혼 스타일과 내가 바라는 동반자.",
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#f8f5ed" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QuizSessionProvider>{children}</QuizSessionProvider>
      </body>
    </html>
  );
}
