import type { Metadata } from "next";
import HikingGallery from "@/app/hiking/HikingGallery";
import { getInterestImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Hikes",
  description: "Trail moments and high-alpine views.",
};

export default async function HikingPage() {
  const result = await getInterestImages("hiking");

  return <HikingGallery images={result ?? []} error={result === null} />;
}
