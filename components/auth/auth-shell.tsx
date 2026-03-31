import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
  footerText,
  footerHref,
  footerLabel,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerHref: string;
  footerLabel: string;
}) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="surface-card rounded-[36px] px-6 py-8 sm:px-10 sm:py-10">
        <Link href="/" className="font-heading text-3xl text-maroon">
          Invitely
        </Link>
        <h1 className="mt-8 font-heading text-5xl text-maroon">{title}</h1>
        <p className="mt-4 text-base leading-7 text-stone-600">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-8 text-sm text-stone-500">
          {footerText}{" "}
          <Link href={footerHref} className="font-semibold text-maroon">
            {footerLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}

