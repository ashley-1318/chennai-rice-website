// About page content — deliberately terse. Four layouts, minimal words.

export const HERO = {
  eyebrow: "About Chennai Rice",
  // Typed out one after another, on a loop.
  phrases: [
    "Rooted in Tamil Nadu.",
    "Built for scale.",
    "Made for every family.",
    "70+ years of heritage."
  ],
  sub: "Paddy procurement to packed rice — one integrated ecosystem."
};

export const SCALE = {
  eyebrow: "Built for scale",
  // Written for the scroll reveal: one continuous sentence, no line breaks, so
  // the words uncover in reading order as the section scrolls past.
  statement:
    "From paddy procurement to processed rice, every stage runs inside one integrated ecosystem — built for scale, driven by performance.",
  // `to` drives the count-up; `suffix`/`prefix` are rendered around it
  figures: [
    { to: 1000, suffix: "+", unit: "Tonnes / day", label: "Paddy processed" },
    { to: 5, suffix: "", unit: "States", label: "Procurement network" },
    { to: 6, suffix: "", unit: "Locations", label: "Warehouses in Tamil Nadu" },
    { to: 1000, suffix: "+", unit: "People", label: "Across the value chain" }
  ],
  chain: ["Procurement", "Storage", "Processing", "Quality", "Packaging", "Distribution"]
};

export const VALUES = [
  {
    num: "01",
    name: "Quality",
    copy: "Consistent, carefully selected grain.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 12.5l2.6 2.6L16 9.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )
  },
  {
    num: "02",
    name: "Trust",
    copy: "Long relationships with farmers and buyers.",
    icon: (
      <path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    )
  },
  {
    num: "03",
    name: "Heritage",
    copy: "Rooted in Tamil Nadu's rice culture.",
    icon: (
      <>
        <path d="M12 21V10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 10c0-3.5 2.6-6 6-6 0 3.5-2.6 6-6 6zm0 3c0-3-2.4-5.4-5.4-5.4C6.6 10.6 9 13 12 13z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </>
    )
  },
  {
    num: "04",
    name: "Responsibility",
    copy: "Responsible sourcing, sustainable practice.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 12h17M12 3.2a15 15 0 0 1 0 17.6M12 3.2a15 15 0 0 0 0 17.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </>
    )
  }
];

export const CTA = {
  eyebrow: "Our promise",
  promise: "From the fields of Tamil Nadu to every family table.",
  heading: ["Good rice.", "Good food.", "Good memories."],
  primary: { label: "Explore Our Rice", to: "/" },
  secondary: { label: "Contact Us", href: "mailto:info@chennairiceindustries.com" }
};
