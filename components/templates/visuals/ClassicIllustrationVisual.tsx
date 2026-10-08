import Image from "next/image";

export default function ClassicIllustrationVisual({
  name,
  priority = false,
}: {
  name: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F7F2E7]">
      <Image
        src="/images/templates/classic-illustration/family_blessings_full.png"
        alt="Classic illustrated South Indian invitation"
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 520px"
        className="object-cover object-top opacity-90 scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,242,231,0.1),rgba(43,27,23,0.22)_55%,rgba(43,27,23,0.78))]" />
      <div className="absolute inset-x-8 top-10 rounded-full border border-[#C9A84C]/45 bg-[#F7F2E7]/80 px-4 py-3 text-center shadow-[0_16px_40px_rgba(43,27,23,0.16)] backdrop-blur-sm">
        <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-[#735A4B]">
          Classic Illustration
        </p>
        <p className="mt-1 font-serif text-xl uppercase tracking-[0.16em] text-[#801818]">
          {name}
        </p>
      </div>
    </div>
  );
}
