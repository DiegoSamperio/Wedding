"use client";

import { useMemo, useState } from "react";
import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { SectionTitle } from "./SectionTitle";
import { ImagePlaceholder } from "./ImagePlaceholder";

type Hotel = (typeof weddingContent.accommodation.hotels)[number];

const filterGroups = {
  time: ["under-10", "10-20", "over-20"],
  price: ["under-1500", "1500-2000", "over-2000", "consult"],
  rating: ["rating-45", "rating-40", "rating-unconfirmed"],
} as const;

const filters = [
  { id: "all", label: "Todos" },
  { id: "under-10", label: "Menos de 10 min" },
  { id: "10-20", label: "10-20 min" },
  { id: "over-20", label: "Más de 20 min" },
  { id: "under-1500", label: "Menos de $1,500" },
  { id: "1500-2000", label: "$1,500-$2,000" },
  { id: "over-2000", label: "Más de $2,000" },
  { id: "consult", label: "Consultar tarifa" },
  { id: "rating-45", label: "4.5+" },
  { id: "rating-40", label: "4.0+" },
  { id: "rating-unconfirmed", label: "Sin calificación confirmada" },
] as const;

function mapsSearchUrl(hotel: Hotel) {
  const query = encodeURIComponent(`${hotel.name} Morelos`);
  return hotel.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function wazeSearchUrl(hotel: Hotel) {
  const query = encodeURIComponent(`${hotel.name} Morelos`);
  return hotel.wazeUrl || `https://waze.com/ul?q=${query}&navigate=yes`;
}

function getDistanceBucket(hotel: Hotel) {
  if (hotel.distanceMinutes < 10) return "under-10";
  if (hotel.distanceMinutes <= 20) return "10-20";
  return "over-20";
}

function matchesGroup(activeFilters: string[], group: readonly string[], predicate: (filterId: string) => boolean) {
  const activeGroupFilters = activeFilters.filter((filterId) => group.includes(filterId));
  return activeGroupFilters.length === 0 || activeGroupFilters.some(predicate);
}

function matchesFilters(hotel: Hotel, activeFilters: string[]) {
  return (
    matchesGroup(activeFilters, filterGroups.time, (filterId) => getDistanceBucket(hotel) === filterId) &&
    matchesGroup(activeFilters, filterGroups.price, (filterId) => hotel.priceBand === filterId) &&
    matchesGroup(activeFilters, filterGroups.rating, (filterId) => {
      if (filterId === "rating-unconfirmed") return hotel.ratingValue === null;
      if (filterId === "rating-45") return hotel.ratingValue !== null && hotel.ratingValue >= 4.5;
      return hotel.ratingValue !== null && hotel.ratingValue >= 4;
    })
  );
}

export function LocationSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const visibleHotels = useMemo(
    () => weddingContent.accommodation.hotels.filter((hotel) => matchesFilters(hotel, activeFilters)),
    [activeFilters],
  );

  function toggleFilter(filterId: string) {
    if (filterId === "all") {
      setActiveFilters([]);
      return;
    }

    setActiveFilters((currentFilters) =>
      currentFilters.includes(filterId)
        ? currentFilters.filter((currentFilter) => currentFilter !== filterId)
        : [...currentFilters, filterId],
    );
  }

  return (
    <section className="section" id="ubicacion" aria-labelledby="location-title">
      <div className="section__inner">
        <SectionTitle eyebrow={weddingContent.sections.location.eyebrow} title={weddingContent.sections.location.title} />
        <div className="location-grid" id="location-title">
          <article className="location-card location-card--main">
            <p className="eyebrow">{weddingContent.event.venueName}</p>
            <h3>{weddingContent.event.locationLabel}</h3>
            <address>{weddingContent.event.address}</address>
            <div className="button-row">
              <Button href={weddingContent.event.googleMapsUrl} variant="secondary">Abrir en Google Maps</Button>
              <Button href={weddingContent.event.wazeUrl} variant="secondary">Abrir en Waze</Button>
            </div>
          </article>
          <ImagePlaceholder
            alt="Croquis o mapa de llegada a Piedra Alta"
            className="location-map"
            label={weddingContent.sections.location.mapLabel}
          />
        </div>

        <div className="accommodation-heading">
          <p className="eyebrow">Hospedaje</p>
          <h3>{weddingContent.accommodation.title}</h3>
          <p>{weddingContent.accommodation.intro}</p>
        </div>

        <div className="hotel-filters" aria-label="Filtros de hospedaje">
          {filters.map((filter) => {
            const isActive = filter.id === "all" ? activeFilters.length === 0 : activeFilters.includes(filter.id);
            return (
              <button
                aria-pressed={isActive}
                className={isActive ? "is-active" : ""}
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="hotel-grid">
          {visibleHotels.map((hotel) => (
            <article className="hotel-card" key={hotel.id}>
              <ImagePlaceholder alt={hotel.name} label="Imagen de hotel pendiente" src={hotel.imageSrc} />
              <div className="hotel-card__body">
                <p className="eyebrow">Hospedaje</p>
                <h3>{hotel.name}</h3>
                <dl className="hotel-meta">
                  <div><dt>Distancia</dt><dd>{hotel.distance} a Piedra Alta</dd></div>
                  {hotel.address ? <div><dt>Dirección</dt><dd>{hotel.address}</dd></div> : null}
                  <div><dt>Precio</dt><dd>{hotel.price}</dd></div>
                  <div><dt>Calificación</dt><dd>{hotel.rating}</dd></div>
                  {hotel.reviewCount ? <div><dt>Reseñas</dt><dd>{hotel.reviewCount}</dd></div> : null}
                </dl>
                <p className="hotel-card__description">{hotel.description}</p>
                <div className="hotel-tags" aria-label={`Tags de ${hotel.name}`}>
                  {hotel.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="button-row hotel-card__actions">
                  <Button href={mapsSearchUrl(hotel)} variant="secondary">Google Maps</Button>
                  <Button href={wazeSearchUrl(hotel)} variant="secondary">Waze</Button>
                  {hotel.url ? <Button href={hotel.url} variant="secondary">Ver hotel</Button> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        {visibleHotels.length === 0 ? (
          <p className="hotel-empty" role="status">No hay hoteles que coincidan con esos filtros.</p>
        ) : null}
      </div>
    </section>
  );
}
