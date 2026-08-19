import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteLayout from "../layouts/SiteLayout.jsx";
import CartRow from "../components/CartRow.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { formatRupees } from "../utils/format.js";
import usePageMeta from "../hooks/usePageMeta.js";

export default function CartPage() {
  const { items, count, subtotal, clear } = useCart();
  const navigate = useNavigate();

  usePageMeta("Your Cart — Chennai Rice", "Your cart — Chennai Rice Industries.");

  const isEmpty = items.length === 0;

  // No payment gateway behind this yet, so "checkout" simulates straight
  // through to a delivered order. The snapshot travels with the navigation
  // because the cart is about to be emptied.
  const handleCheckout = () => {
    const order = {
      id: `CRI-${Date.now().toString(36).toUpperCase()}`,
      items,
      count,
      subtotal,
      placedAt: Date.now()
    };
    clear();
    navigate("/order-delivered", { state: { order } });
  };

  return (
    <SiteLayout skipTo="cart-heading" skipLabel="Skip to cart" cartIsCurrent>
      <section className="cart-page">
        <p className="eyebrow">Order review</p>
        <h1 id="cart-heading">Your cart</h1>

        {/* Rendering one branch or the other replaces the original's
            hidden-attribute toggle, so the summary can never appear beside the
            empty-cart message. */}
        {isEmpty ? (
          <div className="cart-empty">
            <p className="cart-empty-title">Your cart is empty</p>
            <p>Pick a 10&nbsp;kg pack from the range and it will show up here.</p>
            <Link className="checkout-btn checkout-btn--link" to="/">
              Browse the packs
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <ul className="cart-items" aria-label="Items in your cart">
              {items.map((item) => (
                <CartRow key={item.id} item={item} />
              ))}
            </ul>

            <aside className="cart-summary" aria-label="Order summary">
              <h2>Order summary</h2>
              <dl className="summary-rows">
                <div className="summary-row">
                  <dt>Subtotal</dt>
                  <dd>{formatRupees(subtotal)}</dd>
                </div>
                <div className="summary-row">
                  <dt>Packs</dt>
                  <dd>{count}</dd>
                </div>
                <div className="summary-row summary-row--muted">
                  <dt>Delivery</dt>
                  <dd>Calculated at checkout</dd>
                </div>
                <div className="summary-row summary-row--total">
                  <dt>Total</dt>
                  <dd>{formatRupees(subtotal)}</dd>
                </div>
              </dl>

              <button className="checkout-btn" type="button" onClick={handleCheckout}>
                Proceed to checkout
              </button>
              <p className="summary-note">This order will be simulated — no payment is taken.</p>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
