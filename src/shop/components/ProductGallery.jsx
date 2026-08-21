import React, { useState } from "react";

/**
 * Only real photos are ever shown — most packs currently have just the one
 * front-of-bag shot, so the thumbnail row and arrows simply don't render
 * when there's nothing to switch between.
 */
export default function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;
  const current = images[active] || images[0];

  const go = (delta) => {
    setActive((i) => (i + delta + images.length) % images.length);
  };

  return (
    <div className="pdp-gallery">
      <figure className="pdp-gallery-main">
        <img src={current.src} alt={current.alt || alt} loading="eager" />
      </figure>

      {hasMultiple && (
        <div className="pdp-gallery-thumbs" role="tablist" aria-label="Product images">
          <button
            type="button"
            className="pdp-gallery-arrow"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            &#8249;
          </button>
          <div className="pdp-gallery-thumb-track">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`pdp-gallery-thumb${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <img src={img.src} alt={img.alt || ""} loading="lazy" />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pdp-gallery-arrow"
            onClick={() => go(1)}
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}
