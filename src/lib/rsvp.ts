export type RsvpPayload = {
  guestName: string;
  attending: "yes" | "no";
  guestCount: number | null;
  dietaryRestrictions: string | null;
  message: string | null;
};

type ParseResult =
  | { ok: true; data: RsvpPayload }
  | { ok: false; message: string };

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export function parseRsvpPayload(value: unknown): ParseResult {
  if (!value || typeof value !== "object") return { ok: false, message: "La información enviada no es válida." };

  const input = value as Record<string, unknown>;
  const guestName = cleanText(input.guestName, 120);
  const attending = input.attending;

  if (guestName.length < 2) return { ok: false, message: "Escribe tu nombre completo." };
  if (attending !== "yes" && attending !== "no") return { ok: false, message: "Selecciona si podrás acompañarnos." };

  let guestCount: number | null = null;
  let dietaryRestrictions: string | null = null;

  if (attending === "yes") {
    guestCount = Number(input.guestCount);
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 2) {
      return { ok: false, message: "Selecciona un número de asistentes válido." };
    }
    dietaryRestrictions = cleanText(input.dietaryRestrictions, 500) || null;
  }

  return {
    ok: true,
    data: {
      guestName,
      attending,
      guestCount,
      dietaryRestrictions,
      message: cleanText(input.message, 1000) || null,
    },
  };
}
