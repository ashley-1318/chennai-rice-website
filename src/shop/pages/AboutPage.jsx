import React from "react";
import SiteLayout from "../layouts/SiteLayout.jsx";
import AboutHero from "../sections/about/AboutHero.jsx";
import Scale from "../sections/about/Scale.jsx";
import Values from "../sections/about/Values.jsx";
import PromiseCta from "../sections/about/PromiseCta.jsx";
import StatementCard from "../components/StatementCard.jsx";
import SectionCurve from "../components/SectionCurve.jsx";
import Timeline from "../components/Timeline.jsx";
import { useRevealGroup } from "../hooks/useScrollFx.js";
import usePageMeta from "../hooks/usePageMeta.js";
import "../styles/about.css";

/**
 * Hero → statement → scale → statement → values → statement → close.
 *
 * The statement cards are the connective tissue: each one lands on the seam
 * between two sections, alternating side, so the page reads as a sequence of
 * claims rather than a stack of blocks.
 */
export default function AboutPage() {
  const pageRef = useRevealGroup();

  usePageMeta(
    "About Us — Chennai Rice Industries",
    "70+ years of rice industry heritage. Integrated paddy procurement, storage, processing and pan-India distribution, rooted in Tamil Nadu."
  );

  return (
    <SiteLayout skipTo="about-hero-heading" skipLabel="Skip to content">
      <div className="about-page" ref={pageRef}>
        {/* Each curve is filled with the colour of the block BELOW it, so the
            next section reads as flowing up over this one's edge. Waves
            alternate (variant 1/2) so repeated cuts don't look stamped. */}

        <div className="ab-flow-block">
          <AboutHero />
          <SectionCurve place="bottom" tone="rice" variant={1} />
        </div>

        <div className="ab-flow-block ab-flow-block--rice">
          {/* statement on the left, milestones on the right — the timeline is
              drawn in maroon so it reads against the page's greens */}
          <div className="about-shell ab-heritage">
            {/* card centred above the rail it introduces */}
            <StatementCard tone="dark" align="left" kicker="Since the 1950s" bare>
              Seven decades of rice knowledge, running on modern infrastructure.
            </StatementCard>
            <Timeline />
          </div>
          <SectionCurve place="bottom" tone="forest-deep" variant={2} />
        </div>

        <div className="ab-flow-block">
          <Scale />
          <SectionCurve place="bottom" tone="rice" variant={1} />
        </div>

        <div className="ab-flow-block ab-flow-block--rice">
          {/* the silo farm sits beside the claim it evidences */}
          <div className="about-shell ab-storage">
            <figure className="ab-storage-photo reveal reveal--left">
              <img
                src="/assets/about/silos.png"
                alt="Aerial view of the paddy storage silo farm"
                loading="lazy"
              />
            </figure>
            <StatementCard tone="gold" align="right" kicker="Storage" bare>
              South India&rsquo;s largest paddy storage facility.
              <span className="sc-quiet">Six warehouses across Tamil Nadu.</span>
            </StatementCard>
          </div>
          <SectionCurve place="bottom" tone="forest-deep" variant={2} />
        </div>

        <div className="ab-flow-block">
          <Values />
          <SectionCurve place="bottom" tone="cream" variant={1} />
        </div>

        <div className="ab-flow-block ab-flow-block--cream">
          <StatementCard tone="outline" align="left" kicker="Our founder" footnote="M. S. Tamilselvan · Founder &amp; Chairman">
            &ldquo;Build capabilities today that create scale for tomorrow.&rdquo;
          </StatementCard>
          <SectionCurve place="bottom" tone="forest-deep" variant={2} />
        </div>

        <div className="ab-flow-block">
          <PromiseCta />
        </div>
      </div>
    </SiteLayout>
  );
}
