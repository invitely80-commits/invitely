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
      <p className="text-xs font-bold uppercase tracking-[0.4em] text-burgundy/60">{eyebrow}</p>
      <h2 className="mt-4 font-heading text-4xl font-medium tracking-tight text-burgundy sm:text-5xl">{title}</h2>
      <p className="mt-5 text-[17px] leading-8 text-stone-500/90">{description}</p>
    </div>
  );
}

