import { NextResponse } from "next/server";
import { parseRsvpPayload } from "@/lib/rsvp";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "La información enviada no es válida." }, { status: 400 });
  }

  const parsed = parseRsvpPayload(body);
  if (!parsed.ok) return NextResponse.json({ message: parsed.message }, { status: 400 });

  const webhookUrl = process.env.RSVP_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "El formulario está listo, pero aún falta conectar el destino de confirmaciones." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.RSVP_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.RSVP_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        ...parsed.data,
        submittedAt: new Date().toISOString(),
        source: "boda-daniela-rodrigo",
      }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
  } catch (error) {
    console.error("RSVP delivery failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { message: "No pudimos enviar tu confirmación. Inténtalo nuevamente en unos minutos." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Gracias. Recibimos tu confirmación." });
}
