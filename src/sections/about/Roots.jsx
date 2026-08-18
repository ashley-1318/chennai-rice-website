import React, { useState } from "react";
import { ROOTS } from "../../data/about.jsx";
import { useParallax } from "../../hooks/useScrollFx.js";

const PHOTO = "/assets/about/tamil-nadu.jpg";
const FALLBACK = "/assets/about/tamil-nadu.svg";

export default function Roots() {
  const mediaRef = useParallax(0.12);
  const [src, setSrc] = useState(PHOTO);

  return (
    <section className="ab-roots" aria-labelledby="roots-heading">
      <div className="ab-roots-media" ref={mediaRef}>
        <img
          src={src}
          alt="Tamil Nadu paddy landscape"
          onError={() => setSrc((c) => (c === PHOTO ? FALLBACK : c))}
        />
      </div>

      <div className="about-shell">
        <p className="eyebrow reveal">{ROOTS.eyebrow}</p>
        <h2 id="roots-heading" className="reveal d1">
          {ROOTS.heading}
        </h2>
        <p className="reveal d1">{ROOTS.copy}</p>

        <ul className="ab-roots-list reveal d2">
          {ROOTS.points.map((point) => (
            <li key={point.title}>
              <strong>{point.title}</strong>
              {point.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
