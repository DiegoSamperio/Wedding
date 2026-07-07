import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

export function WeddingDayTimeline() {
  return (
    <section className="section" id="itinerario" aria-labelledby="schedule-title">
      <div className="section__inner schedule-layout">
        <SectionTitle eyebrow={weddingContent.sections.day.eyebrow} title={weddingContent.sections.day.title}>
          <p>{weddingContent.sections.day.description}</p>
        </SectionTitle>
        <ol className="schedule" id="schedule-title">
          {weddingContent.schedule.map((item) => (
            <li key={`${item.time}-${item.title}`}><time>{item.time}</time><span aria-hidden="true">{item.icon}</span><p>{item.title}</p></li>
          ))}
        </ol>
        <aside className="weather-card"><span aria-hidden="true">☼</span><p className="eyebrow">Clima</p><h3>{weddingContent.sections.day.weatherTitle}</h3><p>{weddingContent.sections.day.weatherDescription}</p></aside>
      </div>
    </section>
  );
}
