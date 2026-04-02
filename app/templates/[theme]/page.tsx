import { notFound } from "next/navigation";
import { type InviteTheme, themeOptions, sampleInvite } from "@/lib/invites";
import { InviteRenderer } from "@/components/templates/render-invite";
import { TemplatePreviewBar } from "@/components/templates/template-preview-bar";

export function generateStaticParams() {
  return themeOptions.map((option) => ({
    theme: option.value,
  }));
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ theme: string }>;
}) {
  const { theme } = await params;
  const isValidTheme = themeOptions.some((option) => option.value === theme);

  if (!isValidTheme) {
    notFound();
  }

  const selectedTheme = theme as InviteTheme;

  // Custom preview data for this theme
  const previewInvite = {
    id: "preview",
    slug: "preview",
    template: selectedTheme,
    data: {
      ...sampleInvite,
      theme: selectedTheme,
    },
  };

  return (
    <main className="relative min-h-screen bg-ivory">
      <InviteRenderer invite={previewInvite} preview={true} />
      <TemplatePreviewBar theme={selectedTheme} />
    </main>
  );
}
