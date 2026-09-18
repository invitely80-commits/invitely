import { NextResponse } from "next/server";
import { checkSlugAvailability } from "@/lib/slug";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  const currentInviteId = searchParams.get("inviteId") || undefined;
  const brideName = searchParams.get("brideName") || undefined;
  const groomName = searchParams.get("groomName") || undefined;
  const weddingDate = searchParams.get("weddingDate") || undefined;

  if (!slug.trim()) {
    return NextResponse.json({
      available: false,
      slug: "",
      reason: "Please enter a custom link.",
    });
  }

  try {
    const result = await checkSlugAvailability(slug, {
      currentInviteId,
      brideName,
      groomName,
      weddingDate,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error checking slug availability:", error);
    return NextResponse.json(
      { available: false, slug, reason: "Error verifying link availability." },
      { status: 500 },
    );
  }
}
