import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { SectionTitle } from "./SectionTitle";

type Hotel = (typeof weddingContent.accommodation.hotels)[number];

function mapsSearchUrl(hotel: Hotel) {
  const query = encodeURIComponent(`${hotel.name} Morelos`);
  return hotel.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function wazeSearchUrl(hotel: Hotel) {
  const query = encodeURIComponent(`${hotel.name} Morelos`);
  return hotel.wazeUrl || `https://waze.com/ul?q=${query}&navigate=yes`;
}

export function AccommodationSection() {
  return (
    <section className="section section--accommodation" id="hospedaje" aria-labelledby="accommodation-title">
      <div className="section__inner">
        <SectionTitle
          id="accommodation-title"
          title={weddingContent.sections.accommodation.title}
          centered
        />
        <div className="hotel-grid">
          {weddingContent.accommodation.hotels.map((hotel) => (
            <article className="hotel-card" key={hotel.id}>
              <ImagePlaceholder
                alt={`Vista de ${hotel.name}`}
                label={`Imagen de ${hotel.name}`}
                src={hotel.imageSrc}
              />
              <div className="hotel-card__body">
                <h3>{hotel.name}</h3>
                <p className="hotel-card__distance">Distancia a Piedra Alta: {hotel.distanceMinutes} min</p>
                <address>{hotel.address || "Dirección pendiente de confirmar"}</address>
                <div className="button-row hotel-card__actions">
                  <Button href={mapsSearchUrl(hotel)} variant="secondary">Google Maps</Button>
                  <Button href={wazeSearchUrl(hotel)} variant="secondary">Waze</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
