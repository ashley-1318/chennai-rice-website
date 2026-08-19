import React, { useEffect, useRef, useState } from "react";
import { MILESTONES } from "../data/content.jsx";

/**
 * The winding-road timeline.
 *
 * The road itself is a generated SVG background on .journey-map, and each pin's
 * position comes from the --i (index) and --side (which way the road bends)
 * custom properties — that geometry is pure CSS and is untouched here.
 *
 * Behaviour ported from js/journey.js: hover/focus reveals a milestone photo,
 * and because touch devices have no hover a tap toggles the same state, one open
 * at a time, dismissed by an outside tap or Escape.
 */

function JourneyStop({ milestone, index, isOpen, onToggle }) {
  const [src, setSrc] = useState(milestone.photo);
  const peekId = `peek-${index}`;

  return (
    <li className={`stop${isOpen ? " is-open" : ""}`} style={{ "--i": index, "--side": milestone.side }}>
      <button
        className={`pin pin--${milestone.tone}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls={peekId}
        onClick={onToggle}
      >
        <span className="pin-year">{milestone.year}</span>
        <svg className="pin-icon" viewBox="0 0 24 24" aria-hidden="true">
          {milestone.icon}
        </svg>
      </button>

      <span className="stop-photo" id={peekId} role="img" aria-label={milestone.label}>
        <img
          src={src}
          alt=""
          onError={() => setSrc((current) => (current === milestone.photo ? milestone.fallback : current))}
        />
      </span>

      <p className="stop-card">{milestone.text}</p>
    </li>
  );
}

export default function Journey() {
  const [openIndex, setOpenIndex] = useState(null);
  const mapRef = useRef(null);

  // Outside tap and Escape both close whatever is open.
  useEffect(() => {
    if (openIndex === null) return;

    const onPointerDown = (event) => {
      if (!mapRef.current?.contains(event.target)) setOpenIndex(null);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenIndex(null);
    };

    document.addEventListener("click", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex]);

  return (
    <section className="journey" aria-labelledby="journey-heading">
      <p className="eyebrow">Our journey</p>
      <h2 id="journey-heading">A Legacy of Growth &amp; Innovation</h2>
      <p className="journey-rule" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="currentColor" />
        </svg>
      </p>
      <p className="journey-hint">Hover a milestone to see it.</p>

      <div className="journey-map" ref={mapRef}>
        <ol className="stops">
          {MILESTONES.map((milestone, index) => (
            <JourneyStop
              key={`${milestone.year}-${index}`}
              milestone={milestone}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </ol>
      </div>

      <figure className="founder">
        <figcaption>
          <span className="founder-sign">P. Duraisami Gounder</span>
          <span className="founder-role">Founder</span>
        </figcaption>
      </figure>
    </section>
  );
}
