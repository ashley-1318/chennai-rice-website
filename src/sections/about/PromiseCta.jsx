import React from "react";
import { Link } from "react-router-dom";
import { CTA } from "../../data/about.jsx";
import { useParallax } from "../../hooks/useScrollFx.js";

/**
 * Layout 4: the promise and the close, on one canvas.
 *
 * The Chennai Central silhouette runs as a landmark band above the CTA — the
 * same building that sits inside the company emblem. It is loaded from
 * /assets/about/chennai-central.png and simply removes itself if that file is
 * absent, so the section never shows a broken image.
 */
export default function PromiseCta() {
  const mediaRef = useParallax(0.08);

  return (
    <section className="ab-cta" aria-labelledby="cta-heading" id="contact">
      {/* a bowl of rice behind the close — no silhouette overlay */}
      <div className="ab-cta-media" ref={mediaRef}>
        <img src="/assets/about/curd-rice.webp" alt="" aria-hidden="true" />
      </div>

      <div className="ab-cta-inner">
        <p className="eyebrow reveal">{CTA.eyebrow}</p>
        <p className="ab-promise-line reveal d1">{CTA.promise}</p>

        <h2 id="cta-heading" className="ab-display ab-cta-title reveal d2">
          {CTA.heading.map((line) => (
            <span className="ab-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <div className="ab-buttons reveal d3">
          <Link className="ab-btn ab-btn--solid" to={CTA.primary.to}>
            {CTA.primary.label}
          </Link>
          <a className="ab-btn ab-btn--ghost" href={CTA.secondary.href}>
            {CTA.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
