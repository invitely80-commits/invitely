import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { registerUserAction } from "@/lib/actions/auth-actions";
import { getSessionSafely } from "@/lib/session";

export default async function SignUpPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );
  const session = await getSessionSafely();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      title="Create your wedding studio"
      subtitle="Set up your Invitely account to launch a beautiful invitation website in minutes."
      footerText="Already have an account?"
      footerHref="/sign-in"
      footerLabel="Sign in"
    >
      <SignUpForm action={registerUserAction} googleEnabled={googleEnabled} />
    </AuthShell>
  );
}
