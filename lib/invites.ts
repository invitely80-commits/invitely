import { InviteTemplate, type Prisma } from "@prisma/client";

import { inviteDataSchema, type InviteData } from "@/lib/validations";

export type InviteTheme = "minimal" | "royal";

export const themeOptions: Array<{
  value: InviteTheme;
  label: string;
  description: string;
}> = [
  {
    value: "minimal",
    label: "Minimal",
    description: "Soft ivory layout with elegant spacing and a modern editorial feel.",
  },
  {
    value: "royal",
    label: "Royal",
    description: "Maroon and gold styling for a richer, celebratory Indian wedding mood.",
  },
];

export function themeToTemplate(theme: InviteTheme) {
  return theme === "royal" ? InviteTemplate.ROYAL : InviteTemplate.MINIMAL;
}

export function templateToTheme(template: InviteTemplate): InviteTheme {
  return template === InviteTemplate.ROYAL ? "royal" : "minimal";
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
