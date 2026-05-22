import Link from "next/link";
import { LayoutDashboard, LogOut, PlusCircle } from "lucide-react";

import { requireUser } from "@/lib/session";
import { signOutAction } from "@/lib/actions/auth-actions";
import { buttonStyles } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <main className="page-shell min-h-screen px-6 py-10 bg-vellum selection:bg-gold-accent/20">
      <div className="section-shell">
        <header className="glass-card spotlight-glow flex flex-col gap-4 rounded-[32px] px-8 py-6 lg:flex-row lg:items-center lg:justify-between border border-gold/10">
          <div>
            <Link href="/" className="font-heading text-3xl font-bold tracking-tighter text-burgundy transition duration-300 hover:opacity-85">
              Invitely<span className="text-gold">.</span>
            </Link>
            <p className="mt-1 text-xs font-semibold tracking-wider text-stone-500 uppercase">
              Welcome back, <span className="text-burgundy font-bold">{user.name ?? "there"}</span> — studio desk
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard" className={buttonStyles({ variant: "secondary", size: "sm", className: "active-scale uppercase tracking-wider text-[10px] font-bold h-10 px-5" })}>
              <LayoutDashboard className="size-3.5" />
              Dashboard
            </Link>
            <Link href="/dashboard/invite/new" className={buttonStyles({ size: "sm", className: "active-scale uppercase tracking-wider text-[10px] font-bold h-10 px-5 bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)]" })}>
              <PlusCircle className="size-3.5" />
              New Invite
            </Link>
            <form action={signOutAction}>
              <button type="submit" className={buttonStyles({ variant: "ghost", size: "sm", className: "active-scale uppercase tracking-wider text-[10px] font-bold h-10 px-4 text-stone-400 hover:text-burgundy" })}>
                <LogOut className="size-3.5" />
                Sign out
              </button>
            </form>
          </div>
        </header>
        <div className="py-10">{children}</div>
      </div>
    </main>
  );
}

