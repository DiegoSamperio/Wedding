import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

export function StoryTimeline() {
  return (
    <section className="section section--story" id="historia" aria-labelledby="story-title">
      <div className="section__inner">
        <div className="story-layout">
          <figure className="invitation-art story-art">
            <img alt="Línea del tiempo ilustrada de la historia de Daniela y Rodrigo" src="/images/invitation/story.webp" />
          </figure>
          <div className="story-copy">
            <SectionTitle id="story-title" eyebrow={weddingContent.sections.story.eyebrow} title={weddingContent.sections.story.title} />
            <ol className="story-timeline">
              {weddingContent.story.map((moment) => (
                <li key={moment.year} className="story-timeline__item">
                  <p className="story-timeline__year">{moment.year}</p>
                  <div className="story-timeline__content">
                    <h3>{moment.title}</h3>
                    <p>{moment.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="story-continuation">Continuará…</p>
          </div>
        </div>
      </div>
    </section>
  );
}
