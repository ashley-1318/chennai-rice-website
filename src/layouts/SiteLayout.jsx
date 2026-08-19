import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CheckoutBar from "../components/CheckoutBar.jsx";

/**
 * Page shell: skip link, header, <main>, footer. Each page passes its own skip
 * target and header configuration, so no layout markup is duplicated.
 */
export default function SiteLayout({
  children,
  skipTo,
  skipLabel,
  search = null,
  onSearchChange = null,
  cartIsCurrent = false
}) {
  return (
    <>
      <a className="skip-link" href={`#${skipTo}`}>
        {skipLabel}
      </a>
      <Header search={search} onSearchChange={onSearchChange} cartIsCurrent={cartIsCurrent} />
      <main>{children}</main>
      <Footer />
      <CheckoutBar />
    </>
  );
}
