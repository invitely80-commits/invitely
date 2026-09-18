"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import {
  CalendarDays,
  ImagePlus,
  Link2,
  MinusCircle,
  PlusCircle,
  Sparkles,
  LayoutPanelLeft,
  Users,
  Hotel,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

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

function toKebab(str: string): string {
  return str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 18);
}

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
  enableRsvp: true,
  askAccommodation: false,
  events: [createEvent({ title: "Welcome Dinner", date: "2026-11-13", time: "18:00" })],
};

export function InviteEditorForm({
  action,
  submitLabel,
  defaultValue,
  inviteUrl,
  currentSlug,
  inviteId,
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
  currentSlug?: string;
  inviteId?: string;
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
  const [enableRsvp, setEnableRsvp] = useState<boolean>(mergedValue.enableRsvp ?? true);
  const [askAccommodation, setAskAccommodation] = useState<boolean>(mergedValue.askAccommodation ?? false);
  const [existingGallery, setExistingGallery] = useState<string[]>(mergedValue.gallery);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  // Custom Slug & Availability State
  const [slug, setSlug] = useState<string>(() => {
    if (currentSlug) return currentSlug;
    const b = toKebab(mergedValue.brideName);
    const g = toKebab(mergedValue.groomName);
    return b && g ? `${b}-weds-${g}` : b || g ? `${b || g}-wedding` : "";
  });
  const [isCustomizedByUser, setIsCustomizedByUser] = useState<boolean>(Boolean(currentSlug));
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [slugFeedback, setSlugFeedback] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [newPreviews]);

  // Auto-sync slug when couple names change (if user hasn't explicitly customized)
  useEffect(() => {
    if (isCustomizedByUser) return;
    const b = toKebab(brideName);
    const g = toKebab(groomName);
    if (b && g) {
      setSlug(`${b}-weds-${g}`);
    } else if (b) {
      setSlug(`${b}-wedding`);
    } else if (g) {
      setSlug(`${g}-wedding`);
    }
  }, [brideName, groomName, isCustomizedByUser]);

  // Debounced availability check
  useEffect(() => {
    if (!slug || slug.trim().length < 3) {
      setSlugStatus("invalid");
      setSlugFeedback("Link must be at least 3 characters.");
      setSuggestions([]);
      return;
    }

    setSlugStatus("checking");
    setSlugFeedback("Checking link availability...");

    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          slug,
          ...(inviteId ? { inviteId } : {}),
          ...(brideName ? { brideName } : {}),
          ...(groomName ? { groomName } : {}),
          ...(weddingDate ? { weddingDate } : {}),
        });

        const res = await fetch(`/api/invites/check-slug?${params.toString()}`);
        if (!res.ok) throw new Error("Check failed");
        const data = await res.json();

        if (data.available) {
          setSlugStatus("available");
          setSlugFeedback(`✓ /${data.slug} is available!`);
          setSuggestions([]);
        } else {
          setSlugStatus("taken");
          setSlugFeedback(data.reason || `"${data.slug}" is already taken.`);
          setSuggestions(data.suggestions || []);
        }
      } catch {
        setSlugStatus("idle");
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [slug, inviteId, brideName, groomName, weddingDate]);

  function handleSlugChange(val: string) {
    setIsCustomizedByUser(true);
    const formatted = val
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");
    setSlug(formatted);
  }

  function handleSelectSuggestion(suggestedSlug: string) {
    setIsCustomizedByUser(true);
    setSlug(suggestedSlug);
  }

  function handleResetSlug() {
    setIsCustomizedByUser(false);
    const b = toKebab(brideName);
    const g = toKebab(groomName);
    if (b && g) {
      setSlug(`${b}-weds-${g}`);
    } else if (b) {
      setSlug(`${b}-wedding`);
    } else if (g) {
      setSlug(`${g}-wedding`);
    }
  }

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
    enableRsvp,
    askAccommodation,
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
          <input type="hidden" name="enableRsvp" value={enableRsvp ? "true" : "false"} />
          <input type="hidden" name="askAccommodation" value={askAccommodation ? "true" : "false"} />
          <input type="hidden" name="customSlug" value={slug} />

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

          {/* CUSTOM WEDDING URL */}
          <div className="surface-card p-8 md:p-10 rounded-[32px] ring-1 ring-black/5 bg-white/70 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-burgundy/5 border border-burgundy/15 p-3 text-burgundy shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  <Globe className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-3xl text-burgundy tracking-tight">Your Wedding Website Link</h2>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">
                    The custom web link your guests will open. Match it to your wedding hashtag or print invitations.
                  </p>
                </div>
              </div>
              {isCustomizedByUser && (
                <button
                  type="button"
                  onClick={handleResetSlug}
                  className="text-[11px] font-semibold text-stone-400 hover:text-burgundy transition flex items-center gap-1.5 mt-1 shrink-0 px-3 py-1.5 rounded-full border border-stone-200 hover:border-burgundy/30 bg-white shadow-sm"
                  title="Reset to name-based link"
                >
                  <RefreshCw className="size-3" />
                  Auto-generate
                </button>
              )}
            </div>

            <div className="mt-6">
              <Label htmlFor="customSlug" className="text-xs uppercase tracking-wider font-bold text-stone-600">
                Personalized URL
              </Label>
              
              <div className={`mt-2 flex items-center rounded-2xl border transition-all duration-200 bg-white shadow-inner overflow-hidden ${
                slugStatus === "available"
                  ? "border-emerald-500 ring-2 ring-emerald-500/20"
                  : slugStatus === "taken" || slugStatus === "invalid"
                  ? "border-rose-400 ring-2 ring-rose-400/20"
                  : "border-stone-200 focus-within:border-burgundy focus-within:ring-2 focus-within:ring-burgundy/20"
              }`}>
                <span className="px-4 py-3 bg-stone-50 border-r border-stone-200 text-stone-400 text-xs sm:text-sm font-mono select-none">
                  invitely.in/
                </span>
                <input
                  id="customSlug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="priya-weds-rahul"
                  className="flex-1 px-3 py-3 text-sm sm:text-base font-medium text-stone-900 placeholder:text-stone-300 focus:outline-none bg-transparent"
                  autoComplete="off"
                  spellCheck="false"
                />
                <div className="pr-4 shrink-0 flex items-center gap-1.5">
                  {slugStatus === "checking" && (
                    <Loader2 className="size-4 animate-spin text-stone-400" />
                  )}
                  {slugStatus === "available" && (
                    <CheckCircle2 className="size-4 text-emerald-600" />
                  )}
                  {(slugStatus === "taken" || slugStatus === "invalid") && (
                    <AlertCircle className="size-4 text-rose-500" />
                  )}
                </div>
              </div>

              {/* FEEDBACK MESSAGE & SUGGESTIONS */}
              <div className="mt-3 min-h-[22px]">
                {slugStatus === "available" && (
                  <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <span className="inline-block size-2 rounded-full bg-emerald-500" />
                    <span>invitely.in/{slug} is available!</span>
                  </p>
                )}

                {slugStatus === "checking" && (
                  <p className="text-xs text-stone-400 font-medium">Checking link availability...</p>
                )}

                {(slugStatus === "taken" || slugStatus === "invalid") && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                      <span className="inline-block size-2 rounded-full bg-rose-500" />
                      {slugFeedback}
                    </p>

                    {suggestions.length > 0 && (
                      <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4">
                        <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                          Available suggestions — click any to claim:
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {suggestions.map((sug) => (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => handleSelectSuggestion(sug)}
                              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold font-mono text-amber-950 border border-amber-300/80 shadow-sm hover:border-amber-500 hover:bg-amber-100/50 transition active:scale-95"
                            >
                              <span className="text-amber-600 font-bold">+</span> /{sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
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

          {/* GUEST RSVP & ACCOMMODATION SETTINGS */}
          <div className="surface-card p-8 md:p-10 rounded-[32px] ring-1 ring-black/5 bg-white/70 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-gold/5 border border-gold/15 p-3 text-gold shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <Users className="size-5" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-burgundy tracking-tight">RSVP & Accommodation</h2>
                <p className="mt-1 text-sm leading-relaxed text-stone-500">
                  Collect attendance and manage guest lodging directly from your portal.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {/* RSVP Form Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl border border-gold/15 bg-white/60">
                <div>
                  <p className="font-bold text-sm text-stone-900">Enable Guest RSVP Form</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Guests can confirm attendance, party size, and celebration times.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEnableRsvp(true)}
                    className={`h-9 px-4 rounded-full text-xs font-bold transition active-scale ${
                      enableRsvp
                        ? "bg-burgundy text-white shadow-sm"
                        : "border border-stone-200 text-stone-600 bg-white"
                    }`}
                  >
                    Enabled
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnableRsvp(false)}
                    className={`h-9 px-4 rounded-full text-xs font-bold transition active-scale ${
                      !enableRsvp
                        ? "bg-stone-800 text-white shadow-sm"
                        : "border border-stone-200 text-stone-600 bg-white"
                    }`}
                  >
                    Disabled
                  </button>
                </div>
              </div>

              {/* Accommodation Question Toggle */}
              {enableRsvp ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl border border-gold/15 bg-white/60">
                  <div className="flex items-start gap-3">
                    <Hotel className="size-4 text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-stone-900">Ask Guests About Accommodation</p>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Ask guests: <em>&ldquo;Do you require accommodation / hotel stay?&rdquo;</em>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAskAccommodation(true)}
                      className={`h-9 px-4 rounded-full text-xs font-bold transition active-scale ${
                        askAccommodation
                          ? "bg-gold text-white shadow-sm"
                          : "border border-stone-200 text-stone-600 bg-white"
                      }`}
                    >
                      Yes, Ask
                    </button>
                    <button
                      type="button"
                      onClick={() => setAskAccommodation(false)}
                      className={`h-9 px-4 rounded-full text-xs font-bold transition active-scale ${
                        !askAccommodation
                          ? "bg-stone-200 text-stone-800 font-bold"
                          : "border border-stone-200 text-stone-600 bg-white"
                      }`}
                    >
                      Don&apos;t Ask
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4 pb-20 lg:pb-0">
            <div>
              <p className="text-xs leading-relaxed text-stone-400 font-semibold tracking-wide uppercase">
                Your wedding site is responsive and optimized.
              </p>
              {(slugStatus === "taken" || slugStatus === "invalid") && (
                <p className="text-xs text-rose-600 font-semibold mt-1">
                  Please pick an available wedding link above before saving.
                </p>
              )}
            </div>
            <SubmitButton
              size="lg"
              disabled={slugStatus === "taken" || slugStatus === "invalid" || slugStatus === "checking"}
              pendingLabel="Curating your legacy website..."
              className="active-scale uppercase tracking-wider text-[11px] font-bold h-14 px-8 bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] !text-white hover:shadow-[0_10px_40px_rgba(87,0,19,0.3)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
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
        {/* Render the actual template */}
        <div className="h-[calc(100%-3rem)] w-full overflow-hidden bg-stone-100 relative">
          <div className="pointer-events-none absolute inset-0 z-50 shadow-[inset_0_0_40px_rgba(0,0,0,0.03)]" />
          
          {/* Mobile view uses standard 100% width and height */}
          <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden lg:hidden">
            <InviteRenderer invite={{ id: "preview", slug: "preview", template: theme, data: livePreviewData }} preview={true} />
          </div>

          {/* Desktop view uses transform: scale to fit the desktop layout into the split panel */}
          <div className="hidden lg:block absolute top-0 left-0 origin-top-left overflow-y-auto overflow-x-hidden w-[200%] h-[200%] scale-[0.5] xl:w-[171.4%] xl:h-[171.4%] xl:scale-[0.583]">
            <InviteRenderer invite={{ id: "preview", slug: "preview", template: theme, data: livePreviewData }} preview={true} />
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
