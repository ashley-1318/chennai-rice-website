import React, { useMemo, useState } from "react";
import CardQuantityControl from "./CardQuantityControl.jsx";
import { useRipple } from "../hooks/useRipple.js";
import { formatRupees } from "../utils/format.js";

export default function ProductCard({ product }) {
  const spawnRipple = useRipple();

  const sizes = product.packSizes || [{ kg: 10, price: product.price }];
  const defaultSize = sizes.find((s) => s.kg === 10) || sizes[0];
  const [selectedKg, setSelectedKg] = useState(defaultSize.kg);
  const selected = sizes.find((s) => s.kg === selectedKg) || defaultSize;

  // The cart line item needs a unique id per size and the size's own price,
  // so switching pack size never overwrites a different size already in cart.
  const cartProduct = useMemo(
    () => ({
      ...product,
      id: `${product.id}-${selected.kg}kg`,
      name: `${product.name} (${selected.kg} kg)`,
      price: selected.price,
    }),
    [product, selected]
  );

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

        <div className="pack-size-group" role="group" aria-label={`Pack size for ${product.name}`}>
          {sizes.map((size) => (
            <button
              key={size.kg}
              type="button"
              className={`pack-size-pill${size.kg === selectedKg ? " is-selected" : ""}`}
              aria-pressed={size.kg === selectedKg}
              onClick={() => setSelectedKg(size.kg)}
            >
              {size.kg} kg
            </button>
          ))}
        </div>

        <div className="card-foot">
          <p className="price">
            <span className="price-amount">{formatRupees(selected.price)}</span>{" "}
            <span className="price-unit">/ {selected.kg} kg</span>
          </p>
          <div className="card-actions">
            {/* "View more" is still a stub — the details page hooks in here. */}
            <button className="view-btn" type="button" onClick={spawnRipple}>
              View more
            </button>
            <CardQuantityControl product={cartProduct} />
          </div>
        </div>
      </div>
    </article>
  );
}
