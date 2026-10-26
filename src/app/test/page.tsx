import type { Metadata } from "next";
import App from "../../App";

export const metadata: Metadata = { title: "나의 결혼 스타일 알아보기" };
export default function TestPage() {
  return <App page="quiz" />;
}
