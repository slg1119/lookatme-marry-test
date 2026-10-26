import App from "../App";
import { StructuredData } from "../components/StructuredData";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  pageMetadata,
  websiteSchema,
} from "../lib/seo";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <StructuredData data={websiteSchema()} />
      <App page="home" />
    </>
  );
}
