import React from "react";
import { VALUES } from "../../data/about.jsx";
import { useTilt, useParallax } from "../../hooks/useScrollFx.js";

function ValueCard({ value, index }) {
  const ref = useTilt(9);
  return (
    // cards continue the sweep, each one a beat behind the last
    <article className={`ab-value reveal reveal--left d${Math.min(index + 1, 3)}`} ref={ref}>
      <span className="ab-value-num">{value.num}</span>
      <svg className="ab-value-icon" viewBox="0 0 24 24" aria-hidden="true">
        {value.icon}
      </svg>
      <h3>{value.name}</h3>
      <p>{value.copy}</p>
    </article>
  );
}

export default function Values() {
  const mediaRef = useParallax(0.09);

  return (
    <section className="ab-values" aria-labelledby="values-heading">
      {/* a photograph behind the glass, otherwise transparent cards have
          nothing to be transparent against */}
      <div className="ab-values-media" ref={mediaRef}>
        <img src="/assets/about/hero-field.png" alt="" aria-hidden="true" />
      </div>

      <div className="about-shell">
        {/* whole section sweeps in left-to-right: eyebrow, then heading, then
            each card in turn */}
        <p className="eyebrow reveal reveal--left">What we stand for</p>
        <h2 id="values-heading" className="ab-display reveal reveal--left d1">
          Our values
        </h2>
        <div className="ab-value-grid">
          {VALUES.map((value, i) => (
            <ValueCard key={value.name} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
