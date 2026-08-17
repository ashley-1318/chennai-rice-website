import React, { useState } from "react";
import SiteLayout from "../layouts/SiteLayout.jsx";
import Hero from "../sections/Hero.jsx";
import FeatureStrip from "../sections/FeatureStrip.jsx";
import ProductGrid from "../sections/ProductGrid.jsx";
import Varieties from "../sections/Varieties.jsx";
import Lineup from "../sections/Lineup.jsx";
import usePageMeta from "../hooks/usePageMeta.js";

export default function ProductsPage() {
  // Search and filter live here because the header owns the input and the grid
  // owns the chips — the page is their common parent.
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  usePageMeta(
    "Chennai Rice Industries — Kitchidi Ponni Rice",
    "Chennai Rice Industries — Special Rajabhogam Kitchidi Ponni Rice. Milled in Erode, trusted across Tamil Nadu."
  );

  return (
    <SiteLayout skipTo="products" skipLabel="Skip to products" search={search} onSearchChange={setSearch}>
      <Hero />
      <FeatureStrip />
      <ProductGrid search={search} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <Varieties />
      <Lineup />
    </SiteLayout>
  );
}
