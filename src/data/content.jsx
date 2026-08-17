// Static copy and iconography lifted verbatim from the original markup.

export const FEATURES = [
  {
    title: "Milled in Erode",
    note: "Our own facility in Tamil Nadu",
    icon: (
      <>
        <path d="M4 20V9l8-5 8 5v11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </>
    )
  },
  {
    title: "10 kg family packs",
    note: "Net weight printed on every bag",
    icon: (
      <>
        <path d="M5 8h14l-1.5 12h-11z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </>
    )
  },
  {
    title: "100% vegetarian",
    note: "Green mark on all our packs",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </>
    )
  },
  {
    title: "Special Rajabhogam",
    note: "Our signature Ponni range",
    icon: (
      <path
        d="M12 3l2.4 5.6L20 9.4l-4 4 1 5.6-5-2.8-5 2.8 1-5.6-4-4 5.6-.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    )
  }
];

export const VARIETIES = [
  {
    name: "Ponni",
    copy:
      "Short, plump grains that cook soft and hold a little stickiness — the South Indian everyday rice for sadam, curd rice, and pongal. Three of our packs are Ponni."
  },
  {
    name: "Kolam",
    copy:
      "Finer and more slender, cooking up light and separate. Reach for Vada Kolam when you want grains that stay distinct, as in pulao, fried rice, or lemon rice."
  }
];

export const STATS = [
  { value: "600", unit: "MT", label: "Paddy processed per day" },
  { value: "60,000", unit: "MT", label: "Total storage capacity" },
  { value: "3", unit: "MW", label: "Green energy generated" },
  { value: "3", unit: null, label: "Production units in Erode" }
];

export const STORY = [
  "Chennai Rice Industries India (P) Ltd is a family-run rice milling company based at Chithode, near Erode in Tamil Nadu. What began in 1980 as a single mill with one conviction — that a household should be able to trust every bag it buys — now runs as three production units feeding one continuous line from paddy to packed rice.",
  "Our founder set out to build modern rice mills at a time when most milling in the region was still done at a small scale. That first unit opened in 1980. A second followed in 1999 and a third in 2003, each one adding capacity without changing the way the grain is treated: cleaned, aged for aroma, graded for length and clarity, and only then milled and polished.",
  "Scale came steadily rather than suddenly. A high-tech stake unit in 2008 took the facility to 190 tonnes of paddy a day, a first in Tamil Nadu at the time. Storage followed, because good rice needs somewhere to rest: 35,000 metric tonnes in 2010, another 25,000 in 2020. Today the plant processes up to 600 metric tonnes of paddy daily, making us the largest rice manufacturer in the state.",
  "We work directly with paddy farmers across the Cauvery belt, buying by variety rather than by lot, so Ponni and Kolam are kept separate from the field onward. Every batch is sampled before it enters the mill and again before it is packed. The Special Rajabhogam range you see on our product page — Rajabhogam Premium, Raja Bogam Ponni, Vada Kolam and Akshaya Ponni — all comes off these same lines, in the same 10 kg family pack, carrying the vegetarian mark and the net weight on every bag.",
  "Since 2013 a growing share of that work has run on our own green energy. Three megawatts of wind, solar and turbine generation now feed the production process, and in 2021 we began developing a food park under the APC scheme of the Ministry of Food Processing Industries — the next step in a plan that has always been about the long term rather than the quarter."
];

/* ---------------- journey milestones (the winding road) ---------------- */

