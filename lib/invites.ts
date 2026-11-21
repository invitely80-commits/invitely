import { InviteTemplate, type Prisma } from "@prisma/client";
import { inviteDataSchema, type InviteData } from "@/lib/validations";

export type InviteTheme =
  | "south-indian-heritage"
  | "minimal"
  | "royal"
  | "hindu"
  | "muslim"
  | "christian"
  | "sikh"
  | "civil"
  | "luxury"
  | "south-indian"
  | "temple-journey"
  | "classic-illustration";

export const themeOptions: Array<{
  value: InviteTheme;
  label: string;
  description: string;
  color: string;
}> = [
  {
    value: "south-indian-heritage",
    label: "South Indian Heritage Wedding",
    description: "Editorial luxury wedding stationery with delicate botanical foliage, ancestral family homes, and gold detailing.",
    color: "#821919",
  },
];

export function themeToTemplate(_theme?: InviteTheme): InviteTemplate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (InviteTemplate as any).SOUTH_INDIAN;
}

export function templateToTheme(_template?: InviteTemplate): InviteTheme {
  return "south-indian-heritage";
}

export function parseInviteData(data: Prisma.JsonValue) {
  return inviteDataSchema.parse(data);
}

export function getCoupleNames(invite: InviteData) {
  return `${invite.brideName} & ${invite.groomName}`;
}

export const sampleInvite: InviteData = {
  brideName: "Sofia",
  groomName: "Elias",
  weddingDate: "2026-11-14",
  description: "Join us in celebrating the beginning of our forever.",
  theme: "south-indian-heritage",
  contactEmail: "family@invitely.com",
  contactPhone: "+91 98765 43210",
  gallery: [],
  heroImage: "",
  enableRsvp: true,
  askAccommodation: true,
  familyDetails: {
    groomGrandparents: "Late Sri Venkataraman Iyer & Smt. Lakshmi Ammal\nSri Raghavan Iyer & Smt. Meenakshi Iyer",
    groomParents: "Sri Suresh Iyer & Smt. Kavitha Suresh",
    brideGrandparents: "Late Sri Narayanan Rao & Smt. Rukmini Rao\nSri Krishnamurthy Sharma & Smt. Radha Sharma",
    brideParents: "Sri Prakash Sharma & Smt. Anitha Prakash",
  },
  events: [
    {
      id: "welcomedinner",
      title: "Welcome Dinner",
      date: "2026-11-13",
      time: "18:00",
      venue: "The Courtyard",
      address: "Ancestral Estate, Bengaluru",
      description: "An intimate evening of blessings and reunion.",
    },
    {
      id: "muhurtham",
      title: "Muhurtham Ceremony",
      date: "2026-11-14",
      time: "09:00",
      venue: "The Sacred Mandapam",
      address: "Heritage Grounds, Bengaluru",
      description: "Sacred rituals and tying of the Mangalsutra.",
    },
  ],
};
