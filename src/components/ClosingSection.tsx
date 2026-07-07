import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function ClosingSection() {
  return (
    <section className="closing" id="album" aria-labelledby="closing-title">
      <ImagePlaceholder alt="Fotografía final de Daniela y Rodrigo" className="closing__image" label="Foto pendiente" src={weddingContent.closing.imageSrc} />
      <div className="closing__content"><p className="monogram">{weddingContent.couple.monogram}</p><h2 id="closing-title">{weddingContent.closing.quote}</h2><div className="album-card"><ImagePlaceholder alt={`Código QR para ${weddingContent.photoAlbum.title}`} label="QR del álbum" src={weddingContent.photoAlbum.qrSrc} className="album-card__qr" /><div><p className="eyebrow">{weddingContent.sections.closing.albumEyebrow}</p><h3>{weddingContent.photoAlbum.title}</h3><p>{weddingContent.photoAlbum.description}</p><Button href={weddingContent.photoAlbum.url} variant="secondary">{weddingContent.sections.closing.albumButtonLabel}</Button></div></div></div>
    </section>
  );
}
