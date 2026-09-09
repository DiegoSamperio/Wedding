"use client";

import { useEffect, useRef, useState } from "react";
import { weddingContent } from "@/data/wedding";
import { SectionTitle } from "./SectionTitle";

type GalleryConfig = (typeof weddingContent.galleries)[number];

function GalleryVisual({ alt, src }: { alt: string; src: string | null }) {
  if (!src) {
    return (
      <div className="photo-placeholder" role="img" aria-label={alt}>
        <span aria-hidden="true">✦</span>
        <p>Fotografías pendientes</p>
      </div>
    );
  }

  return <img alt={alt} decoding="async" draggable={false} loading="lazy" src={src} />;
}

export function Gallery() {
  const [activeGallery, setActiveGallery] = useState<GalleryConfig | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const dragStartX = useRef<number | null>(null);

  const closeGallery = () => {
    setActiveGallery(null);
    setActiveIndex(0);
    window.requestAnimationFrame(() => lastFocusedElement.current?.focus());
  };

  const showPrevious = () => {
    if (!activeGallery) return;
    setActiveIndex((current) => (current - 1 + activeGallery.images.length) % activeGallery.images.length);
  };

  const showNext = () => {
    if (!activeGallery) return;
    setActiveIndex((current) => (current + 1) % activeGallery.images.length);
  };

  useEffect(() => {
    if (!activeGallery) return;
    const gallery = activeGallery;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
      if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(gallery.images.length - 1);
      }

      if (event.key === "Tab") {
        const dialog = closeButtonRef.current?.closest<HTMLElement>("[role='dialog']");
        const focusable = Array.from(
          dialog?.querySelectorAll<HTMLElement>("button:not([disabled]):not([tabindex='-1'])") ?? [],
        );
        const first = focusable[0];
        const last = focusable.at(-1);

        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeGallery]);

  useEffect(() => {
    if (!activeGallery) return;

    const imageCount = activeGallery.images.length;
    const adjacentImages = [
      activeGallery.images[(activeIndex - 1 + imageCount) % imageCount],
      activeGallery.images[(activeIndex + 1) % imageCount],
    ];

    adjacentImages.forEach((imageConfig) => {
      if (!imageConfig?.src) return;
      const preload = new Image();
      preload.src = imageConfig.src;
    });
  }, [activeGallery, activeIndex]);

  useEffect(() => {
    dotRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeGallery, activeIndex]);

  function openGallery(gallery: GalleryConfig) {
    lastFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveIndex(0);
    setActiveGallery(gallery);
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(delta) < 50) return;
    if (delta > 0) showPrevious();
    else showNext();
  }

  const activeImage = activeGallery?.images[activeIndex];

  return (
    <section className="section section--warm section--gallery" id="recuerdos" aria-labelledby="gallery-title">
      <div className="section__inner">
        <SectionTitle
          id="gallery-title"
          eyebrow={weddingContent.sections.gallery.eyebrow}
          title={weddingContent.sections.gallery.title}
          centered
        />
        <div className="gallery-grid">
          {weddingContent.galleries.map((gallery) => (
            <article className="gallery-card" key={gallery.id}>
              <button
                aria-haspopup="dialog"
                className="gallery-card__trigger"
                onClick={() => openGallery(gallery)}
                type="button"
              >
                <span className="gallery-card__visual">
                  <GalleryVisual alt={gallery.coverAlt} src={gallery.coverSrc} />
                </span>
                <span className="gallery-card__copy">
                  <strong>{gallery.title}</strong>
                  <span>{gallery.images.length} fotografías · Toca para ver</span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeGallery && activeImage ? (
        <div
          className="lightbox"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <div
            aria-describedby="gallery-position"
            aria-labelledby="lightbox-title"
            aria-modal="true"
            className={`lightbox__dialog lightbox__dialog--${activeImage.orientation}`}
            role="dialog"
          >
            <div className="lightbox__header">
              <h2 id="lightbox-title">{activeGallery.title}</h2>
              <button aria-label="Cerrar galería" className="lightbox__close" onClick={closeGallery} ref={closeButtonRef} type="button">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="lightbox__stage">
              <button aria-label="Fotografía anterior" className="lightbox__arrow lightbox__arrow--previous" onClick={showPrevious} type="button">
                <span aria-hidden="true">‹</span>
              </button>
              <div
                className={`lightbox__visual lightbox__visual--${activeImage.orientation}`}
                onPointerCancel={() => {
                  dragStartX.current = null;
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === "mouse" && event.button !== 0) return;
                  dragStartX.current = event.clientX;
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerUp={handlePointerEnd}
              >
                <GalleryVisual alt={activeImage.alt} src={activeImage.src} />
              </div>
              <button aria-label="Fotografía siguiente" className="lightbox__arrow lightbox__arrow--next" onClick={showNext} type="button">
                <span aria-hidden="true">›</span>
              </button>
            </div>
            <div className="lightbox__footer">
              <p aria-live="polite" className="lightbox__position" id="gallery-position">
                {activeIndex + 1} de {activeGallery.images.length}
              </p>
              <nav aria-label={`Ir a una fotografía de ${activeGallery.title}`} className="lightbox__dots">
                {activeGallery.images.map((imageConfig, index) => (
                  <button
                    aria-current={index === activeIndex ? "true" : undefined}
                    aria-label={`Ir a la fotografía ${index + 1} de ${activeGallery.images.length}`}
                    className={`lightbox__dot${index === activeIndex ? " lightbox__dot--active" : ""}`}
                    key={imageConfig.src}
                    onClick={() => setActiveIndex(index)}
                    ref={(element) => {
                      dotRefs.current[index] = element;
                    }}
                    tabIndex={index === activeIndex ? 0 : -1}
                    type="button"
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
