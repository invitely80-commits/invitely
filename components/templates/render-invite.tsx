import { type InviteTheme } from "@/lib/invites";
import { type InviteData } from "@/lib/validations";

import { MinimalTemplate } from "@/components/templates/minimal-template";
import { RoyalTemplate } from "@/components/templates/royal-template";
import { HinduTemplate } from "@/components/templates/hindu-template";
import { MuslimTemplate } from "@/components/templates/muslim-template";
import { ChristianTemplate } from "@/components/templates/christian-template";
import { SikhTemplate } from "@/components/templates/sikh-template";
import { CivilTemplate } from "@/components/templates/civil-template";
import { SouthIndianTemplate } from "@/components/templates/south-indian-template";
import { TemplateComponent as LuxuryTemplate } from "@/components/templates/TemplateComponent";

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
  switch (invite.template) {
    case "royal":
      return <RoyalTemplate invite={invite} preview={preview} />;
    case "hindu":
      return <HinduTemplate invite={invite} preview={preview} />;
    case "muslim":
      return <MuslimTemplate invite={invite} preview={preview} />;
    case "christian":
      return <ChristianTemplate invite={invite} preview={preview} />;
    case "sikh":
      return <SikhTemplate invite={invite} preview={preview} />;
    case "civil":
      return <CivilTemplate invite={invite} preview={preview} />;
    case "luxury":
      return <LuxuryTemplate invite={invite} preview={preview} />;
    case "south-indian":
      return <SouthIndianTemplate invite={invite} preview={preview} />;
    case "minimal":
    default:
      return <MinimalTemplate invite={invite} preview={preview} />;
  }
}
