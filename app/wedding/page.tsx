import { SouthIndianHeritageTemplate } from "@/components/templates/south-indian-heritage/SouthIndianHeritageTemplate";
import { ALL_HERITAGE_EVENTS } from "@/components/wedding/SectionEvents";
import { sampleInvite } from "@/lib/invites";

export const metadata = {
  title: "Family Introduction | South Indian Heritage Wedding",
  description: "With the blessings of our families — Shreyas & Ananya",
};

export default function WeddingPreviewPage() {
  return (
    <SouthIndianHeritageTemplate
      invite={{
        id: "heritage-preview",
        slug: "shreyas-weds-ananya",
        template: "south-indian-heritage",
        data: {
          ...sampleInvite,
          description: "Two families, one beautiful beginning",
          brideName: "ANANYA",
          groomName: "SHREYAS",
          theme: "south-indian-heritage",
          events: ALL_HERITAGE_EVENTS,
        },
      }}
      preview={false}
    />
  );
}
