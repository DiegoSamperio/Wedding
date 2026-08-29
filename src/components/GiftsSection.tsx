import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { CopyButton } from "./CopyButton";
import { SectionTitle } from "./SectionTitle";

export function GiftsSection() {
  const { giftRegistry } = weddingContent;

  return (
    <section className="section section--gifts" id="regalos" aria-labelledby="gifts-title">
      <div className="section__inner">
        <div className="gifts-layout">
          <figure className="invitation-art gifts-art"><img alt="Ilustración de mesa de regalos de la invitación" src="/images/invitation/gifts.webp" /></figure>
          <div className="gifts-content">
            <SectionTitle id="gifts-title" eyebrow={weddingContent.sections.gifts.eyebrow} title={weddingContent.sections.gifts.title}>
              <p>{giftRegistry.intro}</p>
            </SectionTitle>
            <div className="gifts-frame">
          <div className="gifts-grid">
            {giftRegistry.registries.map((registry) => (
              <article className="gift-card" key={registry.id}>
                <p className="eyebrow">Mesa de regalos</p>
                <h3>{registry.name}</h3>
                {registry.eventName ? <p>{registry.eventName}</p> : null}
                {registry.eventNumber ? (
                  <>
                    <p className="gift-number">Evento {registry.eventNumber}</p>
                    <CopyButton value={registry.eventNumber} label="Copiar número de evento" />
                  </>
                ) : null}
                <Button href={registry.url} variant="secondary">{registry.buttonLabel}</Button>
              </article>
            ))}

            <article className="gift-card gift-card--bank">
              <p className="eyebrow">Una aportación para nuestro futuro</p>
              <h3>{giftRegistry.bankTransfer.title}</h3>
              <dl>
                <div><dt>Banco</dt><dd>{giftRegistry.bankTransfer.bank}</dd></div>
                <div><dt>Beneficiario</dt><dd>{giftRegistry.bankTransfer.beneficiary}</dd></div>
                <div><dt>CLABE</dt><dd>{giftRegistry.bankTransfer.displayClabe}</dd></div>
              </dl>
              <CopyButton value={giftRegistry.bankTransfer.clabe} label={giftRegistry.bankTransfer.copyClabeLabel} />
              <Button href={giftRegistry.bankTransfer.url} variant="secondary">Ver Fondo Costco</Button>
            </article>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
