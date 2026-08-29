import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { SectionTitle } from "./SectionTitle";

export function WeddingDayTimeline() {
  return (
    <>
      <section className="section section--day" id="itinerario" aria-labelledby="schedule-title">
        <div className="section__inner">
          <div className="day-grid">
            <figure className="invitation-art schedule-art">
              <img alt="Itinerario ilustrado del día de la boda" src="/images/invitation/itinerary.webp" />
            </figure>
            <div className="day-copy">
              <SectionTitle id="schedule-title" eyebrow={weddingContent.sections.day.eyebrow} title={weddingContent.sections.day.title}>
                <p>{weddingContent.sections.day.description}</p>
              </SectionTitle>
              <ol className="schedule">
                {weddingContent.schedule.map((item) => (
                  <li key={`${item.time}-${item.title}`}>
                    <time>{item.time}</time>
                    <span aria-hidden="true">{item.icon}</span>
                    <p>{item.title}</p>
                  </li>
                ))}
              </ol>
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
        </div>
      </section>

      <section className="section section--dress-code" aria-labelledby="dress-code-title">
        <div className="section__inner dress-code">
          <figure className="invitation-art dress-code__art">
            <img alt="Ilustración del código de vestimenta formal" src="/images/invitation/dress-code-clean.webp" />
          </figure>
          <div className="dress-code__copy">
            <p className="eyebrow">Dress code</p>
            <h2 id="dress-code-title">Formal</h2>
            <div className="dress-code__rules">
              <article><p className="eyebrow">Mujeres</p><h3>Vestido largo o midi</h3></article>
              <article><p className="eyebrow">Hombres</p><h3>Traje</h3><p>Corbata opcional · No tenis</p></article>
            </div>
            <Button className="dress-code__inspiration" href="https://pin.it/75ur2rDw8" variant="secondary">Inspiración</Button>
          </div>
        </div>
      </section>
    </>
  );
}
