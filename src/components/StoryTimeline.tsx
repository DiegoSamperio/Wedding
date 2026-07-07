import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function StoryTimeline() {
  return (
    <section className="section" id="historia" aria-labelledby="story-title">
      <div className="section__inner">
        <SectionTitle eyebrow={weddingContent.sections.story.eyebrow} title={weddingContent.sections.story.title} />
        <ol className="story-timeline" id="story-title">
          {weddingContent.story.map((moment) => (
            <li key={moment.year} className="story-timeline__item">
              <p className="story-timeline__year">{moment.year}</p>
              <div className="story-timeline__content"><ImagePlaceholder label="Foto pendiente" /><div><h3>{moment.title}</h3><p>{moment.description}</p></div></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
