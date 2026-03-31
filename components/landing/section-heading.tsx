import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-maroon/70">{eyebrow}</p>
      <h2 className="mt-4 font-heading text-4xl text-maroon sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-stone-600">{description}</p>
    </div>
  );
}

