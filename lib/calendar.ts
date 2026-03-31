import { type InviteEvent } from "@/lib/validations";

function formatCalendarDay(input: string) {
  return input.replace(/-/g, "");
}

function addOneDay(input: string) {
  const date = new Date(`${input}T00:00:00`);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

export function getGoogleCalendarUrl(event: InviteEvent, coupleNames: string) {
  const startDay = formatCalendarDay(event.date);
  const endDay = addOneDay(event.date);
  const title = `${event.title} - ${coupleNames}`;
  const details = [event.description, `Hosted by ${coupleNames}`].filter(Boolean).join("\n\n");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title,
  )}&dates=${startDay}/${endDay}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    `${event.venue}, ${event.address}`,
  )}`;
}
