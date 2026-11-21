import { type InviteTheme } from "@/lib/invites";
import { type InviteData } from "@/lib/validations";
import { SouthIndianHeritageTemplate } from "@/components/templates/south-indian-heritage/SouthIndianHeritageTemplate";

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
  return (
    <div className="relative">
      <SouthIndianHeritageTemplate invite={invite} preview={preview} />
    </div>
  );
}
