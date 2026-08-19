import React from "react";
import SiteLayout from "../layouts/SiteLayout.jsx";
import FactoryFigure from "../sections/FactoryFigure.jsx";
import { AboutStory, Stats } from "../sections/AboutStory.jsx";
import Journey from "../sections/Journey.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

export default function AboutPage() {
  usePageMeta(
    "About Us — Chennai Rice",
    "About Chennai Rice Industries India (P) Ltd — milling paddy in Erode, Tamil Nadu since 1980."
  );

  return (
    <SiteLayout skipTo="about-heading" skipLabel="Skip to content">
      <section className="hero">
        <p className="eyebrow">About us</p>
        <h1 id="about-heading">Milling rice in Erode since 1980</h1>
        <p className="hero-sub">
          Four decades of paddy, three production units, and one standard we have never moved on.
        </p>
      </section>

      <FactoryFigure />
      <AboutStory />
      <Stats />
      <Journey />
    </SiteLayout>
  );
}
