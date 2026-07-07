import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function Gallery() {
  return (
    <section className="section section--warm" aria-labelledby="gallery-title">
      <div className="section__inner">
        <SectionTitle eyebrow={weddingContent.sections.gallery.eyebrow} title={weddingContent.sections.gallery.title} centered />
        <div className="gallery-grid" id="gallery-title">
          {weddingContent.galleries.flatMap((gallery) => Array.from({ length: 4 }, (_, index) => (
            <article className="gallery-placeholder" key={`${gallery.id}-${index}`}>
              <ImagePlaceholder label="Foto pendiente" />
              <p>{gallery.title}</p><span>Foto {index + 1}</span>
            </article>
          )))}
        </div>
      </div>
    </section>
  );
}
