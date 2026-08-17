import React from "react";
import AddToCartButton from "./AddToCartButton.jsx";
import { useRipple } from "../hooks/useRipple.js";
import { formatRupees } from "../utils/format.js";

export default function ProductCard({ product }) {
  const spawnRipple = useRipple();

  return (
    <article className={`card card--${product.variant}`}>
      <figure className="card-media">
        {product.flag && <span className="premium-flag">{product.flag}</span>}
        <img
          src={product.image}
          alt={product.alt}
          width={product.width}
          height={product.height}
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <p className="card-tag">{product.tag}</p>
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description}</p>
        <div className="card-foot">
          <p className="price">
            <span className="price-amount">{formatRupees(product.price)}</span>{" "}
            <span className="price-unit">/ 10 kg</span>
          </p>
          <div className="card-actions">
            {/* "View more" is still a stub — the details page hooks in here. */}
            <button className="view-btn" type="button" onClick={spawnRipple}>
              View more
            </button>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
