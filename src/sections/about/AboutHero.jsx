import React, { useMemo } from "react";
import { HERO } from "../../data/about.jsx";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import { useTypewriter } from "../../hooks/useTypewriter.js";

// Floating rice grains — generated once, animated entirely in CSS.
function Particles({ count }) {
  const grains = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const s = (n) => ((Math.sin(i * 12.9898 + n) * 43758.5453) % 1 + 1) % 1;
        return {
          left: `${(s(1) * 100).toFixed(2)}%`,
          // long, lazy drifts — the hero should feel still, not busy
          dur: `${(26 + s(2) * 22).toFixed(1)}s`,
          delay: `${(-s(3) * 34).toFixed(1)}s`,
          drift: `${(s(4) * 90 - 45).toFixed(0)}px`,
          scale: 0.4 + s(5) * 0.7,
          peak: (0.14 + s(6) * 0.26).toFixed(2)
        };
      }),
    [count]
  );
  return (
    <div className="ab-particles" aria-hidden="true">
      {grains.map((g, i) => (
        <i
          key={i}
          className="ab-grain"
          style={{
            left: g.left,
            bottom: "-6vh",
            "--dur": g.dur,
            "--delay": g.delay,
            "--drift": g.drift,
            "--peak": g.peak,
            transform: `scale(${g.scale})`
          }}
        />
      ))}
    </div>
  );
}

/**
 * Type-only opening. No photography here on purpose — the page earns its
 * imagery further down, and an empty, quiet first screen makes the typed
 * headline the single thing to look at.
 */
export default function AboutHero() {
  const reduced = useReducedMotion();
  const { text, done } = useTypewriter(HERO.phrases, {
    typeMs: 95,
    deleteMs: 45,
    holdMs: 2800,
    gapMs: 700
  });

  return (
    <section className="ab-hero" aria-labelledby="about-hero-heading">
      {!reduced && <Particles count={10} />}

      {/* shell centres the column; the copy block is flush-left inside it, so
          the hero aligns with every section below rather than floating */}
      <div className="about-shell">
        <div className="ab-hero-copy">
        <p className="eyebrow">{HERO.eyebrow}</p>

        <h1 id="about-hero-heading" className="ab-display ab-typed">
          <span aria-hidden="true">
            {text}
            <span className={`ab-caret${done ? " is-blinking" : ""}`} />
          </span>
          <span className="visually-hidden">{HERO.phrases.join(". ")}</span>
        </h1>

        <p className="ab-hero-quote">{HERO.sub}</p>

        <dl className="ab-hero-meta">
          <div>
            <dt>Since</dt>
            <dd>1950s</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>Erode, TN</dd>
          </div>
          <div>
            <dt>Reach</dt>
            <dd>Pan-India</dd>
          </div>
        </dl>
        </div>
      </div>

      <p className="ab-scroll-cue" aria-hidden="true">
        Scroll
        <span />
      </p>
    </section>
  );
}
