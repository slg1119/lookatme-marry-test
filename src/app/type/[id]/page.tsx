import type { Metadata } from "next";
import { notFound } from "next/navigation";
import App from "../../../App";
import { getProfile, PROFILES } from "../../../lib/quiz";
import { StructuredData } from "../../../components/StructuredData";
import { pageMetadata, webpageSchema } from "../../../lib/seo";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return PROFILES.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = getProfile((await params).id);
  if (!profile) return {};
  return pageMetadata({
    title: profile.name,
    description: `${profile.tagline} ${profile.description}`,
    path: `/type/${profile.id}`,
    imageId: profile.id,
  });
}
export default async function SharedTypePage({ params }: Props) {
  const { id } = await params;
  const profile = getProfile(id);
  if (!profile) notFound();
  return (
    <>
      <StructuredData
        data={webpageSchema(`/type/${id}`, profile.name, profile.description)}
      />
      <App page="shared" typeId={id} />
    </>
  );
}
