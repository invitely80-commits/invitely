"use client";

import { useActionState, useEffect, useRef } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { type RsvpActionState } from "@/lib/actions/rsvp-actions";

const initialState: RsvpActionState = {};

export function RsvpForm({
  action,
}: {
  action: (
    state: RsvpActionState,
    formData: FormData,
  ) => Promise<RsvpActionState>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <Card className="rounded-[28px] border-maroon/10 bg-white/95">
      <h3 className="font-heading text-3xl text-maroon">RSVP</h3>
      <p className="mt-2 text-sm leading-7 text-stone-600">
        Let the couple know you&apos;ll be joining the celebration.
      </p>
      <form ref={formRef} action={formAction} className="mt-6 grid gap-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Aarav Mehta" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
        </div>
        <div>
          <Label htmlFor="guests">Number of guests</Label>
          <Input id="guests" name="guests" type="number" min={1} max={12} defaultValue={1} required />
        </div>
        {state.error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
        ) : null}
        {state.success ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {state.success}
          </p>
        ) : null}
        <SubmitButton className="mt-2 w-full" pendingLabel="Saving RSVP...">
          Confirm Attendance
        </SubmitButton>
      </form>
    </Card>
  );
}
