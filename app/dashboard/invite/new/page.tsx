import { redirect } from "next/navigation";

import { InviteEditorForm } from "@/components/dashboard/invite-editor-form";
import { createInviteAction } from "@/lib/actions/invite-actions";
import { type InviteTheme } from "@/lib/invites";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function NewInvitePage(props: {
  searchParams: Promise<{ template?: string }>;
}) {
  const user = await requireUser();
  const inviteCount = await prisma.invite.count({
    where: { userId: user.id },
  });

  if (inviteCount >= 5) {
    redirect("/dashboard?limit_reached=1");
  }

  const searchParams = await props.searchParams;
  const initialTemplate = searchParams.template as InviteTheme | undefined;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-maroon/60">New invite</p>
        <h1 className="mt-3 font-heading text-5xl text-maroon">Create your wedding website</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-stone-600">
          Add your names, ceremony flow, venue details, and images. Invitely will generate a
          shareable wedding invitation website instantly.
        </p>
      </div>
      <InviteEditorForm 
        action={createInviteAction} 
        submitLabel="Create Invite" 
        initialTemplate={initialTemplate}
      />
    </div>
  );
}
