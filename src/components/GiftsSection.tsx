import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { CopyButton } from "./CopyButton";
import { SectionTitle } from "./SectionTitle";

export function GiftsSection() {
  const { giftRegistry } = weddingContent;
  return (
    <section className="section section--warm" id="regalos" aria-labelledby="gifts-title">
      <div className="section__inner">
        <SectionTitle eyebrow={weddingContent.sections.gifts.eyebrow} title={weddingContent.sections.gifts.title} centered><p>{giftRegistry.intro}</p></SectionTitle>
        <div className="gifts-grid" id="gifts-title">
          {giftRegistry.registries.map((registry) => <article className="gift-card" key={registry.id}><p className="eyebrow">{weddingContent.sections.gifts.eyebrow}</p><h3>{registry.name}</h3>{registry.eventName ? <p>{registry.eventName}</p> : null}<p className="gift-number">Evento {registry.eventNumber}</p><CopyButton value={registry.eventNumber} label="Copiar número de evento" /><Button href={registry.url} variant="secondary">{registry.buttonLabel}</Button></article>)}
          <article className="gift-card gift-card--bank"><p className="eyebrow">Transferencia bancaria</p><h3>{giftRegistry.bankTransfer.bank}</h3><dl><div><dt>Beneficiario</dt><dd>{giftRegistry.bankTransfer.beneficiary}</dd></div><div><dt>Cuenta</dt><dd>{giftRegistry.bankTransfer.accountNumber}</dd></div><div><dt>CLABE</dt><dd>{giftRegistry.bankTransfer.clabe}</dd></div><div><dt>Concepto</dt><dd>{giftRegistry.bankTransfer.suggestedConcept}</dd></div></dl><CopyButton value={giftRegistry.bankTransfer.accountNumber} label={giftRegistry.bankTransfer.copyAccountLabel} /><CopyButton value={giftRegistry.bankTransfer.clabe} label={giftRegistry.bankTransfer.copyClabeLabel} /></article>
        </div>
      </div>
    </section>
  );
}
