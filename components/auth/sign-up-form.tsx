"use client";

import { useActionState } from "react";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { type FormActionState } from "@/lib/actions/auth-actions";

const initialState: FormActionState = {};

export function SignUpForm({
  action,
  googleEnabled,
}: {
  action: (state: FormActionState, formData: FormData) => Promise<FormActionState>;
  googleEnabled: boolean;
}) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <div className="grid gap-5">
      {googleEnabled ? <GoogleSignInButton label="Sign up with Google" /> : null}
      {googleEnabled ? (
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-maroon/10" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">or</span>
          <div className="h-px flex-1 bg-maroon/10" />
        </div>
      ) : null}
      {!googleEnabled ? (
        <p className="rounded-2xl bg-cream/70 px-4 py-3 text-sm text-stone-600">
          Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to enable Google sign-up.
        </p>
      ) : null}
      <form action={formAction} className="grid gap-5">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" placeholder="Priya Sharma" required />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="Minimum 8 characters" required />
        </div>
        {state.error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
        ) : null}
        <SubmitButton className="w-full" pendingLabel="Creating your account...">
          Create Account
        </SubmitButton>
      </form>
    </div>
  );
}
