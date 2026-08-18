import React, { useState } from "react";
import { STORY, FOUNDER } from "../../data/about.jsx";

const PHOTO = "/assets/about/story.jpg";
const FALLBACK = "/assets/about/tamil-nadu.svg";

export default function OurStory() {
  const [src, setSrc] = useState(PHOTO);

  return (
    <section className="ab-story" aria-labelledby="story-heading">
      <div className="about-shell ab-story-grid">
        <figure className="ab-figure reveal" style={{ margin: 0, aspectRatio: "4 / 3" }}>
          <img
            src={src}
            alt="Paddy fields and traditional agricultural landscape in Tamil Nadu"
            onError={() => setSrc((c) => (c === PHOTO ? FALLBACK : c))}
          />
        </figure>

        <div>
          <p className="eyebrow reveal">{STORY.eyebrow}</p>
          <h2 id="story-heading" className="reveal d1">
            {STORY.heading}
          </h2>
          <p className="ab-lede reveal d1">{STORY.lede}</p>
          {STORY.paragraphs.map((text, i) => (
            <p key={i} className={`reveal d${Math.min(i + 1, 3)}`}>
              {text}
            </p>
          ))}
          <p className="ab-pull reveal d3">{STORY.pull}</p>
        </div>
      </div>

      {/* Founder */}
      <div className="about-shell" style={{ marginTop: "clamp(3rem, 7vw, 6rem)" }}>
        <div className="ab-story-grid">
          <div>
            <p className="eyebrow reveal">Our Founder</p>
            <h2 className="reveal d1">{FOUNDER.name}</h2>
            <p
              className="reveal d1"
              style={{
                margin: "0 0 1.2rem",
                fontFamily: "var(--serif)",
                fontSize: "1.05rem",
                color: "var(--gold)",
                letterSpacing: "0.08em"
              }}
            >
              {FOUNDER.role}
            </p>
            <p className="reveal d2">{FOUNDER.copy}</p>
            <p className="ab-pull reveal d3">“{FOUNDER.quote}”</p>
          </div>
          <figure className="ab-figure reveal d2" style={{ margin: 0, aspectRatio: "4 / 3" }}>
            <img src="/assets/about/grain-macro.svg" alt="Close-up of polished rice grains" />
          </figure>
        </div>
      </div>
    </section>
  );
}
