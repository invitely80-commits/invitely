import { InviteTemplate, type Prisma } from "@prisma/client";
import { inviteDataSchema, type InviteData } from "@/lib/validations";

export type InviteTheme = "minimal" | "royal" | "hindu" | "muslim" | "christian" | "sikh" | "civil" | "luxury" | "south-indian";

export const themeOptions: Array<{
  value: InviteTheme;
  label: string;
  description: string;
  color: string;
}> = [
  {
    value: "minimal",
    label: "Minimal",
    description: "Soft ivory layout with elegant spacing and a modern editorial feel.",
    color: "#fcf9f2",
  },
  {
    value: "royal",
    label: "Royal",
    description: "Maroon and gold styling for a richer, celebratory Indian wedding mood.",
    color: "#5c1530",
  },
  {
    value: "hindu",
    label: "Hindu",
    description: "A sacred celebration in Saffron and Gold, featuring traditional mandala patterns.",
    color: "#f97316",
  },
  {
    value: "muslim",
    label: "Muslim",
    description: "Nikah elegance in Emerald and Rich Gold with geometric artistic motifs.",
    color: "#065f46",
  },
  {
    value: "christian",
    label: "Christian",
    description: "Clean White and Champagne Silver with delicate floral textures and editorial type.",
    color: "#ffffff",
  },
  {
    value: "sikh",
    label: "Sikh",
    description: "Majestic celebration in Royal Blue and Vibrant Orange with bold typography.",
    color: "#1e3a8a",
  },
  {
    value: "civil",
    label: "Civil",
    description: "Modern minimalist storytelling focusing on high-fashion photography and clean lines.",
    color: "#1c1c18",
  },
  {
    value: "luxury",
    label: "Luxury",
    description: "God-Tier Editorial digital heirloom with 3D Virtual Envelope and bento-luxury architecture.",
    color: "#1c1c18",
  },
  {
    value: "south-indian",
    label: "South Indian Hindu",
    description: "A God Tier cinematic heritage experience with layered parallax and editorial storytelling.",
    color: "#8B1A1A",
  },
];

export function themeToTemplate(theme: InviteTheme): InviteTemplate {
  switch (theme) {
    case "royal": return InviteTemplate.ROYAL;
    case "hindu": return InviteTemplate.HINDU;
    case "muslim": return InviteTemplate.MUSLIM;
    case "christian": return InviteTemplate.CHRISTIAN;
    case "sikh": return InviteTemplate.SIKH;
    case "civil": return InviteTemplate.CIVIL;
    case "luxury": return InviteTemplate.LUXURY;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    case "south-indian": return (InviteTemplate as any).SOUTH_INDIAN;
    default: return InviteTemplate.MINIMAL;
  }
}

export function templateToTheme(template: InviteTemplate): InviteTheme {
  switch (template) {
    case InviteTemplate.ROYAL: return "royal";
    case InviteTemplate.HINDU: return "hindu";
    case InviteTemplate.MUSLIM: return "muslim";
    case InviteTemplate.CHRISTIAN: return "christian";
    case InviteTemplate.SIKH: return "sikh";
    case InviteTemplate.CIVIL: return "civil";
    case InviteTemplate.LUXURY: return "luxury";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    case (InviteTemplate as any).SOUTH_INDIAN: return "south-indian";
    default: return "minimal";
  }
}

export function parseInviteData(data: Prisma.JsonValue) {
  return inviteDataSchema.parse(data);
}

export function getCoupleNames(invite: InviteData) {
  return `${invite.brideName} & ${invite.groomName}`;
}

export const sampleInvite: InviteData = {
  brideName: "Aarohi",
  groomName: "Vihaan",
  weddingDate: "2026-12-12",
  description:
    "Join us for a joyful weekend of rituals, music, and heartfelt moments as our families come together to celebrate love.",
  theme: "minimal",
  contactEmail: "family@invitely.com",
  contactPhone: "+91 98765 43210",
  gallery: [
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
  ],
  heroImage:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  events: [
    {
      id: "mehendi",
      title: "Mehendi & Welcome Dinner",
      date: "2026-12-11",
      time: "18:00",
      venue: "The Courtyard, Jaipur",
      address: "Civil Lines, Jaipur, Rajasthan",
      description: "An intimate evening of music, colours, and family welcomes.",
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      date: "2026-12-12",
      time: "11:00",
      venue: "Raj Palace Gardens",
      address: "Amer Road, Jaipur, Rajasthan",
      description: "Ceremony followed by lunch and celebrations.",
    },
  ],
};
