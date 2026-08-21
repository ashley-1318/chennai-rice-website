// Per-product content for the product detail page, keyed by PRODUCTS[].id.
//
// Nothing here states a fact that isn't already verified elsewhere in the
// project (FEATURES in shop/data/content.jsx, SOURCING_STEPS in
// data/infrastructure.js). Nutrition and cooking figures are not yet
// confirmed for any pack, so those fields are left null and the page shows
// a clearly labelled "coming soon" state instead of inventing numbers.

export const CATEGORY_LABEL = {
  premium: "Rajabhogam",
  red: "Ponni Rice",
  gold: "Kolam Rice",
  orange: "Ponni Rice",
};

// Real, already-published benefit copy (see FEATURES in shop/data/content.jsx),
// mapped per product so a card never claims something specific to a pack we
// haven't confirmed.
export const BENEFITS_BY_ID = {
  "rajabhogam-premium": [
    { title: "Milled in Erode", note: "Our own facility in Tamil Nadu" },
    { title: "Hand Graded", note: "Aged, hand-graded premium grains" },
    { title: "100% Vegetarian", note: "Green mark on every pack" },
    { title: "Signature Range", note: "Our Special Rajabhogam pack" },
  ],
  default: [
    { title: "Milled in Erode", note: "Our own facility in Tamil Nadu" },
    { title: "Weight Marked", note: "Net weight printed on every bag" },
    { title: "100% Vegetarian", note: "Green mark on every pack" },
    { title: "Quality Checked", note: "Checked before it leaves our facility" },
  ],
};

// Mirrors SOURCING_STEPS in data/infrastructure.js — same facility, same
// verified copy, reused rather than re-described for the product page.
export const GRAIN_JOURNEY = [
  {
    num: "01",
    title: "Paddy Selection",
    text: "Paddy is sourced from growing regions known for the varieties Chennai Rice processes, chosen batch by batch before it ever reaches the mill.",
    image: "/assets/infrastructure/paddy-selection.png",
  },
  {
    num: "02",
    title: "Quality Inspection",
    text: "Incoming paddy is inspected on arrival, so only lots that meet our intake standard move forward into procurement.",
    image: "/assets/infrastructure/quality-inspection.png",
  },
  {
    num: "03",
    title: "Controlled Procurement",
    text: "Procurement is managed to keep varieties separate and traceable from the point of purchase through to storage.",
    image: "/assets/infrastructure/procurement.png",
  },
  {
    num: "04",
    title: "Transportation",
    text: "Paddy is moved to our facility under controlled handling, protecting grain condition before it enters storage and processing.",
    image: "/assets/infrastructure/transportation.png",
  },
  {
    num: "05",
    title: "Processing",
    text: "Grain moves through cleaning, husking and polishing at our facility before grading.",
    image: "/assets/infrastructure/facility-aerial.png",
  },
  {
    num: "06",
    title: "Quality Testing",
    text: "A quality check is carried out before the batch proceeds to packaging.",
    image: "/assets/infrastructure/paddy-macro.png",
  },
  {
    num: "07",
    title: "Packaging",
    text: "Finished rice is packed and prepared for dispatch.",
    image: "/assets/shop/pack-premium.png",
  },
  {
    num: "08",
    title: "Your Kitchen",
    text: "From our facility in Erode to family kitchens across Tamil Nadu.",
    image: "/assets/about/hero-field.png",
  },
];

// Nutrition, cooking ratios and per-product description bullets are not yet
// confirmed against pack labelling — left null/empty on purpose so the UI
// renders an honest placeholder instead of a guessed figure.
export const DETAILS_BY_ID = {
  default: {
    aboutBullets: [],
    nutrition: null, // { per: "100g", rows: [{ label, value }] }
    cooking: null, // { rinse, ratio, soak, cookTime, serve }
  },
};

export function getBenefits(id) {
  return BENEFITS_BY_ID[id] || BENEFITS_BY_ID.default;
}

export function getDetails(id) {
  return DETAILS_BY_ID[id] || DETAILS_BY_ID.default;
}

export function getCategoryLabel(product) {
  return CATEGORY_LABEL[product.variant] || "Rice";
}

// Trust strip under the purchase buttons. Kept as data so it's easy to
// correct if a claim (e.g. the free-delivery threshold) changes.
export const TRUST_STRIP = [
  { title: "Secure Packaging", note: "Sealed to protect grain quality" },
  { title: "Easy Returns", note: "Reach out within 7 days of delivery" },
  { title: "Vegetarian Certified", note: "Green mark on every pack" },
];
