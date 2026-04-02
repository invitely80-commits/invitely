import { notFound } from "next/navigation";

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
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-maroon/60">Edit invite</p>
        <h1 className="mt-3 font-heading text-5xl text-maroon">
          {invite.parsedData.brideName} & {invite.parsedData.groomName}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-stone-600">
          Refine every detail of your wedding website to make it perfect for your guests.
        </p>
      </div>

      <InviteEditorForm
        action={updateInviteAction.bind(null, invite.id)}
        submitLabel="Save Changes"
        defaultValue={invite.parsedData}
        inviteUrl={absoluteUrl(`/${invite.slug}`)}
        notice={notice}
      />

    </div>
  );
}
