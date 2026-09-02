"use client";

import { usePathname, useRouter } from "next/navigation";
import { getWeddingTabId, getWeddingTabPath, type WeddingTabId } from "@/lib/weddingRoutes";
import { CeremonyPeople } from "./CeremonyPeople";
import { AccommodationSection } from "./AccommodationSection";
import { ClosingSection } from "./ClosingSection";
import { Gallery } from "./Gallery";
import { GiftsSection } from "./GiftsSection";
import { Hero } from "./Hero";
import { LocationSection } from "./LocationSection";
import { RsvpForm } from "./RsvpForm";
import { StoryTimeline } from "./StoryTimeline";
import { WeddingDayTimeline } from "./WeddingDayTimeline";
import { WeddingTabs } from "./WeddingTabs";

const panels = {
  home: <Hero />,
  rsvp: <RsvpForm />,
  us: <><StoryTimeline /><CeremonyPeople /><Gallery /></>,
  day: <WeddingDayTimeline />,
  location: <LocationSection />,
  accommodation: <AccommodationSection />,
  gifts: <GiftsSection />,
  closing: <ClosingSection />,
};

export function WeddingPage() {
  const pathname = usePathname();
  const router = useRouter();
  const activeTab: WeddingTabId = getWeddingTabId(pathname) ?? "home";

  function selectTab(tabId: string) {
    const path = getWeddingTabPath(tabId);

    if (path) {
      router.push(path, { scroll: false });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const content = activeTab === "home" ? <Hero /> : panels[activeTab];

  return (
    <main>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <WeddingTabs activeTab={activeTab} onChange={selectTab} />
      <div aria-labelledby={`tab-${activeTab}`} id={`panel-${activeTab}`} role="tabpanel">
        <div id="contenido">{content}</div>
      </div>
    </main>
  );
}
