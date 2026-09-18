import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

export const RESERVED_SLUGS = new Set([
  "dashboard",
  "sign-in",
  "sign-up",
  "templates",
  "api",
  "admin",
  "auth",
  "login",
  "logout",
  "privacy",
  "terms",
  "settings",
  "profile",
  "invite",
  "invites",
  "public",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "checkout",
  "pricing",
  "support",
  "contact",
  "about",
]);

export function formatSlug(value: string): string {
  if (!value) return "";
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // keep only lowercase alphanumeric, spaces, and hyphens
    .trim()
    .replace(/[\s_]+/g, "-") // replace spaces & underscores with hyphen
    .replace(/-+/g, "-") // collapse consecutive hyphens
    .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens
    .slice(0, 40);
}

export function isValidSlugFormat(slug: string): boolean {
  if (!slug || slug.length < 3 || slug.length > 40) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function shortRandomSuffix(length = 3): string {
  return randomBytes(length)
    .toString("base64url")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase()
    .slice(0, length);
}

export type SlugAvailabilityResult = {
  available: boolean;
  slug: string;
  reason?: string;
  suggestions?: string[];
};

export async function checkSlugAvailability(
  rawSlug: string,
  options?: {
    currentInviteId?: string;
    brideName?: string;
    groomName?: string;
    weddingDate?: string;
  },
): Promise<SlugAvailabilityResult> {
  const slug = formatSlug(rawSlug);

  if (!slug || slug.length < 3) {
    return {
      available: false,
      slug,
      reason: "Link must be at least 3 characters long.",
    };
  }

  if (slug.length > 40) {
    return {
      available: false,
      slug,
      reason: "Link cannot exceed 40 characters.",
    };
  }

  if (!isValidSlugFormat(slug)) {
    return {
      available: false,
      slug,
      reason: "Link can only contain lowercase letters, numbers, and hyphens.",
    };
  }

  if (RESERVED_SLUGS.has(slug)) {
    return {
      available: false,
      slug,
      reason: "This link is reserved by the system. Please choose another.",
    };
  }

  const existing = await prisma.invite.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing && existing.id !== options?.currentInviteId) {
    // Generate helpful alternative suggestions
    const suggestions: string[] = [];
    const b = formatSlug(options?.brideName || "").slice(0, 15);
    const g = formatSlug(options?.groomName || "").slice(0, 15);
    let year = "";
    if (options?.weddingDate) {
      try {
        const d = new Date(options.weddingDate);
        if (!isNaN(d.getFullYear())) {
          year = String(d.getFullYear());
        }
      } catch {
        // Ignore date parse issues
      }
    }

    const candidatePool: string[] = [];
    if (b && g) {
      candidatePool.push(`${b}-and-${g}`);
      candidatePool.push(`${g}-weds-${b}`);
      if (year) {
        candidatePool.push(`${b}-weds-${g}-${year}`);
        candidatePool.push(`${b}-and-${g}-${year}`);
      }
      candidatePool.push(`${b}-weds-${g}-wedding`);
    } else {
      if (year) {
        candidatePool.push(`${slug}-${year}`);
      }
      candidatePool.push(`${slug}-wedding`);
    }

    // Always add short random variations as fallbacks
    for (let i = 0; i < 4; i++) {
      candidatePool.push(`${slug}-${shortRandomSuffix(3)}`);
    }

    // Filter unique candidates that aren't the original slug or reserved
    const uniqueCandidates = Array.from(
      new Set(candidatePool.map((c) => formatSlug(c)).filter((c) => c !== slug && isValidSlugFormat(c) && !RESERVED_SLUGS.has(c))),
    );

    // Find first 3 available from DB
    for (const candidate of uniqueCandidates) {
      if (suggestions.length >= 3) break;
      const taken = await prisma.invite.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });
      if (!taken) {
        suggestions.push(candidate);
      }
    }

    return {
      available: false,
      slug,
      reason: `"${slug}" is already taken by another couple.`,
      suggestions,
    };
  }

  return {
    available: true,
    slug,
  };
}

export async function generateInviteSlug(
  brideName: string,
  groomName: string,
  customSlug?: string,
  weddingDate?: string,
  currentInviteId?: string,
): Promise<string> {
  // 1. If user specified a custom slug, check its availability
  if (customSlug) {
    const cleaned = formatSlug(customSlug);
    const result = await checkSlugAvailability(cleaned, {
      currentInviteId,
      brideName,
      groomName,
      weddingDate,
    });
    if (result.available) {
      return result.slug;
    }
  }

  // 2. Generate clean default candidates
  const b = formatSlug(brideName).slice(0, 16) || "bride";
  const g = formatSlug(groomName).slice(0, 16) || "groom";
  
  let year = "";
  if (weddingDate) {
    try {
      const d = new Date(weddingDate);
      if (!isNaN(d.getFullYear())) {
        year = String(d.getFullYear());
      }
    } catch {
      // Ignore date parse issues
    }
  }

  const candidates = [
    `${b}-weds-${g}`,
    `${b}-and-${g}`,
    `${g}-weds-${b}`,
  ];

  if (year) {
    candidates.push(`${b}-weds-${g}-${year}`);
    candidates.push(`${b}-and-${g}-${year}`);
  }

  for (const candidate of candidates) {
    const slug = formatSlug(candidate);
    if (!RESERVED_SLUGS.has(slug)) {
      const existing = await prisma.invite.findUnique({
        where: { slug },
        select: { id: true },
      });
      if (!existing || existing.id === currentInviteId) {
        return slug;
      }
    }
  }

  // 3. Fallback: append a clean 3-4 character random suffix
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const slug = formatSlug(`${b}-weds-${g}-${shortRandomSuffix(3 + (attempt > 5 ? 1 : 0))}`);
    if (!RESERVED_SLUGS.has(slug)) {
      const existing = await prisma.invite.findUnique({
        where: { slug },
        select: { id: true },
      });
      if (!existing || existing.id === currentInviteId) {
        return slug;
      }
    }
  }

  throw new Error("We couldn't create a unique invite link right now. Please try entering a custom link.");
}


