import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

function slugifySegment(value: string) {
  return (
    value
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[_\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 18) || "invite"
  );
}

function randomSuffix() {
  return randomBytes(8).toString("base64url").replace(/[^a-z0-9]/gi, "").toLowerCase().slice(0, 10);
}

export async function generateInviteSlug(brideName: string, groomName: string) {
  const prefix = `${slugifySegment(brideName)}-${slugifySegment(groomName)}`;

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const slug = `${prefix}-${randomSuffix()}`;
    const existing = await prisma.invite.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return slug;
    }
  }

  throw new Error("We couldn't create a unique invite link right now.");
}

