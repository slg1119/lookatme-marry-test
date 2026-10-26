import type { Metadata } from "next";
import { notFound } from "next/navigation";
import App from "../../../App";
import { getProfile, PROFILES } from "../../../lib/quiz";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return PROFILES.map(({ id }) => ({ id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = getProfile((await params).id);
  if (!profile) return {};
  return {
    title: profile.name,
    description: profile.tagline,
    openGraph: {
      title: `${profile.name} — marry test`,
      description: profile.tagline,
      locale: "ko_KR",
      type: "website",
    },
  };
}
export default async function SharedTypePage({ params }: Props) {
  const { id } = await params;
  if (!getProfile(id)) notFound();
  return <App page="shared" typeId={id} />;
}
