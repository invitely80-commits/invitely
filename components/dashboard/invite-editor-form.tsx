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
    mapUrl: partial?.mapUrl ?? "",
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
  initialTemplate,
}: {
  action: (
    state: InviteActionState,
    formData: FormData,
  ) => Promise<InviteActionState>;
  submitLabel: string;
  defaultValue?: InviteData;
  inviteUrl?: string;
  notice?: string;
  initialTemplate?: InviteTheme;
}) {
  const mergedValue = defaultValue ?? defaultInviteData;
  const [state, formAction] = useActionState(action, initialState);
  const [theme, setTheme] = useState<InviteTheme>(initialTemplate ?? mergedValue.theme);
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
    const validFiles = files.filter((file) => file.size <= 3 * 1024 * 1024);

    if (validFiles.length < files.length) {
      alert("The image exceeds the 3MB limit. Please choose a smaller file.");
    }

    setNewPreviews((current) => {
      current.forEach((preview) => URL.revokeObjectURL(preview));
      // Only keep the first valid file for the preview
      return validFiles.slice(0, 1).map((file) => URL.createObjectURL(file));
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

      <div className="surface-card p-8 md:p-10 rounded-[32px]">
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
      </div>

      <div className="surface-card p-8 md:p-10 rounded-[32px]">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-gold/5 border border-gold/15 p-3 text-gold">
            <CalendarDays className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-burgundy">Theme & events</h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-500">
              Select an exquisite design canvas and detail the ritual schedule of your ceremony.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {themeOptions.map((option) => {
            const selected = theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={`rounded-[24px] border p-6 text-left transition duration-300 active-scale ${
                  selected
                    ? "border-burgundy bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] text-white shadow-[0_20px_50px_rgba(87,0,19,0.18)]"
                    : "border-gold/15 bg-white text-stone-700 hover:border-gold/40 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${selected ? "bg-gold" : "bg-gold/40"}`} />
                  <p className="font-heading text-2xl font-bold">{option.label}</p>
                </div>
                <p className={`mt-2 text-xs leading-relaxed ${selected ? "text-white/75" : "text-stone-500"}`}>
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-16 relative border-l border-gold/20 pl-8 md:pl-12 ml-4 space-y-12">
          {events.map((event, index) => (
            <div key={event.id} className="relative group">
              {/* Chronological Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-4 h-8 w-8 rounded-full border border-gold bg-[#fcf9f2] flex items-center justify-center text-[10px] font-bold text-burgundy shadow-lux group-hover:scale-110 transition-transform duration-500">
                {index + 1}
              </div>

              <div className="rounded-[32px] border-none bg-white/40 p-8 backdrop-blur-xl shadow-sm transition hover:bg-white/60 hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gold/10 pb-5">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                      Ritual timeline
                    </span>
                    <h3 className="mt-1 font-heading text-2xl font-bold text-burgundy">
                      {event.title || "Ceremony moment"}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="active-scale text-xs tracking-wider uppercase font-bold text-stone-400 hover:text-burgundy"
                    onClick={() => removeEvent(event.id)}
                    disabled={events.length === 1}
                  >
                    <MinusCircle className="size-3.5" />
                    Remove
                  </Button>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <Label>Event title</Label>
                    <Input value={event.title} onChange={(e) => updateEvent(event.id, "title", e.target.value)} placeholder="e.g. Traditional Mehndi" />
                  </div>
                  <div>
                    <Label>Venue</Label>
                    <Input value={event.venue} onChange={(e) => updateEvent(event.id, "venue", e.target.value)} placeholder="e.g. Royal Palace Ballroom" />
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
                      placeholder="e.g. 12, Palace Road, Jaipur, Rajasthan"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Google Maps Link (Optional)</Label>
                    <Input
                      value={event.mapUrl || ""}
                      placeholder="Paste link from Google Maps (Share -> Copy Link)"
                      onChange={(e) => updateEvent(event.id, "mapUrl", e.target.value)}
                    />
                    <p className="mt-1.5 text-[10px] text-stone-400 font-semibold tracking-wide uppercase">
                      Allows guests to navigate directly to your wedding venue
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      className="min-h-24"
                      value={event.description ?? ""}
                      placeholder="Detail dress codes, key times, or warm personal greetings."
                      onChange={(e) => updateEvent(event.id, "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="mt-12 active-scale uppercase tracking-wider text-[11px] font-bold h-12 px-6 shadow-sm hover:shadow-md" onClick={addEvent}>
          <PlusCircle className="size-4" />
          Add another event
        </Button>
      </div>

      <div className="surface-card p-8 md:p-10 rounded-[32px]">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-gold/5 border border-gold/15 p-3 text-gold">
            <ImagePlus className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-burgundy">Gallery image</h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-500">
              Upload an exquisite portrait (max 3MB) to grace the main header of your invitation.
            </p>
          </div>
        </div>

        {existingGallery.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {existingGallery.map((image) => (
              <div key={image} className="overflow-hidden rounded-[24px] border border-gold/15 bg-white p-3 shadow-sm hover:shadow-md transition">
                <div className="relative aspect-square overflow-hidden rounded-[18px]">
                  <Image src={image} alt="Invite gallery image" fill className="object-cover" sizes="220px" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 w-full text-xs uppercase font-bold text-stone-400 hover:text-burgundy active-scale h-9"
                  onClick={() => setExistingGallery((current) => current.filter((item) => item !== image))}
                >
                  Remove photo
                </Button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-8 rounded-[24px] border-2 border-dashed border-gold/25 bg-gold/[0.01] p-8 text-center transition hover:bg-gold/[0.02] hover:border-gold/45">
          <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center text-gold mx-auto mb-4">
            <ImagePlus className="size-5" />
          </div>
          <Label htmlFor="galleryFiles" className="cursor-pointer font-bold text-xs uppercase tracking-widest text-burgundy hover:text-gold block mb-2">
            Select high-fidelity portrait
          </Label>
          <p className="text-[10px] text-stone-400 font-semibold tracking-wide uppercase mb-4">
            JPG, PNG or WEBP up to 3MB
          </p>
          <Input id="galleryFiles" name="galleryFiles" type="file" accept="image/*" className="max-w-xs mx-auto text-xs py-1" onChange={handleFilesChange} />
          
          {newPreviews.length > 0 ? (
            <div className="mt-6 flex justify-center">
              {newPreviews.map((preview) => (
                <div key={preview} className="overflow-hidden rounded-[24px] border border-gold/15 bg-white p-3 shadow-md">
                  <Image
                    src={preview}
                    alt="New upload preview"
                    width={200}
                    height={200}
                    unoptimized
                    className="aspect-square w-40 rounded-[18px] object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
        <p className="text-xs leading-relaxed text-stone-400 font-semibold tracking-wide uppercase">
          Your wedding site is responsive and optimized for mobile-first screens.
        </p>
        <SubmitButton size="lg" pendingLabel="Curating your legacy website..." className="active-scale uppercase tracking-wider text-[11px] font-bold h-14 px-8 bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] shadow-md">
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
}
