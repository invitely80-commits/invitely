import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password must be 72 characters or less."),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(2, "Your name must be at least 2 characters."),
});

export const inviteEventSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1, "Add an event title."),
  date: z.string().trim().min(1, "Choose an event date."),
  time: z.string().trim().optional().default(""),
  venue: z.string().trim().min(1, "Add a venue name."),
  address: z.string().trim().min(1, "Add a venue address."),
  mapUrl: z.string().trim().url("Enter a valid URL").or(z.literal("")).optional(),
  description: z.string().trim().max(240, "Keep event notes under 240 characters.").optional().default(""),
});

export const inviteDataSchema = z.object({
  brideName: z.string().trim().min(1, "Bride name is required."),
  groomName: z.string().trim().min(1, "Groom name is required."),
  weddingDate: z.string().trim().min(1, "Wedding date is required."),
  description: z.string().trim().min(1, "Invitation description is required."),
  theme: z.enum(["minimal", "royal", "hindu", "muslim", "christian", "sikh", "civil", "luxury", "south-indian"]),
  contactEmail: z.union([z.string().trim().email("Enter a valid contact email."), z.literal("")]).default(""),
  contactPhone: z.union([z.string().trim().max(20), z.literal("")]).default(""),
  gallery: z.array(z.string().url()).max(1, "You can upload 1 image.").default([]),
  heroImage: z.union([z.string().url(), z.literal(""), z.null()]).optional(),
  events: z.array(inviteEventSchema).min(1, "Add at least one event.").max(6, "Keep the invite to 6 events or fewer."),
  enableRsvp: z.boolean().default(true),
  askAccommodation: z.boolean().default(false),
  rsvpDeadline: z.string().optional(),
});

export const inviteSubmissionSchema = inviteDataSchema
  .omit({ gallery: true, heroImage: true })
  .extend({
    existingGallery: z.array(z.string().url()).max(1).default([]),
  });

export const rsvpSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  guestCount: z.coerce.number().int().min(1, "At least 1 attendee is required.").max(20, "Maximum party size is 20."),
  attendanceTime: z.string().trim().min(1, "Please select which ceremony / time you will attend."),
  needsAccommodation: z
    .union([
      z.boolean(),
      z.string().transform((val) => val === "true" || val === "yes" || val === "1"),
      z.null(),
      z.undefined(),
    ])
    .optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address.").or(z.literal("")).optional(),
  notes: z.string().trim().max(500, "Notes must be 500 characters or fewer.").optional(),
});

export type InviteEvent = z.infer<typeof inviteEventSchema>;
export type InviteData = z.infer<typeof inviteDataSchema>;
export type InviteSubmission = z.infer<typeof inviteSubmissionSchema>;
export type RsvpSubmission = z.infer<typeof rsvpSubmissionSchema>;

