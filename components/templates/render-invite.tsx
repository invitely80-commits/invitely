import { type InviteTheme } from "@/lib/invites";
import { type InviteData } from "@/lib/validations";

import { MinimalTemplate } from "@/components/templates/minimal-template";
import { RoyalTemplate } from "@/components/templates/royal-template";

export type TemplateInvite = {
  id: string;
  slug: string;
  template: InviteTheme;
  data: InviteData;
};

export function InviteRenderer({
  invite,
  preview = false,
}: {
  invite: TemplateInvite;
  preview?: boolean;
}) {
  if (invite.template === "royal") {
    return <RoyalTemplate invite={invite} preview={preview} />;
  }

  return <MinimalTemplate invite={invite} preview={preview} />;
}

