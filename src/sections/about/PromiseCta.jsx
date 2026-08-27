import React from "react";
import { CTA } from "../../data/about.jsx";
import { useParallax } from "../../hooks/useScrollFx.js";

/**
 * Layout 4: the close, on one canvas — the whole workforce, photographed
 * together, standing in for the "1,000+ people" the copy names rather than
 * illustrating it with a stock or product shot.
 */
export default function PromiseCta() {
  const mediaRef = useParallax(0.08);

  return (
    <section className="ab-cta" aria-labelledby="cta-heading">
      <div className="ab-cta-media" ref={mediaRef}>
        <img
          src="/assets/people.png"
          alt="Chennai Rice Industries' 1,000+ strong workforce standing together in a paddy field"
        />
      </div>

      <div className="ab-cta-inner">
        <h2 id="cta-heading" className="ab-display ab-cta-title reveal">
          {CTA.heading.map((line) => (
            <span className="ab-line" key={line}>
              {line}
            </span>
          ))}
        </h2>

        <div className="ab-people-copy">
          {CTA.paragraphs.map((paragraph, index) => (
            <p key={paragraph.slice(0, 24)} className={`reveal d${Math.min(index + 1, 3)}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
