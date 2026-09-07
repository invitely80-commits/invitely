"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { CalendarDays, ImagePlus, Link2, MinusCircle, PlusCircle, Sparkles, LayoutPanelLeft } from "lucide-react";

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
import { InviteRenderer } from "@/components/templates/render-invite";

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
  brideName: "Sofia",
  groomName: "Elias",
  weddingDate: "2026-11-14",
  description: "Join us in celebrating the beginning of our forever.",
  theme: "minimal",
  contactEmail: "",
  contactPhone: "",
  gallery: [],
  heroImage: "",
  events: [createEvent({ title: "Welcome Dinner", date: "2026-11-13", time: "18:00" })],
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
  
  // Lifted State for Live Preview
  const [theme, setTheme] = useState<InviteTheme>(initialTemplate ?? mergedValue.theme);
  const [events, setEvents] = useState<InviteEvent[]>(
    mergedValue.events.length ? mergedValue.events : [createEvent()],
  );
  const [brideName, setBrideName] = useState(mergedValue.brideName);
  const [groomName, setGroomName] = useState(mergedValue.groomName);
  const [weddingDate, setWeddingDate] = useState(mergedValue.weddingDate);
  const [description, setDescription] = useState(mergedValue.description);
  const [contactEmail, setContactEmail] = useState(mergedValue.contactEmail || "");
  const [contactPhone, setContactPhone] = useState(mergedValue.contactPhone || "");
  const [existingGallery, setExistingGallery] = useState<string[]>(mergedValue.gallery);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

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
      if (current.length === 1) return current;
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
      return validFiles.slice(0, 1).map((file) => URL.createObjectURL(file));
    });
  }

  // Construct the live preview data object
  const livePreviewData: InviteData = {
    brideName,
    groomName,
    weddingDate,
    description,
    theme,
    contactEmail,
    contactPhone,
    events,
    gallery: newPreviews.length > 0 ? newPreviews : existingGallery,
    heroImage: "",
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start relative">
      {/* LEFT: EDITOR FORM */}
      <div className={`lg:col-span-6 xl:col-span-5 ${isMobilePreviewOpen ? "hidden lg:block" : "block"}`}>
        <form action={formAction} className="space-y-8 pb-32 lg:pb-12">
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

          {/* COUPLE DETAILS */}
          <div className="surface-card p-8 md:p-10 rounded-[32px] ring-1 ring-black/5 bg-white/70 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blush p-3 text-maroon ring-1 ring-black/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h2 className="font-heading text-3xl text-maroon tracking-tight">Couple details</h2>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  The essentials guests will see first when they open the invite.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="brideName">Bride name</Label>
                <Input id="brideName" name="brideName" value={brideName} onChange={(e) => setBrideName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="groomName">Groom name</Label>
                <Input id="groomName" name="groomName" value={groomName} onChange={(e) => setGroomName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="weddingDate">Wedding date</Label>
                <Input id="weddingDate" name="weddingDate" type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact email</Label>
                <Input id="contactEmail" name="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="family@example.com" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="contactPhone">Contact phone</Label>
                <Input id="contactPhone" name="contactPhone" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+91 98765 43210" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Invitation description</Label>
                <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Share the tone of your celebration..." required />
              </div>
            </div>
          </div>

          {/* THEME & EVENTS */}
          <div className="surface-card p-8 md:p-10 rounded-[32px] ring-1 ring-black/5 bg-white/70 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-gold/5 border border-gold/15 p-3 text-gold shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-burgundy tracking-tight">Theme & events</h2>
                <p className="mt-1 text-sm leading-relaxed text-stone-500">
                  Select an exquisite design canvas and detail the ritual schedule.
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
                    className={`rounded-[24px] border p-6 text-left transition duration-500 active-scale ${
                      selected
                        ? "border-burgundy bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] text-white shadow-[0_20px_50px_rgba(87,0,19,0.18)]"
                        : "border-gold/15 bg-white text-stone-700 hover:border-gold/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${selected ? "bg-gold shadow-[0_0_10px_rgba(202,165,85,0.5)]" : "bg-gold/40"}`} />
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
                  <div className="absolute -left-[41px] md:-left-[57px] top-4 h-8 w-8 rounded-full border border-gold bg-[#fcf9f2] flex items-center justify-center text-[10px] font-bold text-burgundy shadow-[0_0_15px_rgba(154,127,63,0.15)] group-hover:scale-110 transition-transform duration-500">
                    {index + 1}
                  </div>
                  <div className="rounded-[32px] border border-white/40 bg-white/40 p-8 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition duration-700 hover:bg-white/60 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gold/10 pb-5">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold">Ritual timeline</span>
                        <h3 className="mt-1 font-heading text-2xl font-bold text-burgundy tracking-tight">
                          {event.title || "Ceremony moment"}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        className="active-scale text-xs tracking-wider uppercase font-bold text-stone-400 hover:text-burgundy"
                        onClick={() => removeEvent(event.id)}
                        disabled={events.length === 1}
                      >
                        <MinusCircle className="size-3.5 mr-2" />
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
                        <Input type="date" value={event.date} onChange={(e) => updateEvent(event.id, "date", e.target.value)} />
                      </div>
                      <div>
                        <Label>Time</Label>
                        <Input type="time" value={event.time ?? ""} onChange={(e) => updateEvent(event.id, "time", e.target.value)} />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Address</Label>
                        <Input value={event.address} onChange={(e) => updateEvent(event.id, "address", e.target.value)} placeholder="e.g. 12, Palace Road, Jaipur, Rajasthan" />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Textarea className="min-h-24" value={event.description ?? ""} placeholder="Detail dress codes, key times, or warm personal greetings." onChange={(e) => updateEvent(event.id, "description", e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button type="button" variant="secondary" className="mt-12 active-scale uppercase tracking-wider text-[11px] font-bold h-12 px-6 shadow-sm hover:shadow-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" onClick={addEvent}>
              <PlusCircle className="size-4 mr-2" />
              Add another event
            </Button>
          </div>

          {/* GALLERY IMAGE */}
          <div className="surface-card p-8 md:p-10 rounded-[32px] ring-1 ring-black/5 bg-white/70 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-gold/5 border border-gold/15 p-3 text-gold shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <ImagePlus className="size-5" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-burgundy tracking-tight">Gallery image</h2>
                <p className="mt-1 text-sm leading-relaxed text-stone-500">
                  Upload an exquisite portrait (max 3MB) to grace the main header.
                </p>
              </div>
            </div>
            
            <div className="mt-8 rounded-[24px] border-2 border-dashed border-gold/25 bg-gold/[0.01] p-8 text-center transition duration-500 hover:bg-gold/[0.03] hover:border-gold/45 group cursor-pointer relative">
              <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center text-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-700 ease-out shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <ImagePlus className="size-5" />
              </div>
              <Label htmlFor="galleryFiles" className="cursor-pointer font-bold text-xs uppercase tracking-widest text-burgundy group-hover:text-gold block mb-2 transition-colors">
                Select high-fidelity portrait
              </Label>
              <p className="text-[10px] text-stone-400 font-semibold tracking-wide uppercase mb-4">
                JPG, PNG or WEBP up to 3MB
              </p>
              <Input id="galleryFiles" name="galleryFiles" type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer h-full w-full" onChange={handleFilesChange} />
              
              {newPreviews.length > 0 ? (
                <div className="mt-6 flex justify-center">
                  {newPreviews.map((preview) => (
                    <div key={preview} className="overflow-hidden rounded-[24px] border border-gold/15 bg-white p-2 shadow-lg z-10 relative pointer-events-none">
                      <Image src={preview} alt="New upload preview" width={200} height={200} unoptimized className="aspect-square w-40 rounded-[18px] object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4 pb-20 lg:pb-0">
            <p className="text-xs leading-relaxed text-stone-400 font-semibold tracking-wide uppercase">
              Your wedding site is responsive and optimized.
            </p>
            <SubmitButton size="lg" pendingLabel="Curating your legacy website..." className="active-scale uppercase tracking-wider text-[11px] font-bold h-14 px-8 bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] hover:shadow-[0_10px_40px_rgba(87,0,19,0.3)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              {submitLabel}
            </SubmitButton>
          </div>
        </form>
      </div>

      {/* RIGHT: LIVE PREVIEW STUDIO (Desktop Sticky, Mobile Absolute overlay when toggled) */}
      <div className={`lg:col-span-6 xl:col-span-7 h-[100dvh] lg:h-[calc(100vh-2rem)] lg:sticky lg:top-4 overflow-hidden rounded-[2rem] shadow-2xl border border-stone-200 bg-stone-50 z-40 fixed inset-0 lg:inset-auto ${isMobilePreviewOpen ? "block" : "hidden lg:block"}`}>
        <div className="h-12 bg-white/90 backdrop-blur-md border-b border-stone-200 flex items-center justify-between px-6 z-50 relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest ml-4">Live Preview</span>
          </div>
          <Button variant="ghost" size="sm" type="button" className="lg:hidden text-xs uppercase font-bold" onClick={() => setIsMobilePreviewOpen(false)}>
            Close Preview
          </Button>
        </div>
        
        {/* Render the actual template */}
        <div className="h-[calc(100%-3rem)] w-full overflow-y-auto bg-stone-100 relative">
          <div className="pointer-events-none absolute inset-0 z-50 shadow-[inset_0_0_40px_rgba(0,0,0,0.03)]" />
          <div className="w-full min-h-full">
            <InviteRenderer 
              invite={{
                id: "preview",
                slug: "preview",
                template: theme,
                data: livePreviewData,
              }}
              preview={true}
            />
          </div>
        </div>
      </div>

      {/* MOBILE FAB FOR TOGGLING PREVIEW */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <Button 
          type="button" 
          onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}
          className="h-14 rounded-full px-6 shadow-2xl active-scale uppercase tracking-wider text-[11px] font-bold bg-burgundy hover:bg-burgundy/90 text-white"
        >
          <LayoutPanelLeft className="size-5 mr-2" />
          {isMobilePreviewOpen ? "Edit Details" : "Show Preview"}
        </Button>
      </div>

    </div>
  );
}
