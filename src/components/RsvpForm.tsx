"use client";

import { FormEvent, useState } from "react";
import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

export function RsvpForm() {
  const [attending, setAttending] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const textFields = weddingContent.rsvp.fields.slice(0, 2);
  const guestCountField = weddingContent.rsvp.fields[3];
  const notesFields = weddingContent.rsvp.fields.slice(4);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section section--rsvp" id="rsvp" aria-labelledby="rsvp-title">
      <div className="section__inner rsvp-layout">
        <div className="rsvp-copy">
          <SectionTitle eyebrow={weddingContent.sections.rsvp.eyebrow} title={weddingContent.rsvp.title}>
            <p>{weddingContent.rsvp.description}</p>
          </SectionTitle>
        </div>
        <form className="form-card" onSubmit={handleSubmit}>
          {textFields.map((field) => (
            <label className="field" key={field.id}>
              <span>{field.label}</span>
              <input name={field.id} required={field.required} />
            </label>
          ))}
          <fieldset className="choice-fieldset">
            <legend>{weddingContent.rsvp.fields[2].label}</legend>
            <div className="choice-row">
              {[
                ["yes", "Sí, con gusto"],
                ["no", "No podré acompañarlos"],
              ].map(([value, label]) => (
                <label className={`choice-card ${attending === value ? "is-selected" : ""}`} key={value}>
                  <input
                    checked={attending === value}
                    name="attending"
                    onChange={() => setAttending(value)}
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
          {attending !== "no" ? (
            <label className="field">
              <span>{guestCountField.label}</span>
              <select name="guestCount" required>
                <option value="">Selecciona</option>
                {guestCountField.options?.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ) : null}
          {notesFields.map((field) => (
            <label className="field" key={field.id}>
              <span>{field.label}</span>
              <textarea name={field.id} />
            </label>
          ))}
          <button className="button button--primary" type="submit">{weddingContent.sections.rsvp.submitLabel}</button>
          {submitted ? (
            <div className="form-status" role="status">
              <strong>Confirmación recibida.</strong>
              <span>Gracias. Por ahora este mensaje es visual y todavía no se guarda en backend.</span>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
