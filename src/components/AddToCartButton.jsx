import React from "react";
import { useRipple } from "../hooks/useRipple.js";
import { useCart } from "../hooks/useCart.jsx";

/**
 * Add to cart for one product at one bag size. Once that size is in the
 * cart, the button is replaced in place by a +/- quantity stepper reading
 * straight off the cart line, so it always shows what's actually in there
 * rather than a separate "added" flag that could drift out of sync.
 */
export default function AddToCartButton({ product, size }) {
  const spawnRipple = useRipple();
  const { items, add, setQty } = useCart();

  const lineId = `${product.id}::${size.kg}`;
  const cartItem = items.find((item) => item.id === lineId);

  const handleAdd = (event) => {
    spawnRipple(event);
    add(product, size);
  };

  if (cartItem) {
    return (
      <div
        className="qty qty--card"
        role="group"
        aria-label={`Quantity of ${product.name}, ${size.kg} kg`}
      >
        <button
          className="qty-btn"
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQty(lineId, cartItem.qty - 1)}
        >
          &minus;
        </button>
        <span className="qty-value">{cartItem.qty}</span>
        <button
          className="qty-btn"
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQty(lineId, cartItem.qty + 1)}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button className="add-btn" type="button" onClick={handleAdd}>
      <span className="add-label">Add to cart</span>
    </button>
  );
}
