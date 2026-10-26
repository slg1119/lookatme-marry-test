import App from "../../App";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "나의 결혼 스타일 알아보기",
  description: "12개의 질문으로 나의 일상과 바라는 동반자를 알아보세요.",
  path: "/test",
  privatePage: true,
});
export default function TestPage() {
  return <App page="quiz" />;
}
