"use client";

import { FormEvent, useState } from "react";
import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

type SubmissionState = "idle" | "sending" | "success" | "error";

export function RsvpForm() {
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      guestName: String(formData.get("guestName") || "").trim(),
      attending,
      guestCount: attending === "yes" ? String(formData.get("guestCount") || "") : null,
      dietaryRestrictions:
        attending === "yes" ? String(formData.get("dietaryRestrictions") || "").trim() : null,
      message: String(formData.get("message") || "").trim(),
    };

    setSubmissionState("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message || "No pudimos enviar tu confirmación.");

      setSubmissionState("success");
      setStatusMessage(result.message || "Gracias. Recibimos tu confirmación.");
      form.reset();
      setAttending("");
    } catch (error) {
      setSubmissionState("error");
      setStatusMessage(error instanceof Error ? error.message : "No pudimos enviar tu confirmación.");
    }
  }

  return (
    <section className="section section--rsvp" id="rsvp" aria-labelledby="rsvp-title">
      <div className="section__inner rsvp-layout">
        <div className="rsvp-copy">
          <figure className="invitation-art rsvp-art">
            <img
              alt="Ilustración que invita a revisar el número de boletos asignados"
              src="/images/invitation/rsvp-art-tickets.jpg"
            />
          </figure>
        </div>

        <div className="rsvp-form-column">
          <SectionTitle id="rsvp-title" eyebrow={weddingContent.sections.rsvp.eyebrow} title={weddingContent.rsvp.title}>
            <p>{weddingContent.rsvp.description}</p>
          </SectionTitle>

          <form className="form-card" onSubmit={handleSubmit}>
          <label className="field">
            <span>Nombre completo</span>
            <input autoComplete="name" maxLength={120} name="guestName" required />
          </label>

          <fieldset className="choice-fieldset">
            <legend>Confirmar asistencia</legend>
            <div className="choice-row">
              {[
                ["yes", "Sí, con gusto"],
                ["no", "No podré acompañarlos"],
              ].map(([value, label]) => (
                <label className={`choice-card ${attending === value ? "is-selected" : ""}`} key={value}>
                  <input
                    checked={attending === value}
                    name="attending"
                    onChange={() => setAttending(value as "yes" | "no")}
                    required
                    type="radio"
                    value={value}
                  />
                  <span className="choice-card__indicator" aria-hidden="true" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {attending === "yes" ? (
            <div className="conditional-fields">
              <label className="field">
                <span>Número de asistentes</span>
                <small className="field-note" id="guest-count-note">
                  {weddingContent.rsvp.guestCountNote}
                </small>
                <select aria-describedby="guest-count-note" name="guestCount" required>
                  <option value="">Selecciona</option>
                  {weddingContent.rsvp.fields.find((field) => field.id === "guestCount")?.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Restricciones alimenticias</span>
                <textarea maxLength={500} name="dietaryRestrictions" />
              </label>
            </div>
          ) : null}

          {attending ? (
            <label className="field">
              <span>Mensaje opcional para los novios</span>
              <textarea maxLength={1000} name="message" />
            </label>
          ) : null}

          <button className="button button--primary" disabled={submissionState === "sending"} type="submit">
            {submissionState === "sending" ? "Enviando…" : weddingContent.sections.rsvp.submitLabel}
          </button>

          {statusMessage ? (
            <div className={`form-status form-status--${submissionState}`} role={submissionState === "error" ? "alert" : "status"}>
              {statusMessage}
            </div>
          ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
