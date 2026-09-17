"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Hotel,
  Clock,
  Download,
  Search,
  ExternalLink,
  Edit3,
  BarChart3,
  Calendar,
} from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { formatShortDate } from "@/lib/utils";

type RsvpItem = {
  id: string;
  name: string;
  guestCount: number;
  attendanceTime: string;
  needsAccommodation: boolean | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
  createdAt: string;
};

export function AnalyticsView({
  inviteId,
  slug,
  brideName,
  groomName,
  weddingDate,
  rsvps,
}: {
  inviteId: string;
  slug: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  rsvps: RsvpItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAccommodation, setFilterAccommodation] = useState<"all" | "yes" | "no">("all");

  const totalResponses = rsvps.length;
  const totalGuests = rsvps.reduce((sum, r) => sum + r.guestCount, 0);
  const accomNeededRsvps = rsvps.filter((r) => r.needsAccommodation === true);
  const totalGuestsNeedingAccom = accomNeededRsvps.reduce((sum, r) => sum + r.guestCount, 0);

  // Time / Ceremony breakdown
  const ceremonyCounts: Record<string, { responses: number; guests: number }> = {};
  rsvps.forEach((r) => {
    const key = r.attendanceTime || "Unspecified";
    if (!ceremonyCounts[key]) {
      ceremonyCounts[key] = { responses: 0, guests: 0 };
    }
    ceremonyCounts[key].responses += 1;
    ceremonyCounts[key].guests += r.guestCount;
  });

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.email && r.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.phone && r.phone.includes(searchTerm));

    const matchesAccom =
      filterAccommodation === "all" ||
      (filterAccommodation === "yes" && r.needsAccommodation === true) ||
      (filterAccommodation === "no" && r.needsAccommodation === false);

    return matchesSearch && matchesAccom;
  });

  function exportToCsv() {
    if (rsvps.length === 0) {
      alert("No RSVP responses to export yet.");
      return;
    }

    const headers = [
      "Guest Name",
      "Party Size",
      "Ceremony / Time",
      "Accommodation Needed",
      "Phone",
      "Email",
      "Notes & Wishes",
      "Submitted At",
    ];

    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      r.guestCount,
      `"${r.attendanceTime.replace(/"/g, '""')}"`,
      r.needsAccommodation === true ? "Yes" : r.needsAccommodation === false ? "No" : "N/A",
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      `"${(r.email || "").replace(/"/g, '""')}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleString("en-IN"),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RSVP_${brideName}_${groomName}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Top Navigation & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gold/15 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon/60">
              Private Studio Analytics
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-600">
              Live Data
            </span>
          </div>
          <h1 className="mt-2 font-heading text-4xl font-bold text-burgundy tracking-tight">
            {brideName} & {groomName}
          </h1>
          <p className="mt-1 text-xs text-stone-500">
            Wedding Date: <span className="font-semibold text-stone-700">{formatShortDate(weddingDate)}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/dashboard/invite/${inviteId}/edit`}
            className={buttonStyles({
              variant: "secondary",
              size: "sm",
              className: "active-scale uppercase tracking-wider text-[10px] font-bold h-10 px-4",
            })}
          >
            <Edit3 className="size-3.5 mr-1" />
            Design Studio
          </Link>
          <Link
            href={`/${slug}`}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles({
              variant: "secondary",
              size: "sm",
              className: "active-scale uppercase tracking-wider text-[10px] font-bold h-10 px-4",
            })}
          >
            <ExternalLink className="size-3.5 mr-1" />
            Public Portal
          </Link>
          <button
            type="button"
            onClick={exportToCsv}
            disabled={rsvps.length === 0}
            className={buttonStyles({
              size: "sm",
              className:
                "active-scale uppercase tracking-wider text-[10px] font-bold h-10 px-5 bg-[linear-gradient(135deg,var(--color-burgundy)_0%,#3d000d_100%)] !text-white shadow-md disabled:opacity-50",
            })}
          >
            <Download className="size-3.5 mr-1.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Guests */}
        <div className="surface-card spotlight-glow p-6 rounded-[28px] border border-gold/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Confirmed Guests
            </span>
            <div className="w-10 h-10 rounded-2xl bg-burgundy/5 text-burgundy flex items-center justify-center">
              <Users className="size-5" />
            </div>
          </div>
          <p className="mt-4 font-heading text-4xl font-bold text-burgundy">{totalGuests}</p>
          <p className="mt-1 text-[11px] text-stone-500 font-medium">
            Across {totalResponses} total {totalResponses === 1 ? "response" : "responses"}
          </p>
        </div>

        {/* Total Responses */}
        <div className="surface-card spotlight-glow p-6 rounded-[28px] border border-gold/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Total Submissions
            </span>
            <div className="w-10 h-10 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
              <BarChart3 className="size-5" />
            </div>
          </div>
          <p className="mt-4 font-heading text-4xl font-bold text-stone-900">{totalResponses}</p>
          <p className="mt-1 text-[11px] text-stone-500 font-medium">Unique party submissions</p>
        </div>

        {/* Accommodation Requests */}
        <div className="surface-card spotlight-glow p-6 rounded-[28px] border border-gold/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Lodging Required
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Hotel className="size-5" />
            </div>
          </div>
          <p className="mt-4 font-heading text-4xl font-bold text-amber-700">{totalGuestsNeedingAccom}</p>
          <p className="mt-1 text-[11px] text-stone-500 font-medium">
            {accomNeededRsvps.length} {accomNeededRsvps.length === 1 ? "party" : "parties"} needing rooms
          </p>
        </div>

        {/* Average Party Size */}
        <div className="surface-card spotlight-glow p-6 rounded-[28px] border border-gold/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Avg. Party Size
            </span>
            <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-600 flex items-center justify-center">
              <Calendar className="size-5" />
            </div>
          </div>
          <p className="mt-4 font-heading text-4xl font-bold text-stone-800">
            {totalResponses > 0 ? (totalGuests / totalResponses).toFixed(1) : "0"}
          </p>
          <p className="mt-1 text-[11px] text-stone-500 font-medium">Guests per invitation</p>
        </div>
      </div>

      {/* Ceremony Attendance Breakdown */}
      {Object.keys(ceremonyCounts).length > 0 ? (
        <div className="surface-card p-8 rounded-[32px] border border-gold/10">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="size-5 text-gold" />
            <h3 className="font-heading text-xl font-bold text-burgundy">Ceremony Attendance Breakdown</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(ceremonyCounts).map(([ceremony, stats]) => (
              <div key={ceremony} className="p-4 rounded-2xl bg-white/70 border border-gold/10">
                <p className="text-xs font-bold text-stone-800 line-clamp-1">{ceremony}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-burgundy">{stats.guests}</span>
                  <span className="text-xs text-stone-500">guests</span>
                  <span className="text-[10px] text-stone-400">({stats.responses} responses)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Guest List & Response Table */}
      <div className="surface-card p-8 md:p-10 rounded-[32px] border border-gold/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-heading text-2xl font-bold text-burgundy">Guest Responses</h3>
            <p className="text-xs text-stone-500 mt-1">
              Showing {filteredRsvps.length} of {totalResponses} total submissions
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="size-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guest or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-9 pr-4 text-xs rounded-full border border-stone-200 bg-white/80 focus:outline-none focus:border-burgundy/50 w-52"
              />
            </div>

            {/* Accommodation Filter */}
            <div className="flex items-center gap-1 rounded-full border border-stone-200 p-1 bg-white/60 text-xs">
              <button
                type="button"
                onClick={() => setFilterAccommodation("all")}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                  filterAccommodation === "all" ? "bg-burgundy text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterAccommodation("yes")}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                  filterAccommodation === "yes" ? "bg-amber-600 text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Needs Hotel
              </button>
              <button
                type="button"
                onClick={() => setFilterAccommodation("no")}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                  filterAccommodation === "no" ? "bg-stone-800 text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Own Stay
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        {filteredRsvps.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-stone-200 rounded-2xl">
            <Users className="size-8 text-stone-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-stone-700">No RSVP records found</p>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              {searchTerm || filterAccommodation !== "all"
                ? "Try adjusting your search query or filters."
                : "When guests submit their attendance on your invite page, their responses will appear here in real-time."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gold/15 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Party Size</th>
                  <th className="py-3 px-4">Ceremonies Attending</th>
                  <th className="py-3 px-4">Accommodation</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gold/[0.02] transition">
                    <td className="py-4 px-4">
                      <p className="font-bold text-stone-900">{rsvp.name}</p>
                      {rsvp.notes ? (
                        <p className="text-[11px] text-stone-500 italic mt-1 line-clamp-2">
                          &ldquo;{rsvp.notes}&rdquo;
                        </p>
                      ) : null}
                    </td>
                    <td className="py-4 px-4 font-bold text-burgundy">
                      {rsvp.guestCount} {rsvp.guestCount === 1 ? "Guest" : "Guests"}
                    </td>
                    <td className="py-4 px-4 text-stone-700 font-medium">{rsvp.attendanceTime}</td>
                    <td className="py-4 px-4">
                      {rsvp.needsAccommodation === true ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-700 px-2.5 py-1 text-[10px] font-bold">
                          <Hotel className="size-3" /> Needs Hotel
                        </span>
                      ) : rsvp.needsAccommodation === false ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 text-stone-600 px-2.5 py-1 text-[10px] font-medium">
                          Self-Arranged
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[10px]">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-stone-600">
                      {rsvp.phone ? <div>{rsvp.phone}</div> : null}
                      {rsvp.email ? <div className="text-stone-400">{rsvp.email}</div> : null}
                      {!rsvp.phone && !rsvp.email ? <span className="text-stone-400">—</span> : null}
                    </td>
                    <td className="py-4 px-4 text-stone-400 font-mono text-[11px]">
                      {formatShortDate(rsvp.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
