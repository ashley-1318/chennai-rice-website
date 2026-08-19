import React from "react";
import { Link, useLocation } from "react-router-dom";
import SiteLayout from "../layouts/SiteLayout.jsx";
import { formatRupees } from "../utils/format.js";
import usePageMeta from "../hooks/usePageMeta.js";

const CheckmarkGlyph = () => (
  <svg className="order-check" viewBox="0 0 80 80" width="80" height="80" aria-hidden="true" focusable="false">
    <circle className="order-check-ring" cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="4" />
    <path
      className="order-check-tick"
      d="M24 41 L35 52 L57 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * There's no payment gateway or courier behind this site yet, so placing an
 * order can't really be tracked through to delivery. This page simulates
 * what that end state would look like — the CartPage checkout button hands
 * it a snapshot of the order via router state, since the cart itself is
 * cleared the moment the order is "placed".
 */
export default function OrderDeliveredPage() {
  const { state } = useLocation();
  const order = state?.order ?? null;

  usePageMeta("Order Delivered — Chennai Rice", "Your Chennai Rice Industries order has been delivered.");

  if (!order) {
    return (
      <SiteLayout skipTo="order-heading" skipLabel="Skip to order status">
        <section className="order-page">
          <div className="cart-empty">
            <p className="cart-empty-title" id="order-heading">
              No recent order to show
            </p>
            <p>Place an order from the cart and its delivery status will appear here.</p>
            <Link className="checkout-btn checkout-btn--link" to="/">
              Browse the packs
            </Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const placedDate = new Date(order.placedAt);
  const deliveredLabel = placedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <SiteLayout skipTo="order-heading" skipLabel="Skip to order status">
      <section className="order-page">
        <div className="order-status">
          <CheckmarkGlyph />
          <p className="eyebrow">Order {order.id}</p>
          <h1 id="order-heading">Delivered</h1>
          <p className="order-status-note">
            Your order was delivered on {deliveredLabel}. We hope you enjoy every grain.
          </p>
        </div>

        <div className="order-layout">
          <ul className="cart-items order-items" aria-label="Items in this order">
            {order.items.map((item, index) => (
              <li className="cart-item order-item" key={item.id} style={{ "--i": index }}>
                <figure className="cart-item-media">
                  <img src={item.image} alt={`${item.name} pack`} loading="lazy" />
                </figure>
                <div className="cart-item-body">
                  <p className="cart-item-tag">{item.tag}</p>
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-unit">
                    {formatRupees(item.price)}
                    {item.sizeKg ? ` / ${item.sizeKg} kg` : ""} &times; {item.qty}
                  </p>
                </div>
                <p className="cart-item-total">{formatRupees(item.price * item.qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="cart-summary order-summary" aria-label="Order total">
            <h2>Delivered to</h2>
            <p className="order-address">
              Chennai Rice Industries India (P) Ltd
              <br />
              SF No: 116/1, 2, 4B, N.&nbsp;Thayirpalayam Village
              <br />
              Gangapuram Post, Chithode Via, Nasiyanur, Erode &ndash; 638102
            </p>
            <dl className="summary-rows">
              <div className="summary-row">
                <dt>Packs</dt>
                <dd>{order.count}</dd>
              </div>
              <div className="summary-row summary-row--total">
                <dt>Total paid</dt>
                <dd>{formatRupees(order.subtotal)}</dd>
              </div>
            </dl>
            <Link className="checkout-btn" to="/">
              Continue shopping
            </Link>
            <p className="summary-note">This order was simulated — no payment was taken.</p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
