"use client";

import { useEffect, useRef, useState } from "react";

type ImagePlaceholderProps = {
  label: string;
  src?: string;
  alt?: string;
  className?: string;
  expectedPath?: string;
};

export function ImagePlaceholder({ label, src, alt = "", className = "", expectedPath }: ImagePlaceholderProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setIsLoaded(true);
  }, [src]);

  return (
    <div className={`image-placeholder ${isLoaded ? "is-loaded" : "is-pending"} ${className}`.trim()}>
      {src ? (
        <img
          ref={imageRef}
          src={src}
          alt={isLoaded ? alt : ""}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(false)}
        />
      ) : null}
      {!isLoaded ? (
        <div className="image-placeholder__fallback" role={alt ? "img" : undefined} aria-label={alt || undefined}>
          <span aria-hidden="true">✦</span>
          <p>{label}</p>
          {expectedPath ? <small>{expectedPath}</small> : null}
        </div>
      ) : null}
    </div>
  );
}
