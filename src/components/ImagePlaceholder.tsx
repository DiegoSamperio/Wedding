"use client";

import { useState } from "react";

type ImagePlaceholderProps = {
  label: string;
  src?: string;
  alt?: string;
  className?: string;
};

export function ImagePlaceholder({ label, src, alt = "", className = "" }: ImagePlaceholderProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const canShowImage = Boolean(src) && !hasImageError;

  return (
    <div className={`image-placeholder ${className}`.trim()}>
      {canShowImage ? (
        <img src={src} alt={alt} onError={() => setHasImageError(true)} />
      ) : (
        <div className="image-placeholder__fallback" role={alt ? "img" : undefined} aria-label={alt || undefined}>
          <span aria-hidden="true">✦</span>
          <p>{label}</p>
        </div>
      )}
    </div>
  );
}
