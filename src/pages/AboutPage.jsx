import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../layouts/SiteLayout.jsx";
import AboutHero from "../sections/about/AboutHero.jsx";
import Scale from "../sections/about/Scale.jsx";
import PromiseCta from "../sections/about/PromiseCta.jsx";
import StatementCard from "../components/StatementCard.jsx";
import SectionCurve from "../components/SectionCurve.jsx";
import Timeline from "../components/Timeline.jsx";
import { useRevealGroup } from "../hooks/useScrollFx.js";
import usePageMeta from "../hooks/usePageMeta.js";
import "../styles/about.css";

/**
 * Hero → statement → scale → statement → statement → close.
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
    <SiteLayout skipTo="about-content-start" skipLabel="Skip to content">
      <div className="about-page" ref={pageRef}>
        {/* Each curve is filled with the colour of the block BELOW it, so the
            next section reads as flowing up over this one's edge. Waves
            alternate (variant 1/2) so repeated cuts don't look stamped. */}

        {/* Scale is first now, so "skip to content" lands here rather than
            on the hero heading further down the page. */}
        <div className="ab-flow-block" id="about-content-start">
          <Scale />
          <SectionCurve place="bottom" tone="rice" variant={1} />
        </div>

        <div className="ab-flow-block ab-flow-block--rice">
          {/* photo beside the heading, with the full company description
              stacked directly under it in the same column — plain
              typography, no card, so it reads as one continuous piece of
              the page rather than a pull-quote */}
          <div className="about-shell ab-heritage">
            <div className="ab-heritage-intro">
              <figure className="ab-heritage-photo reveal reveal--left">
                <img
                  src="/assets/about/3dhand.png"
                  alt="Grain passed hand to hand across three generations in a wheat field at sunset"
                  loading="lazy"
                />
              </figure>
              <div className="ab-heritage-intro-text reveal reveal--right d1">
                <h2 className="ab-heritage-kicker">Since the 1950s</h2>
                <p className="ab-heritage-tagline">
                  Seven decades of rice knowledge, running on modern infrastructure.
                </p>
                <div className="ab-heritage-intro-right">
                  <p>
                    Chennai Rice Industries India Private Limited, incorporated in 2013 under the
                    leadership of Mr.&nbsp;M.&nbsp;S.&nbsp;Tamilselvan, brings together deep
                    agricultural expertise, large-scale paddy procurement, advanced processing
                    capabilities, extensive storage infrastructure, and a growing pan-India
                    distribution network.
                  </p>
                  <p>
                    With 70+ years of industry heritage, we combine the knowledge of generations
                    with modern technology and operational capabilities to move from paddy
                    procurement to processed rice and market distribution through an integrated
                    value chain.
                  </p>
                  <p>
                    Today, Chennai Rice Industries is building a stronger, more efficient, and
                    future-ready presence in India&rsquo;s rice industry.
                  </p>
                </div>
              </div>
            </div>
            <Timeline />
          </div>
          {/* below this block is the hero now, whose top is rice-toned (see
              .ab-hero's gradient), not the forest tone Scale used to be */}
          <SectionCurve place="bottom" tone="rice" variant={2} />
        </div>

        <div className="ab-flow-block">
          <AboutHero />
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
              South India’s largest paddy storage facility.
              <span className="sc-quiet">Six warehouses across Tamil Nadu.</span>
            </StatementCard>
          </div>
          <SectionCurve place="bottom" tone="cream" variant={2} />
        </div>

        <div className="ab-flow-block ab-flow-block--cream">
          <div className="ab-founder-card">
            <StatementCard tone="outline" align="left" kicker="Our founder" footnote="M. S. Tamilselvan · Founder &amp; Chairman" bare>
              “Build capabilities today that create scale for tomorrow.”
            </StatementCard>
            <Link className="ab-founder-link" to="/founder">
              Meet the founder
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <SectionCurve place="bottom" tone="forest-deep" variant={2} />
        </div>

        <div className="ab-flow-block">
          <PromiseCta />
        </div>
      </div>
    </SiteLayout>
  );
}
