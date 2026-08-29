import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

export function CeremonyPeople() {
  return (
    <section className="section" id="ceremonia" aria-labelledby="ceremony-title">
      <div className="section__inner">
        <SectionTitle id="ceremony-title" eyebrow={weddingContent.sections.ceremony.eyebrow} title={weddingContent.ceremonyTitle} centered />
        <div className="ceremony-art-grid">
          <figure className="invitation-art"><img alt="Ilustraciones de Daniela, Rodrigo, Bagheera y sus padres" src="/images/invitation/family.webp" /></figure>
          <figure className="invitation-art"><img alt="Ilustraciones de padrinos y familiares que viven en su recuerdo" src="/images/invitation/godparents.webp" /></figure>
        </div>
        <div className="ceremony-grid ceremony-grid--details">
          {weddingContent.ceremonyPeople.map((group) => (
            <article className="ceremony-card" key={group.id}>
              <span className="ceremony-card__ornament" aria-hidden="true">✦</span>
              <h3>{group.groupName}</h3>
              <p>{group.description}</p>
              <ul>{group.names.map((name) => <li key={name}>{name}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
