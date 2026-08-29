"use client";

import { useEffect, useState } from "react";
import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";

function getCountdownMessage(eventDate: string) {
  const remainingMilliseconds = new Date(eventDate).getTime() - Date.now();
  const days = Math.max(0, Math.ceil(remainingMilliseconds / 86_400_000));

  if (remainingMilliseconds < 0) return "Gracias por celebrar con nosotros";
  if (days <= 7) return "¡Nos vemos este fin de semana!";
  if (days <= 30) return "¡Ya falta un mes!";
  return `Faltan ${days} días`;
}

type HeroProps = {
  onRsvpClick?: () => void;
};

export function Hero({ onRsvpClick }: HeroProps) {
  const [countdown, setCountdown] = useState(() => getCountdownMessage(weddingContent.event.date));

  useEffect(() => {
    const timer = window.setInterval(
      () => setCountdown(getCountdownMessage(weddingContent.event.date)),
      60_000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="hero__monogram">{weddingContent.couple.monogram}</p>
        <h1 id="hero-title" aria-label={weddingContent.hero.title}>
          <span className="hero__name hero__name--script" aria-hidden="true">Daniela</span>
          <span className="hero__ampersand" aria-hidden="true">&</span>
          <span className="hero__name hero__name--serif" aria-hidden="true">Rodrigo</span>
        </h1>
        <p className="hero__invitation-line">{weddingContent.hero.invitationLine}</p>
        <p className="hero__date">{weddingContent.event.displayDate}</p>
        <p className="hero__time">{weddingContent.event.displayTime}</p>
        <p className="hero__location">{weddingContent.event.locationLabel}</p>
        <p className="hero__message">{weddingContent.hero.subtitle}</p>
        <p className="countdown" aria-live="polite">{countdown}</p>
        {onRsvpClick ? <Button onClick={onRsvpClick}>{weddingContent.hero.primaryCtaLabel}</Button> : <Button href={weddingContent.hero.primaryCtaHref}>{weddingContent.hero.primaryCtaLabel}</Button>}
      </div>
      <figure className="hero__art">
        <img alt="Manos de Daniela y Rodrigo con el anillo de compromiso" src="/images/hero/anillo-principal.jpg" />
      </figure>
    </section>
  );
}
