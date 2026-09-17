import { notFound } from "next/navigation";

import { AnalyticsView } from "@/components/dashboard/analytics-view";
import { parseInviteData } from "@/lib/invites";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

type AnalyticsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const user = await requireUser();
  const { id } = await params;

  // Strict ownership check: only the invite creator can access this
  const invite = await prisma.invite.findFirst({
    where: {
      id,
      userId: user.id,
    },
    select: {
      id: true,
      slug: true,
      weddingDate: true,
      data: true,
    },
  });

  if (!invite) {
    notFound();
  }

  const parsedData = parseInviteData(invite.data);

  const rsvps = await prisma.rsvp.findMany({
    where: {
      inviteId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedRsvps = rsvps.map((r) => ({
    id: r.id,
    name: r.name,
    guestCount: r.guestCount,
    attendanceTime: r.attendanceTime,
    needsAccommodation: r.needsAccommodation,
    phone: r.phone,
    email: r.email,
    notes: r.notes,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <AnalyticsView
      inviteId={invite.id}
      slug={invite.slug}
      brideName={parsedData.brideName}
      groomName={parsedData.groomName}
      weddingDate={parsedData.weddingDate}
      rsvps={serializedRsvps}
    />
  );
}
