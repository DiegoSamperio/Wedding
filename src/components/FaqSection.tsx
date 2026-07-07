"use client";

import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

export function FaqSection() {
  return (
    <section className="section section--warm" aria-labelledby="faq-title">
      <div className="section__inner">
        <SectionTitle eyebrow={weddingContent.sections.faq.eyebrow} title={weddingContent.sections.faq.title} />
        <div className="faq-list" id="faq-title">
          {weddingContent.faq.map((item) => (
            <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}
