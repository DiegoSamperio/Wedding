import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";

export function WeddingDayTimeline() {
  return (
    <section className="section section--day" id="itinerario" aria-labelledby="schedule-title">
      <div className="section__inner">
        <h2 className="visually-hidden" id="schedule-title">Itinerario y código de vestimenta</h2>
        <div className="day-grid">
          <figure className="invitation-art schedule-art">
            <img alt="" src="/images/invitation/itinerary.webp" />
            <figcaption className="visually-hidden">
              Itinerario del día de la boda. {weddingContent.schedule.map((item) => `${item.time}: ${item.title}.`).join(" ")}
            </figcaption>
          </figure>
          <figure className="invitation-art dress-code__art">
            <img alt="" src="/images/invitation/dress-code-clean.webp" />
            <figcaption className="visually-hidden">
              Código de vestimenta formal. Mujeres: vestido largo o midi. Hombres: traje; corbata opcional y no tenis.
            </figcaption>
            <Button className="dress-code__inspiration" href="https://pin.it/75ur2rDw8" variant="secondary">Inspiración</Button>
          </figure>
          <aside className="weather-card">
            <span aria-hidden="true">☼</span>
            <div>
              <p className="eyebrow">Clima</p>
              <h3>{weddingContent.sections.day.weatherTitle}</h3>
              <p>{weddingContent.sections.day.weatherDescription}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
