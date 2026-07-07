import { weddingContent } from "@/data/wedding";

const navigation = [
  ["Home", "#inicio"],
  ["Nosotros", "#historia"],
  ["Ese día", "#itinerario"],
  ["RSVP", "#rsvp"],
  ["Ubicación", "#ubicacion"],
  ["Regalos", "#regalos"],
  ["Cierre", "#cierre"],
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
    </nav>
  );
}
