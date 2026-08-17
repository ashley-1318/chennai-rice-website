import React from "react";
import { VARIETIES } from "../data/content.jsx";

export default function Varieties() {
  return (
    <section className="varieties" aria-labelledby="varieties-heading">
      <h2 id="varieties-heading">Choosing your variety</h2>
      <div className="variety-grid">
        {VARIETIES.map((variety) => (
          <article className="variety" key={variety.name}>
            <h3>{variety.name}</h3>
            <p>{variety.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
