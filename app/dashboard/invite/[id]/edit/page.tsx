import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, Palette } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { InviteEditorForm } from "@/components/dashboard/invite-editor-form";
import {
  getOwnedInviteOrThrow,
  updateInviteAction,
} from "@/lib/actions/invite-actions";
import { requireUser } from "@/lib/session";
import { absoluteUrl } from "@/lib/utils";

type EditInvitePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    created?: string;
    updated?: string;
  }>;
};

export default async function EditInvitePage({
  params,
  searchParams,
}: EditInvitePageProps) {
  const user = await requireUser();
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const invite = await getOwnedInviteOrThrow(id, user.id);

  if (!invite) {
    notFound();
  }

  const notice = query?.created
    ? "Your invite is ready. Keep refining the details, then share the public link with guests."
    : query?.updated
      ? "Your latest changes are now live on the public invite page."
      : undefined;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-maroon/60">Edit invite</p>
          <h1 className="mt-2 font-heading text-4xl sm:text-5xl text-maroon">
            {invite.parsedData.brideName} & {invite.parsedData.groomName}
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Refine every detail of your wedding website to make it perfect for your guests.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-burgundy text-white text-xs font-bold shadow-sm">
            <Palette className="size-3.5" />
            Studio
          </span>
          <Link
            href={`/dashboard/invite/${invite.id}/analytics`}
            className={buttonStyles({
              variant: "secondary",
              size: "sm",
              className: "active-scale uppercase tracking-wider text-[10px] font-bold h-9 px-4",
            })}
          >
            <BarChart3 className="size-3.5 mr-1 text-gold" />
            RSVP Analytics
          </Link>
        </div>
      </div>

      <InviteEditorForm
        action={updateInviteAction.bind(null, invite.id)}
        submitLabel="Save Changes"
        defaultValue={invite.parsedData}
        inviteUrl={absoluteUrl(`/${invite.slug}`)}
        currentSlug={invite.slug}
        inviteId={invite.id}
        notice={notice}
      />

    </div>
  );
}
