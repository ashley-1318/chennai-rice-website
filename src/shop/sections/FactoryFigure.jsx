import React, { useState } from "react";

const PHOTO = "/assets/shop/factory.jpg";
const FALLBACK = "/assets/shop/factory-placeholder.svg";

/**
 * The real aerial photograph is used when present; the generated illustration
 * stands in until it is added. The original did this with an inline onerror
 * attribute — in React that becomes onError plus a piece of state, which also
 * guarantees the swap happens only once.
 */
export default function FactoryFigure() {
  const [src, setSrc] = useState(PHOTO);

  return (
    <figure className="factory">
      <img
        src={src}
        alt="Aerial view of the Chennai Rice milling plant at Erode, showing the grain silo farm beside the processing sheds"
        onError={() => setSrc((current) => (current === PHOTO ? FALLBACK : current))}
      />
      <figcaption>
        Our milling and storage facility at Chithode, Erode &mdash; silos, processing halls, and the packing lines
        that fill every 10&nbsp;kg bag.
      </figcaption>
    </figure>
  );
}
