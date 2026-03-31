import { prisma } from "@/lib/prisma";

export const OAUTH_PASSWORD_PLACEHOLDER = "__GOOGLE_OAUTH_ACCOUNT__";

export async function ensureUserRecord(email: string, name?: string | null) {
  const normalizedEmail = email.toLowerCase();
  const nextName = name?.trim() || normalizedEmail.split("@")[0] || "Invitely User";

  return prisma.user.upsert({
    where: {
      email: normalizedEmail,
    },
    create: {
      email: normalizedEmail,
      name: nextName,
      passwordHash: OAUTH_PASSWORD_PLACEHOLDER,
    },
    update: {
      name: nextName,
      passwordHash: OAUTH_PASSWORD_PLACEHOLDER,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });
}

