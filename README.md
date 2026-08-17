# Chennai Rice Industries — React App

Product, About and Cart pages for Chennai Rice Industries India (P) Ltd.
Migrated from static HTML/CSS/JS to **React 18 + Vite + React Router 6**; the
design and behaviour are unchanged.

## Run it

```
npm install        # once
npm run dev        # dev server with hot reload  -> http://localhost:5173/
npm run build      # production bundle into dist/
npm run preview    # serve the built bundle      -> http://localhost:5173/
```

## Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Products | Search, variety filters, add to cart, 3D lineup |
| `/about` | About us | Story, stats, winding-road milestone map |
| `/cart` | Cart | Line items, quantity steppers, order summary |

Old links (`/index.html`, `/about.html`, `/cart.html`) redirect to the new
routes, and any unknown path falls back to `/`.

## Structure

```
index.html                  Vite entry (single HTML shell)
vite.config.js
public/assets/              Images + generated SVGs, served from /assets/...
src/
├── main.jsx                React root + BrowserRouter
├── App.jsx                 Routes + CartProvider + scroll restore
├── layouts/
│   └── SiteLayout.jsx      Skip link, Header, <main>, Footer
├── pages/
│   ├── ProductsPage.jsx    owns search + filter state
│   ├── AboutPage.jsx
│   └── CartPage.jsx
├── sections/
│   ├── Hero.jsx            premium pill + glints
│   ├── FeatureStrip.jsx
│   ├── ProductGrid.jsx     chips + derived visible list
│   ├── Varieties.jsx
│   ├── Lineup.jsx          CSS-3D stage, scroll-revealed
│   ├── FactoryFigure.jsx   photo with illustration fallback
│   ├── AboutStory.jsx      exports AboutStory + Stats
│   └── Journey.jsx         winding road, pins, photo popovers
├── components/
│   ├── Header.jsx  Footer.jsx  BrandMark.jsx
│   ├── SearchBar.jsx  CartButton.jsx
│   ├── ProductCard.jsx  AddToCartButton.jsx  CartRow.jsx
├── hooks/
│   ├── useCart.jsx         cart context (localStorage backed)
│   ├── useRipple.js        button ripple
│   ├── useReducedMotion.js
│   ├── useRevealOnScroll.js IntersectionObserver + backstop
│   └── usePageMeta.js      per-route title/description
├── data/
│   ├── products.js         the four packs, filters, lineup order
│   └── content.jsx         features, varieties, stats, story, milestones
├── utils/format.js         formatRupees
└── styles/styles.css       the original stylesheet, unchanged
```

`source-assets/` holds the untouched original pack photographs (archive only —
not shipped). `tools/` holds the PowerShell generators for the mandala, road,
milestone thumbnails and pack cut-outs.

## Adding the real photographs

Both image fallbacks still work the same way — drop the file in and it appears:

- **Factory photo** → `public/assets/factory.jpg`
- **Milestone photos** → `public/assets/journey/` as
  `1980-vision.jpg`, `1980-unit1.jpg`, `1999-unit2.jpg`, `2003-unit3.jpg`,
  `2008-upgrade.jpg`, `2010-storage.jpg`, `2013-energy.jpg`,
  `2020-storage.jpg`, `2021-foodpark.jpg`, `2021-largest.jpg`
  (landscape crops around 480×300)

Until then each falls back to its generated illustration.

## Where to change things

- Prices, names, descriptions, pack images → `src/data/products.js`
- Story copy, stats, milestones → `src/data/content.jsx`
- Colours, type, spacing → the `:root` tokens at the top of `src/styles/styles.css`
- Cart behaviour → `src/hooks/useCart.jsx`

The "View more" button is still a deliberate stub — it ripples but does not
navigate. Wire it to a product-details route when that page exists, and wire
"Proceed to checkout" in `src/pages/CartPage.jsx` to a payment flow.
