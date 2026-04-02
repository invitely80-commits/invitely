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
  title: z.string().trim().min(2, "Add an event title."),
  date: z.string().trim().min(1, "Choose an event date."),
  time: z.string().trim().optional().default(""),
  venue: z.string().trim().min(2, "Add a venue name."),
  address: z.string().trim().min(5, "Add a venue address."),
  description: z.string().trim().max(240, "Keep event notes under 240 characters.").optional().default(""),
});

export const inviteDataSchema = z.object({
  brideName: z.string().trim().min(2, "Bride name is required."),
  groomName: z.string().trim().min(2, "Groom name is required."),
  weddingDate: z.string().trim().min(1, "Wedding date is required."),
  description: z.string().trim().min(24, "Add a slightly longer invitation description."),
  theme: z.enum(["minimal", "royal", "hindu", "muslim", "christian", "sikh", "civil"]),
  contactEmail: z.union([z.string().trim().email("Enter a valid contact email."), z.literal("")]).default(""),
  contactPhone: z.union([z.string().trim().max(20), z.literal("")]).default(""),
  gallery: z.array(z.string().url()).max(1, "You can upload 1 image.").default([]),
  heroImage: z.union([z.string().url(), z.literal(""), z.null()]).optional(),
  events: z.array(inviteEventSchema).min(1, "Add at least one event.").max(6, "Keep the invite to 6 events or fewer."),
});

export const inviteSubmissionSchema = inviteDataSchema
  .omit({ gallery: true, heroImage: true })
  .extend({
    existingGallery: z.array(z.string().url()).max(1).default([]),
  });

export type InviteEvent = z.infer<typeof inviteEventSchema>;
export type InviteData = z.infer<typeof inviteDataSchema>;
export type InviteSubmission = z.infer<typeof inviteSubmissionSchema>;

