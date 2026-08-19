import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * The cart, ported from js/cart-store.js.
 *
 * Same storage key and same line-item shape, so a cart saved by the old site is
 * still read correctly. What changes is that state now lives in React and is
 * shared through context, which is what lets the header badge, the product
 * cards and the cart page stay in sync without any manual repainting.
 */

const KEY = "chennai-rice-cart";
const CartContext = createContext(null);

function readStorage() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items : [];
  } catch {
    // Private mode, disabled storage, or corrupt JSON — start empty rather
    // than break the page.
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStorage);

  // Persist on every change; swap this for an API call when a backend exists.
  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — the cart just won't persist */
    }
  }, [items]);

  // Keep tabs in step with each other.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === KEY) setItems(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Each pack size is its own line — a 5 kg and a 10 kg bag of the same
  // product carry different prices, so they can't share a cart row.
  const add = useCallback((product, size) => {
    const lineId = `${product.id}::${size.kg}`;
    setItems((current) => {
      const existing = current.find((item) => item.id === lineId);
      if (existing) {
        return current.map((item) =>
          item.id === lineId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...current,
        {
          id: lineId,
          name: product.name,
          tag: product.tag,
          price: size.price,
          sizeKg: size.kg,
          image: product.image,
          qty: 1
        }
      ];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((current) =>
      qty < 1
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }, []);

  const remove = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  // Empties the cart once an order is placed.
  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((total, item) => total + item.qty, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
    return { items, count, subtotal, add, setQty, remove, clear };
  }, [items, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
