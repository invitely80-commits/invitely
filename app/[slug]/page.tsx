import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InviteRenderer } from "@/components/templates/render-invite";
import { getCoupleNames, parseInviteData, templateToTheme } from "@/lib/invites";
import { prisma } from "@/lib/prisma";
import { inviteCache } from "@/lib/redis";

const getInviteBySlug = cache(async (slug: string) => {
  // Try Redis first
  const cached = await inviteCache.get(slug);
  if (cached) return cached;

  // Fallback to Prisma
  const invite = await prisma.invite.findUnique({
    where: {
      slug,
    },
  });

  // Store in Redis for subsequent hits (TTL 600s)
  if (invite) {
    await inviteCache.set(slug, invite);
  }

  return invite;
});

export const revalidate = 3600; // Cache the invite page for 1 hour

type PublicInvitePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PublicInvitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const invite = await getInviteBySlug(slug);

  if (!invite) {
    return {
      title: "Invite not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const data = parseInviteData(invite.data);

  return {
    title: `${getCoupleNames(data)} | Wedding Invite`,
    description: data.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PublicInvitePage({ params }: PublicInvitePageProps) {
  const { slug } = await params;
  const invite = await getInviteBySlug(slug);

  if (!invite) {
    notFound();
  }

  const data = parseInviteData(invite.data);

  return (
    <main className="min-h-screen">
      <InviteRenderer
        invite={{
          id: invite.id,
          slug: invite.slug,
          template: templateToTheme(invite.template),
          data,
        }}
      />
    </main>
  );
}
