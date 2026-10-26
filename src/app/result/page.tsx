import type { Metadata } from "next";
import App from "../../App";

export const metadata: Metadata = {
  title: "나의 결혼 스타일",
  robots: { index: false, follow: false },
};
export default function ResultPage() {
  return <App page="result" />;
}
