import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InviteRenderer } from "@/components/templates/render-invite";
import { getCoupleNames, parseInviteData, templateToTheme } from "@/lib/invites";
import { prisma } from "@/lib/prisma";

const getInviteBySlug = cache(async (slug: string) => {
  return prisma.invite.findUnique({
    where: {
      slug,
    },
  });
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
    <main className="page-shell min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <InviteRenderer
          invite={{
            id: invite.id,
            slug: invite.slug,
            template: templateToTheme(invite.template),
            data,
          }}
        />
      </div>
    </main>
  );
}
