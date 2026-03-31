import { notFound } from "next/navigation";

import { InviteEditorForm } from "@/components/dashboard/invite-editor-form";
import { Card } from "@/components/ui/card";
import {
  getOwnedInviteOrThrow,
  updateInviteAction,
} from "@/lib/actions/invite-actions";
import { requireUser } from "@/lib/session";
import { absoluteUrl, formatDateTime } from "@/lib/utils";

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
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-maroon/60">Edit invite</p>
        <h1 className="mt-3 font-heading text-5xl text-maroon">
          {invite.parsedData.brideName} & {invite.parsedData.groomName}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-stone-600">
          Refine every detail of your wedding website and monitor new RSVPs as they arrive.
        </p>
      </div>

      <InviteEditorForm
        action={updateInviteAction.bind(null, invite.id)}
        submitLabel="Save Changes"
        defaultValue={invite.parsedData}
        inviteUrl={absoluteUrl(`/${invite.slug}`)}
        notice={notice}
      />

      <Card>
        <h2 className="font-heading text-4xl text-maroon">RSVP activity</h2>
        <p className="mt-2 text-sm leading-7 text-stone-600">
          Responses appear here in real time as guests confirm attendance.
        </p>
        <div className="mt-6 space-y-4">
          {invite.rsvps.length === 0 ? (
            <p className="rounded-[24px] bg-cream/70 px-5 py-4 text-sm text-stone-600">
              No RSVPs yet. Share your link and guest confirmations will show up here.
            </p>
          ) : (
            invite.rsvps.map((rsvp) => (
              <div
                key={rsvp.id}
                className="rounded-[24px] border border-maroon/10 bg-white px-5 py-4 text-sm text-stone-700"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-maroon">{rsvp.name}</p>
                    <p className="mt-1">{rsvp.email}</p>
                    <p>{rsvp.phone}</p>
                  </div>
                  <div className="text-sm text-stone-500 sm:text-right">
                    <p>{rsvp.guests} guest(s)</p>
                    <p className="mt-1">{formatDateTime(rsvp.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
