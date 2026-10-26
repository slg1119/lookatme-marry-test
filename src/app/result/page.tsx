import App from "../../App";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "나의 결혼 스타일",
  description:
    "나의 답변으로 살펴보는 결혼 스타일과 바라는 동반자, 첫 만남의 대화 질문.",
  path: "/result",
  privatePage: true,
});
export default function ResultPage() {
  return <App page="result" />;
}