const ICON_MILL = <path d="M3 21V11l5 3V11l5 3V7l8 5v9z" fill="currentColor" />;
const ICON_SILO = <path d="M5 21V9l3-3 3 3v12zm8 0V12l3-3 3 3v9z" fill="currentColor" />;
const ICON_LEAF = (
  <path
    d="M12 3v18M12 9c0-3 3-5 6-5 0 4-3 6-6 6zm0 4c0-3-3-5-6-5 0 4 3 6 6 6z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
);
const ICON_TURBINE = (
  <path
    d="M12 22V11m0 0l-1-8 2 0zm0 0l7 3-1 2zm0 0l-7 3 1 2z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinejoin="round"
  />
);
const ICON_PARK = <path d="M3 21V10h6V21zm8 0V6h4v15zm6 0V13h4v8z" fill="currentColor" />;
const ICON_STAR = (
  <path d="M12 4l2.2 5.1L20 9.7l-4 3.7.9 5.6L12 16.4 7.1 19l.9-5.6-4-3.7 5.8-.6z" fill="currentColor" />
);

// `side` is +1 for a right-hand bend of the road, -1 for a left-hand bend.
// `photo` is attempted first; `fallback` is the generated illustration.
export const MILESTONES = [
  { year: "1980", side: 1,  tone: "maroon", icon: ICON_MILL,    photo: "/assets/journey/1980-vision.jpg",   fallback: "/assets/journey/mill.svg",     label: "Photo: the first mill",                    text: "A vision to establish modern rice mills." },
  { year: "1980", side: -1, tone: "gold",   icon: ICON_MILL,    photo: "/assets/journey/1980-unit1.jpg",    fallback: "/assets/journey/mill.svg",     label: "Photo: Production Unit 1",                 text: "Production Unit‑1 was established by the founder." },
  { year: "1999", side: 1,  tone: "maroon", icon: ICON_MILL,    photo: "/assets/journey/1999-unit2.jpg",    fallback: "/assets/journey/mill.svg",     label: "Photo: Production Unit 2",                 text: "Production Unit‑2 was established." },
  { year: "2003", side: -1, tone: "gold",   icon: ICON_MILL,    photo: "/assets/journey/2003-unit3.jpg",    fallback: "/assets/journey/mill.svg",     label: "Photo: Production Unit 3",                 text: "Production Unit‑3 was established by the founder." },
  { year: "2008", side: 1,  tone: "maroon", icon: ICON_LEAF,    photo: "/assets/journey/2008-upgrade.jpg",  fallback: "/assets/journey/upgrade.svg",  label: "Photo: the high-tech stake unit",          text: "Upgraded with a high-tech stake unit. The facility now boasts a paddy processing capacity of up to 190 tonnes per day, a pioneering feat in Tamil Nadu." },
  { year: "2010", side: -1, tone: "gold",   icon: ICON_SILO,    photo: "/assets/journey/2010-storage.jpg",  fallback: "/assets/journey/silo.svg",     label: "Photo: the storage silos",                 text: "Uplifted with storage capacity of 35,000 MT." },
  { year: "2013", side: 1,  tone: "maroon", icon: ICON_TURBINE, photo: "/assets/journey/2013-energy.jpg",   fallback: "/assets/journey/energy.svg",   label: "Photo: the wind and solar installation",    text: "Incorporated 3 MW green energy into our production process through wind, solar, and turbine technologies." },
  { year: "2020", side: -1, tone: "gold",   icon: ICON_SILO,    photo: "/assets/journey/2020-storage.jpg",  fallback: "/assets/journey/silo.svg",     label: "Photo: the added storage",                 text: "Add-on storage capacity of 25,000 MT." },
  { year: "2021", side: 1,  tone: "maroon", icon: ICON_PARK,    photo: "/assets/journey/2021-foodpark.jpg", fallback: "/assets/journey/foodpark.svg", label: "Photo: the food park",                     text: "Develops a food park under the APC scheme by MOFPI." },
  { year: "2021", side: -1, tone: "gold",   icon: ICON_STAR,    photo: "/assets/journey/2021-largest.jpg",  fallback: "/assets/journey/award.svg",    label: "Photo: the plant today",                   text: "Achieving 600 metric tons of paddy processing, the company has become the largest rice manufacturer in Tamil Nadu." }
];
