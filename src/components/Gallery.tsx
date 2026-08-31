import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

const moments = [
  { src: "/images/invitation/moment-couple-clean.webp", title: "Daniela & Rodrigo", note: "Nuestro para siempre" },
  { src: "/images/invitation/moment-envelope.webp", title: "La invitación", note: "20 de marzo de 2027" },
  { src: "/images/invitation/moment-parents-clean.webp", title: "Nuestros padres", note: "El amor que nos formó" },
  {
    src: "/images/invitation/moment-padrinos-clean.png",
    title: "Nuestros padrinos",
    note: "Quienes caminan con nosotros",
    names: "Jorge Arce & Lupita Pérez | Jaqueline Padrón & Javier Ibarrarán",
  },
  { src: "/images/invitation/moment-memorial.webp", title: "En nuestros corazones", note: "Siempre presentes" },
  { src: "/images/invitation/moment-outfits-clean.webp", title: "Nos vemos ese día", note: "Listos para celebrar" },
];

export function Gallery() {
  return (
    <section className="section section--warm" aria-labelledby="gallery-title">
      <div className="section__inner">
        <SectionTitle id="gallery-title" eyebrow={weddingContent.sections.gallery.eyebrow} title={weddingContent.sections.gallery.title} centered />
        <div className="gallery-grid">
          {moments.map((moment) => (
            <article className="gallery-moment" key={moment.src}>
              <div className="gallery-moment__visual">
                <img alt={moment.title} src={moment.src} />
                {moment.names ? <strong className="gallery-moment__names">{moment.names}</strong> : null}
              </div>
              <p>{moment.title}</p><span>{moment.note}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
