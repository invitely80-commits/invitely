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
    <main className="page-shell min-h-screen px-6 py-8">
      <div className="section-shell">
        <header className="surface-card flex flex-col gap-4 rounded-[32px] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/" className="font-heading text-3xl text-maroon">
              Invitely
            </Link>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Welcome back, {user.name ?? "there"}. Build and manage your wedding invites here.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard" className={buttonStyles({ variant: "secondary", size: "sm" })}>
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
            <Link href="/dashboard/invite/new" className={buttonStyles({ size: "sm" })}>
              <PlusCircle className="size-4" />
              New Invite
            </Link>
            <form action={signOutAction}>
              <button type="submit" className={buttonStyles({ variant: "ghost", size: "sm" })}>
                <LogOut className="size-4" />
                Sign out
              </button>
            </form>
          </div>
        </header>
        <div className="py-8">{children}</div>
      </div>
    </main>
  );
}

