import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function CeremonyPeople() {
  return (
    <section className="section" id="ceremonia" aria-labelledby="ceremony-title">
      <div className="section__inner">
        <SectionTitle eyebrow={weddingContent.sections.ceremony.eyebrow} title={weddingContent.ceremonyTitle} centered />
        <div className="ceremony-grid" id="ceremony-title">
          {weddingContent.ceremonyPeople.map((group) => (
            <article className="ceremony-card" key={group.id}>
              <ImagePlaceholder alt={`Ilustración en acuarela para ${group.groupName}`} label="Ilustración pendiente" src={group.illustrationSrc} className="watercolor-placeholder" />
              <h3>{group.groupName}</h3><p>{group.description}</p>
              {group.names.length > 0 ? <ul>{group.names.map((name) => <li key={name}>{name}</li>)}</ul> : <span className="pending">Nombres próximamente</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
