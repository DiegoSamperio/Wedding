import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { SectionTitle } from "./SectionTitle";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function LocationSection() {
  return (
    <section className="section" id="ubicacion" aria-labelledby="location-title">
      <div className="section__inner">
        <SectionTitle eyebrow={weddingContent.sections.location.eyebrow} title={weddingContent.sections.location.title} />
        <div className="location-grid" id="location-title">
          <article className="location-card"><p className="eyebrow">{weddingContent.event.venueName}</p><h3>{weddingContent.event.locationLabel}</h3><address>{weddingContent.event.address}</address><div className="button-row"><Button href={weddingContent.event.googleMapsUrl} variant="secondary">Google Maps</Button><Button href={weddingContent.event.wazeUrl} variant="secondary">Waze</Button></div></article>
          <div className="location-placeholders"><ImagePlaceholder alt="Croquis de llegada a Piedra Alta" label={weddingContent.sections.location.sketchLabel} /><ImagePlaceholder alt="Mapa de Piedra Alta" label={weddingContent.sections.location.mapLabel} /></div>
        </div>
        <div className="hotel-grid">
          {weddingContent.accommodation.hotels.map((hotel) => <article className="hotel-card" key={hotel.id}><ImagePlaceholder label="Hotel pendiente" /><p className="eyebrow">Hospedaje</p><h3>{hotel.name}</h3><p>Distancia: {hotel.distance}</p><p>Precio aproximado: {hotel.price}</p><span className="pending">Detalles próximamente</span></article>)}
        </div>
        <div className="travel-notes"><p><strong>Airbnb recomendado:</strong> {weddingContent.accommodation.airbnb}</p><p><strong>Transporte sugerido:</strong> {weddingContent.accommodation.transportation}</p></div>
      </div>
    </section>
  );
}
