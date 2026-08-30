import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { parseRsvpPayload } from "@/lib/rsvp";
import { saveRsvpSubmission, type RsvpSubmission } from "@/lib/rsvpStorage";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "La información enviada no es válida." }, { status: 400 });
  }

  const parsed = parseRsvpPayload(body);
  if (!parsed.ok) return NextResponse.json({ message: parsed.message }, { status: 400 });

  const submission: RsvpSubmission = {
    ...parsed.data,
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    source: "boda-daniela-rodrigo",
  };

  const webhookUrl = process.env.RSVP_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.RSVP_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.RSVP_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(submission),
        cache: "no-store",
      });

      if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    } catch (error) {
      console.error("RSVP delivery failed", error instanceof Error ? error.message : "Unknown error");
      return NextResponse.json(
        { message: "No pudimos guardar tu confirmación. Inténtalo nuevamente en unos minutos." },
        { status: 502 },
      );
    }
  } else {
    try {
      await saveRsvpSubmission(submission);
    } catch (error) {
      console.error("RSVP storage failed", error instanceof Error ? error.message : "Unknown error");
      return NextResponse.json(
        { message: "No pudimos guardar tu confirmación. Inténtalo nuevamente en unos minutos." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ message: "Gracias. Recibimos y guardamos tu confirmación." });
}
