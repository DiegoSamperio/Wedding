"use client";

import { FormEvent, useState } from "react";
import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

export function SongRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return (
    <section className="section section--warm" id="canciones" aria-labelledby="songs-title">
      <div className="section__inner compact-section">
        <SectionTitle eyebrow={weddingContent.sections.songs.eyebrow} title={weddingContent.songRequests.title} centered><p>{weddingContent.songRequests.description}</p></SectionTitle>
        <form className="song-form" onSubmit={handleSubmit}>
          {weddingContent.songRequests.fields.map((field) => <label key={field.id}>{field.label}<input name={field.id} required={field.required} /></label>)}
          <button className="button button--secondary" type="submit">{weddingContent.sections.songs.submitLabel}</button>
          {submitted ? <p className="form-status" role="status">Gracias. Esta sugerencia aún no se guarda en esta primera versión.</p> : null}
        </form>
      </div>
    </section>
  );
}
