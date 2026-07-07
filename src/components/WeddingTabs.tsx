import { weddingContent } from "@/data/wedding";

type WeddingTabsProps = {
  activeTab: string;
  onChange: (tabId: string) => void;
};

export function WeddingTabs({ activeTab, onChange }: WeddingTabsProps) {
  return (
    <nav className="wedding-tabs" aria-label="Secciones de la invitación">
      <p className="wedding-tabs__monogram" aria-hidden="true">{weddingContent.couple.monogram}</p>
      <div className="wedding-tabs__list" role="tablist" aria-label="Navegación de la boda">
        {weddingContent.navigation.map((tab) => (
          <button
            aria-controls={`panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "is-active" : ""}
            id={`tab-${tab.id}`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
