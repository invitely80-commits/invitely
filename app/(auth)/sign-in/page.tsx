import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";
import { authenticateAction } from "@/lib/actions/auth-actions";
import { getSessionSafely } from "@/lib/session";

export default async function SignInPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );
  const session = await getSessionSafely();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your invites, update your wedding details, and track RSVPs in one place."
      footerText="New to Invitely?"
      footerHref="/sign-up"
      footerLabel="Create an account"
    >
      <SignInForm action={authenticateAction} googleEnabled={googleEnabled} />
    </AuthShell>
  );
}
