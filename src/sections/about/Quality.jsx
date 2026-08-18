import React, { useState } from "react";
import { QUALITY, NETWORK } from "../../data/about.jsx";

const Tick = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
    <path d="M7.5 12.4l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PHOTO = "/assets/about/grains.jpg";
const FALLBACK = "/assets/about/grain-macro.svg";

export function Quality() {
  const [src, setSrc] = useState(PHOTO);

  return (
    <section className="ab-quality" aria-labelledby="quality-heading">
      <div className="about-shell ab-quality-grid">
        <div>
          <p className="eyebrow reveal">{QUALITY.eyebrow}</p>
          <h2 id="quality-heading" className="reveal d1">
            {QUALITY.heading}
          </h2>
          <p className="reveal d1">{QUALITY.copy}</p>
          <ul className="ab-check reveal d2">
            {QUALITY.checks.map((check) => (
              <li key={check}>
                <Tick />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="ab-figure reveal d2" style={{ margin: 0, aspectRatio: "3 / 2" }}>
          <img
            src={src}
            alt="Close-up of polished rice grains being inspected"
            onError={() => setSrc((c) => (c === PHOTO ? FALLBACK : c))}
          />
        </figure>
      </div>
    </section>
  );
}

export function Network() {
  return (
    <section className="ab-scale" aria-labelledby="network-heading">
      <div className="about-shell">
        <p className="eyebrow reveal">{NETWORK.eyebrow}</p>
        <h2 id="network-heading" className="reveal d1">
          {NETWORK.heading}
        </h2>
        <p className="reveal d1" style={{ maxWidth: "54ch" }}>
          {NETWORK.copy}
        </p>

        <div className="ab-stats ab-stats--six reveal d2">
          {NETWORK.reach.map((item) => (
            <div className="ab-stat" key={item.label}>
              <p className="ab-stat-value">{item.value}</p>
              <p className="ab-stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
