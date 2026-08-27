import React, { useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../layouts/SiteLayout.jsx";
import FeatureStrip from "../sections/FeatureStrip.jsx";
import { FOUNDER } from "../data/founder.js";
import { SCALE } from "../data/about.jsx";
import { useCountUp } from "../hooks/useCountUp.js";
import { useRevealGroup } from "../hooks/useScrollFx.js";
import usePageMeta from "../hooks/usePageMeta.js";

const GLANCE_ICONS = {
  Name: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  Role: <path d="M6 20V5a1 1 0 0 1 1-1h9l-1.5 4L16 12H7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  "Company since": <path d="M4 9h16M7 4v3M17 4v3M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  Heritage: (
    <>
      <path d="M12 21V10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 10c0-3.5 2.6-6 6-6 0 3.5-2.6 6-6 6zm0 3c0-3-2.4-5.4-5.4-5.4C6.6 10.6 9 13 12 13z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </>
  ),
  Facility: <path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
  Focus: <path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
};

function StatFigure({ figure }) {
  const { ref, value } = useCountUp(figure.to);
  return (
    <div className="fp-stat" ref={ref}>
      <p className="fp-stat-value">
        {value.toLocaleString("en-IN")}
        <span>{figure.suffix}</span>
      </p>
      <p className="fp-stat-unit">{figure.unit}</p>
      <p className="fp-stat-label">{figure.label}</p>
    </div>
  );
}

/**
 * A dedicated page for the founder, linked from the About page's founder
 * card. Every figure and fact here is pulled from FOUNDER (src/data/founder.js)
 * and SCALE (already used on the About page), so nothing on this page can
 * drift out of sync with what the rest of the site says.
 */
export default function FounderPage() {
  const pageRef = useRevealGroup();
  const [photoMissing, setPhotoMissing] = useState(false);

  usePageMeta(
    "Meet Our Founder — Chennai Rice",
    `${FOUNDER.name}, ${FOUNDER.title} of Chennai Rice Industries.`
  );

  return (
    <SiteLayout skipTo="founder-heading" skipLabel="Skip to content">
      <div className="founder-page" ref={pageRef}>
        <nav className="fp-crumb fp-shell" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Meet Our Founder</span>
        </nav>

        <section className="fp-hero fp-shell">
          <div className="fp-hero-grid">
            <div className="fp-hero-note reveal reveal--left">
              <p className="fp-eyebrow">{FOUNDER.eyebrow}</p>
              <p className="fp-intro">{FOUNDER.intro}</p>
            </div>

            <h1 id="founder-heading" className="fp-hero-title reveal">
              {FOUNDER.heading}
            </h1>

            {/* no reveal class on the stage: its transform would create a
                stacking context and trap the disc behind the headline */}
            <div className="fp-hero-stage">
              <span className="fp-disc" aria-hidden="true" />
              <div className={`fp-hero-photo${photoMissing ? " fp-hero-photo--empty" : ""}`}>
                {photoMissing ? (
                  <span className="fp-hero-initial" aria-hidden="true">
                    {FOUNDER.name.charAt(0)}
                  </span>
                ) : (
                  <img src={FOUNDER.photo} alt={FOUNDER.photoAlt} onError={() => setPhotoMissing(true)} />
                )}
              </div>
            </div>

            <div className="fp-hero-sign reveal">
              {/* the script is a flourish; the printed name carries it for
                  anyone the script doesn't render legibly */}
              <p className="fp-signature" aria-hidden="true">
                {FOUNDER.name}
              </p>
              <p className="fp-name">{FOUNDER.name}</p>
              <p className="fp-title">{FOUNDER.title}</p>
            </div>

            <p className="fp-hero-place">Erode, Tamil Nadu</p>
          </div>
        </section>

        <FeatureStrip />

        <section className="fp-vision fp-shell">
          <div className="fp-vision-grid">
            <div className="fp-bio reveal">
              <p className="eyebrow">{FOUNDER.visionEyebrow}</p>
              <h2>{FOUNDER.visionHeading}</h2>
              {FOUNDER.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <aside className="fp-glance reveal reveal--right" aria-label="Founder at a glance">
              <p className="fp-glance-title">Founder at a glance</p>
              <dl>
                {FOUNDER.glance.map((row) => (
                  <div className="fp-glance-row" key={row.label}>
                    <dt>
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                        {GLANCE_ICONS[row.label]}
                      </svg>
                      {row.label}
                    </dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className="fp-stats fp-shell reveal" aria-label="Chennai Rice Industries, by the numbers">
          <p className="fp-stats-title">{FOUNDER.statsEyebrow}</p>
          <div className="fp-stats-grid">
            {SCALE.figures.map((figure) => (
              <StatFigure key={figure.label} figure={figure} />
            ))}
          </div>
        </section>

        <section className="fp-quote reveal">
          <span className="fp-quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <p className="fp-quote-text">{FOUNDER.quote}</p>
          <p className="fp-quote-attr">&mdash; {FOUNDER.quoteAttribution}</p>
        </section>
      </div>
    </SiteLayout>
  );
}
