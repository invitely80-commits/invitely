"use client";

import { Chrome } from "lucide-react";

import { signInWithGoogleAction } from "@/lib/actions/auth-actions";

export function GoogleSignInButton({
  label,
}: {
  label: string;
}) {
  return (
    <form action={signInWithGoogleAction}>
      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-maroon/12 bg-white text-sm font-semibold text-stone-700 transition hover:border-maroon/30 hover:bg-maroon/5"
      >
        <Chrome className="size-4" />
        {label}
      </button>
    </form>
  );
}
