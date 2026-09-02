import { weddingContent } from "@/data/wedding";
export function StoryTimeline() {
  return (
    <section className="section section--story" id="historia" aria-labelledby="story-title">
      <div className="section__inner">
        <h2 className="visually-hidden" id="story-title">Nuestra historia</h2>
        <figure className="invitation-art story-art">
          <img alt="" src="/images/invitation/story.webp" />
          <figcaption className="visually-hidden">
            Nuestra historia. {weddingContent.story.map((moment) => `${moment.year}: ${moment.title} ${moment.description}`).join(" ")} Continuará.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
