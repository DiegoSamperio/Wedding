"use client";

import { FormEvent, useState } from "react";
import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

export function RsvpForm() {
  const [attending, setAttending] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section section--rsvp" id="rsvp" aria-labelledby="rsvp-title">
      <div className="section__inner rsvp-layout">
        <SectionTitle eyebrow={weddingContent.sections.rsvp.eyebrow} title={weddingContent.rsvp.title}><p>{weddingContent.rsvp.description}</p></SectionTitle>
        <form className="form-card" onSubmit={handleSubmit}>
          {weddingContent.rsvp.fields.slice(0, 2).map((field) => <label key={field.id}>{field.label}<input name={field.id} required={field.required} /></label>)}
          <fieldset><legend>{weddingContent.rsvp.fields[2].label}</legend><div className="choice-row"><label><input type="radio" name="attending" value="yes" required onChange={() => setAttending("yes")} /> Sí, con gusto</label><label><input type="radio" name="attending" value="no" required onChange={() => setAttending("no")} /> No podré acompañarlos</label></div></fieldset>
          {attending !== "no" ? <label>{weddingContent.rsvp.fields[3].label}<select name="guestCount" required><option value="">Selecciona</option>{weddingContent.rsvp.fields[3].options?.map((option) => <option key={option}>{option}</option>)}</select></label> : null}
          {weddingContent.rsvp.fields.slice(4).map((field) => <label key={field.id}>{field.label}<textarea name={field.id} /></label>)}
          <button className="button button--primary" type="submit">{weddingContent.sections.rsvp.submitLabel}</button>
          {submitted ? <p className="form-status" role="status">Gracias. Esta es una vista de prueba; tu respuesta todavía no se ha guardado.</p> : null}
        </form>
      </div>
    </section>
  );
}
