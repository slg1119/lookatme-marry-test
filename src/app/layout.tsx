import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "../styles.css";
import { QuizSessionProvider } from "../components/QuizSessionProvider";
import {
  getSiteUrl,
  HOME_DESCRIPTION,
  HOME_TITLE,
  isPublicSite,
} from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: getSiteUrl() ?? new URL("http://localhost:4173"),
  title: {
    default: `${HOME_TITLE} | marry test`,
    template: "%s | marry test",
  },
  description: HOME_DESCRIPTION,
  robots: { index: isPublicSite(), follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.NAVER_SITE_VERIFICATION
        ? { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION }
        : {}),
      ...(process.env.BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
        : {}),
    },
  },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#fdfbf7" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="overflow-x-clip">
      <body className="overflow-x-clip">
        <QuizSessionProvider>{children}</QuizSessionProvider>
      </body>
    </html>
  );
}
