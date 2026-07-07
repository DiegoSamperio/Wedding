"use client";

import { useEffect, useState } from "react";
import { weddingContent } from "@/data/wedding";
import { Button } from "./Button";
import { ImagePlaceholder } from "./ImagePlaceholder";

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
      <div className="hero__floral" aria-hidden="true">✦</div>
      <ImagePlaceholder className="hero__placeholder" label="Foto de la pareja pendiente" />
      <div className="hero__content">
        <p className="monogram">{weddingContent.couple.monogram}</p>
        <p className="eyebrow">{weddingContent.hero.eyebrow}</p>
        <h1 id="hero-title">{weddingContent.hero.title}</h1>
        <p className="hero__location">{weddingContent.event.locationLabel}</p>
        <p className="hero__message">{weddingContent.hero.subtitle}</p>
        <p className="countdown" aria-live="polite">{countdown}</p>
        {onRsvpClick ? <Button onClick={onRsvpClick}>{weddingContent.hero.primaryCtaLabel}</Button> : <Button href={weddingContent.hero.primaryCtaHref}>{weddingContent.hero.primaryCtaLabel}</Button>}
      </div>
    </section>
  );
}
