"use client";

import { useState } from "react";
import { CeremonyPeople } from "./CeremonyPeople";
import { ClosingSection } from "./ClosingSection";
import { FaqSection } from "./FaqSection";
import { Gallery } from "./Gallery";
import { GiftsSection } from "./GiftsSection";
import { Hero } from "./Hero";
import { LocationSection } from "./LocationSection";
import { RsvpForm } from "./RsvpForm";
import { SongRequestForm } from "./SongRequestForm";
import { StoryTimeline } from "./StoryTimeline";
import { WeddingDayTimeline } from "./WeddingDayTimeline";
import { WeddingTabs } from "./WeddingTabs";

const panels = {
  home: <Hero />,
  us: <><StoryTimeline /><Gallery /></>,
  day: <><WeddingDayTimeline /><FaqSection /><CeremonyPeople /><SongRequestForm /></>,
  rsvp: <RsvpForm />,
  location: <LocationSection />,
  gifts: <GiftsSection />,
  closing: <ClosingSection />,
};

export function WeddingPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof panels>("home");

  function selectTab(tabId: string) {
    if (tabId in panels) {
      setActiveTab(tabId as keyof typeof panels);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const content = activeTab === "home" ? <Hero onRsvpClick={() => selectTab("rsvp")} /> : panels[activeTab];

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
