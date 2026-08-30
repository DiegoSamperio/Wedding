import { mkdir, open } from "node:fs/promises";
import path from "node:path";
import type { RsvpPayload } from "./rsvp";

export type RsvpSubmission = RsvpPayload & {
  id: string;
  submittedAt: string;
  source: string;
};

const headers = [
  "id",
  "fecha de envío",
  "nombre completo",
  "asistencia",
  "número de asistentes",
  "restricciones alimenticias",
  "mensaje",
  "origen",
];

function csvCell(value: string | number | null) {
  if (value === null) return "";
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function getRsvpStoragePath() {
  const configuredPath = process.env.RSVP_STORAGE_PATH?.trim();
  return path.resolve(process.cwd(), configuredPath || ".data/rsvp-confirmaciones.csv");
}

export async function saveRsvpSubmission(
  submission: RsvpSubmission,
  storagePath = getRsvpStoragePath(),
) {
  await mkdir(path.dirname(storagePath), { recursive: true });
  const file = await open(storagePath, "a+");

  try {
    const { size } = await file.stat();
    if (size === 0) await file.appendFile(`${headers.map(csvCell).join(",")}\n`, "utf8");

    const row = [
      submission.id,
      submission.submittedAt,
      submission.guestName,
      submission.attending === "yes" ? "Sí" : "No",
      submission.guestCount,
      submission.dietaryRestrictions,
      submission.message,
      submission.source,
    ];
    await file.appendFile(`${row.map(csvCell).join(",")}\n`, "utf8");
  } finally {
    await file.close();
  }

  return storagePath;
}
