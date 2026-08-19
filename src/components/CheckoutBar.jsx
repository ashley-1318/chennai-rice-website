import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart.jsx";
import { useReducedMotion } from "../hooks/useReducedMotion.js";

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
    <path
      d="M9 5l7 7-7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EXIT_MS = 260;

/**
 * A floating bar that surfaces the cart from wherever the shopper is
 * browsing, styled after the "View cart" pill pattern from grocery apps.
 * It mounts once the cart first holds anything and stays mounted through
 * an exit transition when it empties, rather than popping in and out.
 */
export default function CheckoutBar() {
  const { items, count } = useCart();
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const exitTimer = useRef(null);

  // Only the packs page browses products, so it's the only place the
  // floating cart CTA is useful — everywhere else (cart, about, order
  // status) it would just be clutter or a duplicate of what's on screen.
  const shouldShow = count > 0 && pathname === "/";

  useEffect(() => {
    window.clearTimeout(exitTimer.current);

    if (shouldShow) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    exitTimer.current = window.setTimeout(() => setMounted(false), reducedMotion ? 0 : EXIT_MS);
    return () => window.clearTimeout(exitTimer.current);
  }, [shouldShow, reducedMotion]);

  if (!mounted) return null;

  const latest = items[items.length - 1];

  return (
    <div className={`checkout-bar${visible ? " is-visible" : ""}`}>
      <Link className="checkout-bar-link" to="/cart">
        <span className="checkout-bar-thumb">
          {latest && <img src={latest.image} alt="" />}
        </span>
        <span className="checkout-bar-text">
          <strong>Proceed to checkout</strong>
          <small>
            {count} {count === 1 ? "item" : "items"} in cart
          </small>
        </span>
        <span className="checkout-bar-arrow">
          <ChevronIcon />
        </span>
      </Link>
    </div>
  );
}
