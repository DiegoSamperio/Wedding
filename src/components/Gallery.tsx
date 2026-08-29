import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

const moments = [
  { src: "/images/invitation/moment-couple.webp", title: "Daniela & Rodrigo", note: "Nuestro para siempre" },
  { src: "/images/invitation/moment-envelope.webp", title: "La invitación", note: "20 de marzo de 2027" },
  { src: "/images/invitation/moment-parents.webp", title: "Nuestros padres", note: "El amor que nos formó" },
  { src: "/images/invitation/moment-padrinos.webp", title: "Nuestros padrinos", note: "Quienes caminan con nosotros" },
  { src: "/images/invitation/moment-memorial.webp", title: "En nuestros corazones", note: "Siempre presentes" },
  { src: "/images/invitation/moment-outfits.webp", title: "Nos vemos ese día", note: "Listos para celebrar" },
];

export function Gallery() {
  return (
    <section className="section section--warm" aria-labelledby="gallery-title">
      <div className="section__inner">
        <SectionTitle id="gallery-title" eyebrow={weddingContent.sections.gallery.eyebrow} title={weddingContent.sections.gallery.title} centered />
        <div className="gallery-grid">
          {moments.map((moment) => (
            <article className="gallery-moment" key={moment.src}>
              <img alt={moment.title} src={moment.src} />
              <p>{moment.title}</p><span>{moment.note}</span>
            </article>
          ))}
        </div>
        <p className="gallery-note">Una selección ilustrada de nuestra invitación. Más adelante podremos sumar aquí fotografías personales.</p>
      </div>
    </section>
  );
}
