import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

export function CeremonyPeople() {
  return (
    <section className="section section--ceremony" id="ceremonia" aria-labelledby="ceremony-title">
      <div className="section__inner">
        <SectionTitle id="ceremony-title" eyebrow={weddingContent.sections.ceremony.eyebrow} title={weddingContent.ceremonyTitle} centered />
        <div className="ceremony-art-grid">
          <figure className="invitation-art">
            <img alt="" src="/images/invitation/family.webp" />
            <figcaption className="visually-hidden">
              Daniela Samperio Arce y Rodrigo Hevia Ibarrarán con su familia. Nuestros padres: Isidro Samperio y Gabriela Arce; Pilar Ibarrarán y Alejandro Hevia.
            </figcaption>
          </figure>
          <figure className="invitation-art">
            <img alt="" src="/images/invitation/godparents.webp" />
            <figcaption className="visually-hidden">
              Nuestros padrinos: Jorge Arce y Lupita Pérez; Jaqueline Padrón y Javier Ibarrarán. Siempre en nuestros corazones: Abuelo Juan Arce, Abu Fita, Abuela Luz María y Abuelo Carlos Ibarrarán.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
