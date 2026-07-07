import { weddingContent } from "@/data/wedding";

const navigation = [
  ["Nuestra historia", "#historia"],
  ["Ese día", "#itinerario"],
  ["Ceremonia", "#ceremonia"],
  ["Ubicación", "#ubicacion"],
  ["Regalos", "#regalos"],
] as const;

export function SiteNavigation() {
  return (
    <nav className="site-nav" aria-label="Navegación principal">
      <a className="site-nav__mark" href="#inicio" aria-label={weddingContent.couple.eventName}>
        {weddingContent.couple.initials}
      </a>
      <div className="site-nav__links">
        {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </div>
      <a className="site-nav__rsvp" href={weddingContent.hero.primaryCtaHref}>RSVP</a>
    </nav>
  );
}
