import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: string;
  id?: string;
  title: string;
  children?: ReactNode;
  centered?: boolean;
};

export function SectionTitle({ eyebrow, id, title, children, centered = false }: SectionTitleProps) {
  return (
    <header className={`section-title ${centered ? "section-title--centered" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {children ? <div className="section-title__copy">{children}</div> : null}
    </header>
  );
}
