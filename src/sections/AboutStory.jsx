import React from "react";
import { STORY, STATS } from "../data/content.jsx";

export function AboutStory() {
  return (
    <section className="about-story" aria-labelledby="story-heading">
      <h2 id="story-heading">Our story</h2>
      {STORY.map((paragraph, index) => (
        // The opening paragraph carries the gold-ruled lede treatment.
        <p key={index} className={index === 0 ? "lede" : undefined}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}

export function Stats() {
  return (
    <section className="stats" aria-label="Chennai Rice at a glance">
      {STATS.map((stat) => (
        <div className="stat" key={stat.label}>
          <p className="stat-value">
            {stat.value} {stat.unit && <span>{stat.unit}</span>}
          </p>
          <p className="stat-label">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
