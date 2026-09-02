import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { SectionTitle } from "./SectionTitle";

export function LocationSection() {
  return (
    <section className="section" id="ubicacion" aria-labelledby="location-title">
      <div className="section__inner">
        <SectionTitle id="location-title" eyebrow={weddingContent.sections.location.eyebrow} title={weddingContent.sections.location.title} />
        <div className="location-grid">
          <article className="location-card location-card--main">
            <p className="eyebrow">{weddingContent.event.venueName}</p>
            <h3>{weddingContent.event.locationLabel}</h3>
            <address>{weddingContent.event.address}</address>
            <div className="button-row">
              <Button href={weddingContent.event.googleMapsUrl} variant="secondary">Abrir en Google Maps</Button>
              <Button href={weddingContent.event.wazeUrl} variant="secondary">Abrir en Waze</Button>
            </div>
          </article>
          <figure className="invitation-art location-map">
            <img alt="Croquis ilustrado para llegar a Piedra Alta" src="/images/invitation/location-map-clean.webp" />
          </figure>
        </div>
      </div>
    </section>
  );
}
