"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { CalendarDays, ImagePlus, Link2, MinusCircle, PlusCircle, Sparkles } from "lucide-react";

import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { type InviteActionState } from "@/lib/actions/invite-actions";
import { themeOptions, type InviteTheme } from "@/lib/invites";
import { type InviteData, type InviteEvent } from "@/lib/validations";

const initialState: InviteActionState = {};

function createEvent(partial?: Partial<InviteEvent>): InviteEvent {
  return {
    id:
      partial?.id ??
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 8)),
    title: partial?.title ?? "",
    date: partial?.date ?? "",
    time: partial?.time ?? "",
    venue: partial?.venue ?? "",
    address: partial?.address ?? "",
    description: partial?.description ?? "",
  };
}

const defaultInviteData: InviteData = {
  brideName: "",
  groomName: "",
  weddingDate: "",
  description: "",
  theme: "minimal",
  contactEmail: "",
  contactPhone: "",
  gallery: [],
  heroImage: "",
  events: [createEvent()],
};

export function InviteEditorForm({
  action,
  submitLabel,
  defaultValue,
  inviteUrl,
  notice,
}: {
  action: (
    state: InviteActionState,
    formData: FormData,
  ) => Promise<InviteActionState>;
  submitLabel: string;
  defaultValue?: InviteData;
  inviteUrl?: string;
  notice?: string;
}) {
  const mergedValue = defaultValue ?? defaultInviteData;
  const [state, formAction] = useActionState(action, initialState);
  const [theme, setTheme] = useState<InviteTheme>(mergedValue.theme);
  const [events, setEvents] = useState<InviteEvent[]>(
    mergedValue.events.length ? mergedValue.events : [createEvent()],
  );
  const [existingGallery, setExistingGallery] = useState<string[]>(mergedValue.gallery);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [newPreviews]);

  function updateEvent(eventId: string, field: keyof InviteEvent, value: string) {
    setEvents((current) =>
      current.map((event) => (event.id === eventId ? { ...event, [field]: value } : event)),
    );
  }

  function addEvent() {
    setEvents((current) => [...current, createEvent()]);
  }

  function removeEvent(eventId: string) {
    setEvents((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter((event) => event.id !== eventId);
    });
  }

  function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setNewPreviews((current) => {
      current.forEach((preview) => URL.revokeObjectURL(preview));
      return files.map((file) => URL.createObjectURL(file));
    });
  }

  return (
    <form action={formAction} className="space-y-8">
      {notice ? (
        <p className="rounded-[24px] bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{notice}</p>
      ) : null}
      {state.error ? (
        <p className="rounded-[24px] bg-red-50 px-5 py-4 text-sm text-red-600">{state.error}</p>
      ) : null}

      {inviteUrl ? (
        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-maroon/65">Public link</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-stone-600">
              <Link2 className="size-4 text-gold" />
              <span className="break-all">{inviteUrl}</span>
            </div>
          </div>
          <CopyLinkButton value={inviteUrl} />
        </Card>
      ) : null}

      <input type="hidden" name="theme" value={theme} />
      <input type="hidden" name="eventsJson" value={JSON.stringify(events)} readOnly />
      <input type="hidden" name="existingGalleryJson" value={JSON.stringify(existingGallery)} readOnly />

      <Card>
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-blush p-3 text-maroon">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-3xl text-maroon">Couple details</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              The essentials guests will see first when they open the invite.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="brideName">Bride name</Label>
            <Input id="brideName" name="brideName" defaultValue={mergedValue.brideName} required />
          </div>
          <div>
            <Label htmlFor="groomName">Groom name</Label>
            <Input id="groomName" name="groomName" defaultValue={mergedValue.groomName} required />
          </div>
          <div>
            <Label htmlFor="weddingDate">Wedding date</Label>
            <Input
              id="weddingDate"
              name="weddingDate"
              type="date"
              defaultValue={mergedValue.weddingDate}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">Contact email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={mergedValue.contactEmail}
              placeholder="family@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="contactPhone">Contact phone</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              defaultValue={mergedValue.contactPhone}
              placeholder="+91 98765 43210"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Invitation description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={mergedValue.description}
              placeholder="Share the tone of your celebration, any dress notes, and the feeling you want guests to carry with them."
              required
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-cream p-3 text-maroon">
            <CalendarDays className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-3xl text-maroon">Theme & events</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Choose your visual style and map out the ceremony moments guests need to know.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {themeOptions.map((option) => {
            const selected = theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={`rounded-[26px] border px-5 py-5 text-left transition ${
                  selected
                    ? "border-maroon bg-maroon text-white shadow-[0_20px_50px_rgba(122,31,61,0.18)]"
                    : "border-maroon/10 bg-white text-stone-700 hover:border-maroon/30"
                }`}
              >
                <p className="font-heading text-3xl">{option.label}</p>
                <p className={`mt-2 text-sm leading-7 ${selected ? "text-white/80" : "text-stone-600"}`}>
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-10 space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="rounded-[28px] border border-maroon/10 bg-white px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-maroon/60">
                    Event {index + 1}
                  </p>
                  <h3 className="mt-1 font-heading text-3xl text-maroon">
                    {event.title || "Ceremony moment"}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEvent(event.id)}
                  disabled={events.length === 1}
                >
                  <MinusCircle className="size-4" />
                  Remove
                </Button>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Event title</Label>
                  <Input value={event.title} onChange={(e) => updateEvent(event.id, "title", e.target.value)} />
                </div>
                <div>
                  <Label>Venue</Label>
                  <Input value={event.venue} onChange={(e) => updateEvent(event.id, "venue", e.target.value)} />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={event.date}
                    onChange={(e) => updateEvent(event.id, "date", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={event.time ?? ""}
                    onChange={(e) => updateEvent(event.id, "time", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <Input
                    value={event.address}
                    onChange={(e) => updateEvent(event.id, "address", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    className="min-h-24"
                    value={event.description ?? ""}
                    onChange={(e) => updateEvent(event.id, "description", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="mt-6" onClick={addEvent}>
          <PlusCircle className="size-4" />
          Add another event
        </Button>
      </Card>

      <Card>
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-blush p-3 text-maroon">
            <ImagePlus className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-3xl text-maroon">Gallery images</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Upload up to 8 images. Your first image becomes the hero visual on the invite.
            </p>
          </div>
        </div>

        {existingGallery.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {existingGallery.map((image) => (
              <div key={image} className="overflow-hidden rounded-[24px] border border-maroon/10 bg-white p-3">
                <div className="relative aspect-square overflow-hidden rounded-[18px]">
                  <Image src={image} alt="Invite gallery image" fill className="object-cover" sizes="220px" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => setExistingGallery((current) => current.filter((item) => item !== image))}
                >
                  Remove photo
                </Button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-8 rounded-[26px] border border-dashed border-maroon/20 bg-white/70 p-6">
          <Label htmlFor="galleryFiles">Upload images</Label>
          <Input id="galleryFiles" name="galleryFiles" type="file" accept="image/*" multiple onChange={handleFilesChange} />
          {newPreviews.length > 0 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {newPreviews.map((preview) => (
                <div key={preview} className="overflow-hidden rounded-[22px] border border-maroon/10 bg-white p-3">
                  <Image
                    src={preview}
                    alt="New upload preview"
                    width={400}
                    height={400}
                    unoptimized
                    className="aspect-square w-full rounded-[16px] object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-stone-500">
          Guests will see your invite as a mobile-first wedding website with live RSVPs.
        </p>
        <SubmitButton size="lg" pendingLabel="Saving your invite...">
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
}
