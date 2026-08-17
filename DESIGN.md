# Chennai Rice Industries — Product Page Design Blueprint

> **Implementation note.** This document describes the design system. The site
> is now a React 18 + Vite + React Router application; the stylesheet below is
> carried over unchanged as `src/styles/styles.css`, and every selector named
> here still exists. Where this document says "the markup", the equivalent
> component lives under `src/sections/` or `src/components/` — see README.md
> for the file map.


A production-ready front-end plan for the Kitchidi Ponni Rice product page.
Everything specified here is already implemented in this folder
(`index.html`, `css/styles.css`, `js/app.js`, `assets/*.svg`) — this document
is the hand-off reference for the design/development team.

---

## 1. Concept

The page borrows its identity directly from the packaging: heritage maroon and
brushed gold from the Chennai Rice emblem, a warm rice-paper cream ground, and
Roman-caps display type that echoes the ornamental pack lettering. The three
product cards are tinted with their pack colors (royal blue / classic red /
premium gold) so the grid reads like the actual shelf lineup.

---

## 2. Wireframe

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER (sticky)                                                │
│ [◉ Chennai Rice]   [🔍 Search products………………]        [🛒 (0)] │
├────────────────────────────────────────────────────────────────┤
│ HERO (centered)                                                │
│           SPECIAL RAJABHOGAM · MILLED IN ERODE   ← eyebrow     │
│           Kitchidi Ponni Rice, three ways        ← h1          │
│           One-line supporting sentence           ← muted       │
├────────────────────────────────────────────────────────────────┤
│ Our 10 kg packs                    Showing 3 products (live)   │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│ │  blue-tinted │  │  red-tinted  │  │  gold-tinted │           │
│ │  media well  │  │  media well  │  │  media well  │           │
│ │  [bag img]   │  │  [bag img]   │  │  [bag img]   │           │
│ │──────────────│  │──────────────│  │──────────────│           │
│ │ TAG (accent) │  │ TAG          │  │ TAG          │           │
│ │ Product name │  │ Product name │  │ Product name │           │
│ │ Short desc…  │  │ Short desc…  │  │ Short desc…  │           │
│ │ ₹895  [Add]  │  │ ₹795  [Add]  │  │ ₹960  [Add]  │           │
│ └──────────────┘  └──────────────┘  └──────────────┘           │
├────────────────────────────────────────────────────────────────┤
│ FOOTER (maroon) — company name + factory address               │
└────────────────────────────────────────────────────────────────┘
```

Mobile: header wraps (search drops to its own full-width row), grid stacks
to one column, cards keep identical anatomy.

---

## 3. Products

| Product | Tag | Filter tags | Price | Visual |
|---|---|---|---|---|
| Rajabhogam Premium | Black & Gold | `premium ponni` | ₹995 / 10 kg | `assets/pack-premium.png` |
| Raja Bogam Ponni | Classic Red | `ponni` | ₹795 / 10 kg | `assets/pack-red.png` |
| Vada Kolam | Golden | `kolam` | ₹895 / 10 kg | `assets/pack-gold.png` |
| Akshaya Ponni | Orange | `ponni` | ₹845 / 10 kg | `assets/pack-akshaya.png` |

### Filtering

A chip group (All packs / Premium / Ponni / Kolam) sits above the grid and
combines with the header search: a card shows only when it satisfies the
active chip **and** the search text. Chips carry `aria-pressed`; the result
count is announced through the existing `aria-live` region. Each card declares
its own `data-tags`, so adding a product needs no JS change.

### Four-up grid

The grid is flex, not fixed columns: cards flow 4 → 3+1 → 2+2 → 1 as the
viewport narrows, with `justify-content: center` so a short final row centres
instead of leaving an orphan hanging on the left. `min-width: 280px` keeps the
two footer buttons side by side at every size.

### Image preparation

The three supplied studio mockups (`Premium Bag.jpeg`, `Raja Bogam
Ponni.jpeg`, `Vada Kolam.jpeg`) are used with the pack artwork untouched.
Preparation applied so they composite on the cards:

1. **Studio backdrop keyed out.** The white wall, podium, soft shadows, and
   studio watermark were removed: a flood fill from the image border clears
   light near-grey pixels, the largest remaining connected region (the bag) is
   kept, and any over-eaten interior (the white rice window reaches the pack
   edge on the premium bag) is restored by row/column containment. A one-pixel
   alpha feather softens the cut edge.
2. **Cropped and scaled** to the pack's bounding box at 820px tall
   (490–515px wide), giving three consistent cut-outs.

Source mockups are preserved byte-for-byte in `assets/original/`. Because the
packs are cut-outs, the CSS fixes image *height* (not width) and adds a
`drop-shadow` contact shadow, so all three sit on a common baseline regardless
of pack width.

### Closing lineup (3D stage)

The page ends with all four packs standing together on a staged floor:

- **Depth** — the row sits in a `perspective: 1500px` scene with
  `transform-style: preserve-3d`. The outer packs rotate inward
  (±15°) and sit 55px further back, so the four form a gathered arc rather
  than a flat row. Phone widths flatten this to ±9° / 25px.
- **Entrance** — an `IntersectionObserver` adds `.is-visible` when the stage
  scrolls into view, releasing a staggered rise-and-fade (130ms per pack,
  plays once).
- **The packs can never go missing.** The hidden start state lives on
  `.stage.will-animate`, a class JS adds only once it knows it can reveal
  them again — so a blocked script, a JS error, or missing observer support
  degrades to "no animation" rather than "no products". A 3s timeout also
  reveals them if the observer somehow never fires (an unusual scroll
  container or zoom level where the threshold is never met).
- **Idle** — a 6.5s float on the `translate` property, which composes with the
  `transform` above instead of overwriting it.
- **Why entrance is an animation, not a transition** — the stagger needs a
  per-item delay, but a `transition-delay` on the base rule also delays
  *hover*, so the last pack took 390ms to respond and the same again to
  return. Running the entrance as a keyframe animation leaves `transition`
  free for hover alone, which now reacts instantly.
- **Reflections** — each pack is mirrored below with `scaleY(-1)` and a
  `mask-image` gradient authored in element space, so it fades away from the
  pack after the flip. A hairline gold floor line grounds the row.
- **No hover state, by design** — the lineup is a display shelf, not a set of
  controls, so the packs hold their arc and stay put under the pointer. The
  interactive product cards above are where hover feedback belongs.
- **Type** — the statement is set in Karla 800 uppercase with a maroon-to-gold
  `background-clip: text` gradient, guarded by `@supports` so unsupported
  browsers get solid maroon rather than invisible text.

Everything is disabled under `prefers-reduced-motion`, which keeps the arc and
drops the movement.

### About page

`about.html` reuses the product page's tokens, header, mandala corners, and
footer so the two read as one site. Structure: hero → factory photograph →
"Our story" prose → stats band → milestone timeline → founder sign-off.

- **Prose is set to a 44rem measure** (~65 characters) so long paragraphs stay
  readable, with a gold-ruled lede opening the section.
- **The factory photograph** points at `assets/factory.jpg` and falls back via
  `onerror` to a generated illustration, so the page is never broken while the
  real photo is pending. Dropping the file in needs no code change.
- The founder's name is set in Great Vibes to echo the script on the packs —
  the only place that face is used.

### Journey map (the winding road)

Milestones sit as map pins along a road that snakes down the page.

- **The road is generated, not drawn** (`tools/make-journey-art.ps1`). Its
  bezier curve is built from the same three numbers the stylesheet uses —
  row height, swing amplitude, lead-in — so every pin lands exactly on the
  tarmac. **Change one and regenerate the other**; the numbers appear in both
  the script header and the `.journey-map` block.
- **Pins are positioned by two custom properties** on each `<li>`: `--i` (the
  stop index) and `--side` (+1 right bend, −1 left bend). Adding a milestone
  means adding a list item and bumping `--stops`, then re-running the script.
- Pins alternate maroon and gold with a gold rim and a teardrop tail, and
  carry a small glyph under the year. Cards sit on the same side as their pin,
  joined by a hairline leader.
- **Hover or focus reveals a photo** above the pin — a small framed thumbnail
  that fades and rises into place. Each `<img>` points at a real photograph
  (`assets/journey/<year>-<slug>.jpg`) and falls back via `onerror` to a
  generated illustration, so the map is complete before the photos exist.
- **Touch has no hover**, so `js/journey.js` toggles the same state on tap,
  keeps one open at a time, and closes on outside tap or Escape. The pins are
  real `<button>`s carrying `aria-expanded`, so keyboard and screen-reader
  users get the same behaviour.
- **Below 1024px** the road cannot hold cards either side, so it straightens
  into a dashed rail down the left with pin and card on one line.

Colours are the site's maroon and gold, so the section belongs to this design
system rather than importing the reference's palette.

### Cart (draft)

`cart.html` is a rough but working draft. Add to cart writes a line item to
`localStorage` via `js/cart-store.js`, which both pages share; the header
badge reads from the same store, so a cart survives a reload and shows up on
either page.

- Line items carry thumbnail, tag, name, unit price, a −/+ quantity stepper,
  line total, and Remove. Dropping quantity below 1 removes the row.
- Summary shows subtotal, pack count, and total. Delivery is deliberately
  left as "Calculated at checkout" rather than inventing a shipping rule.
- One delegated click listener on the list covers every row, so re-rendered
  rows need no re-binding.
- Checkout is a stub that says so. Wire it to a payment flow when one exists.

To swap `localStorage` for a real backend, replace `read`/`write` in
`cart-store.js` — nothing else touches storage.

### Page-corner mandalas

Symmetrical lotus medallions anchor the two top corners of the page, echoing
the mandala printed on the packs: seven concentric rings, a 16-petal outer
lotus, an interleaved 12-petal middle ring, an 8-petal inner lotus, 32 radial
ticks, 24 rim diamonds, and a 24-dot kolam ring.

They sit on `<main>` — full-width and starting just below the header — so
they land in the true page corners rather than inside the hero's centred
container, and they frame the content instead of sitting behind the text.
Position offsets are `calc()`ed from the size, so the same portion of the
medallion shows at every viewport width.

- **Generated, not hand-drawn** — `tools/make-mandala.ps1` computes every
  rotation (`i × 360/n`), so each ring is exactly symmetrical. Re-run it to
  change the ring counts or weights.
- **Delivered as a `background-image`, not a pseudo-element** — backgrounds
  clip to their own box, so the medallion can never spill onto the sections
  below, and it needs no `z-index` work to stay behind the content.
- **Fade and opacity are baked into the SVG** (a radial `mask` plus
  `opacity="0.26"`), because a background image cannot be dimmed from CSS.
  The medallion dissolves outward and has no hard edge.
- `<use>` carries both `href` and legacy `xlink:href` for older WebKit.

### Background motifs

Two grain motifs, both inline SVG data URIs (no extra requests, no asset
files):

- **Rice grains** tile behind the product listing — filled and outlined
  ellipses in brand gold at 5–12% opacity, reading as a watermark in the gaps
  between the opaque cards.
- **Millet sprigs** stand as silhouettes in the lower corners of the closing
  lineup, and one behind the varieties cards (that one only above 1000px,
  where there is room for it to sit clear of the text). Each sprig is a seed
  head — an ellipse filled with a dot pattern — on a stem with one leaf.

Both are `background-image` layers rather than elements, so they always paint
behind content and need no stacking-context work.

### Premium emphasis

The page opens with a **Premium Collection** banner: a gold-gradient pill
whose gradient pans continuously, a light sheen sweeping across it, and five
star-shaped glitter particles twinkling around it on staggered delays
(pure CSS, `aria-hidden`, disabled under reduced motion). The premium card
itself gets a dark charcoal media well, a gold ghost word, and a shimmering
"★ Premium" flag pinned to its corner.

---

## 4. Design system

### 4.1 Color palette

| Role | Token | Hex | Usage |
|---|---|---|---|
| Primary | `--maroon-600` | `#6E1B22` | Buttons, brand text, cart badge |
| Primary dark | `--maroon-700` / `--maroon-900` | `#5E1418` / `#4A1014` | Button hover, footer |
| Secondary | `--gold-500` / `--gold-600` | `#C08A2D` / `#A87A22` | Focus rings, eyebrows, tags, accents |
| Ground | `--cream-100` | `#FBF6EC` | Page background (warm, rice-paper bias) |
| Surface | `--cream-50` | `#FDFBF5` | Cards, header |
| Border | `--cream-300` | `#E6DAC2` | Card and input borders |
| Text | `--ink-900` / `--ink-700` / `--ink-500` | `#2B1B16` / `#4E3A32` / `#7A6459` | Headings / body / muted |
| Pack accents | `--pack-blue/red/gold` | `#1E4FA5` / `#B3181C` / `#C79A33` | Card media tints + tag colors only |

Rule: pack accents never appear on interactive elements — maroon owns all
actions, gold owns all focus/highlight, so the page stays coherent.

### 4.2 Typography

| Role | Face | Size | Notes |
|---|---|---|---|
| Display (h1) | Marcellus | `clamp(32–48px)` | Roman caps, echoes pack lettering; weight 400 only |
| Section (h2) | Marcellus | `clamp(24–32px)` | |
| Card title (h3) | Marcellus | 20px | |
| Body | Karla | 16px / 1.6 | Fallback: Segoe UI, Arial |
| Small / desc | Karla | 14px | |
| Tags / eyebrow | Karla 700 | 12px, uppercase, `letter-spacing: 0.14–0.18em` | |
| Prices | Marcellus 24px | `font-variant-numeric: tabular-nums` | |

Loaded from Google Fonts with system-serif/sans fallbacks.

### 4.3 Spacing & sizing

4px base scale: **4 / 8 / 12 / 16 / 24 / 32 / 48 / 64** (`--s-1` … `--s-16`).

- Page container: `max-width: 72rem`, `16px` side padding
- Card padding: 24px; grid gap: 24px
- Radii: 8px (small), 14px (cards), pill (inputs/buttons/badges)
- Touch targets: all interactive elements ≥ 44×44px
- Elevation: `--shadow-rest` (subtle) → `--shadow-lift` (hover)

---

## 5. Interaction details

| Element | Rest | Hover | Active / other |
|---|---|---|---|
| Product card | 1px border, soft shadow | Lifts `-6px`, deeper shadow, gold border, image zooms `1.05` (260ms ease-out curve) | `:focus-within` triggers the same lift for keyboard users |

The card media well is kept clear behind each pack — no watermark word — so
the photograph reads on its own against the pack's tint.
| Add to cart | Maroon pill | Darker maroon | Press scales `0.96`; click spawns a white **ripple** from the pointer; then 1.4s "Added ✓" state in gold with the button disabled |
| View more | Outlined maroon pill | Soft maroon fill, solid border | Stub with maroon ripple — the product-details page hooks in here later |
| Cart badge | Tabular count | — | **Bump** scale animation on each add; `aria-label` updates ("Cart, 2 items") |
| Search input | Cream pill, icon | Gold border | Focus: gold border + soft gold glow; filters cards live on every keystroke |
| Search results note | "Showing 3 products" | — | `aria-live="polite"` announces filtered counts; empty state message when 0 match |

All animation is disabled under `prefers-reduced-motion: reduce` (checked in
both CSS and JS).

---

## 6. Semantic HTML structure

```html
<a class="skip-link" href="#products">…</a>
<header class="site-header">
  <a class="brand">…</a>
  <form role="search"><label class="visually-hidden">…<input type="search"></form>
  <button class="cart-btn" aria-label="Cart, 0 items">…<span class="cart-count"></button>
</header>
<main>
  <section class="hero" aria-labelledby="hero-heading">…</section>
  <section class="products" aria-labelledby="products-heading">
    <p aria-live="polite">Showing 3 products</p>
    <ul class="product-grid">
      <li>
        <article class="card card--blue">
          <figure class="card-media"><img alt="…"></figure>
          <div class="card-body">
            <p class="card-tag">…</p> <h3>…</h3> <p class="card-desc">…</p>
            <div class="card-foot"><p class="price">…</p><button data-add>Add to cart</button></div>
          </div>
        </article>
      </li>
      … ×3
    </ul>
  </section>
</main>
<footer class="site-footer"><address>…</address></footer>
```

Heading order is strict: one `h1` (hero) → `h2` (section) → `h3` (cards).

---

## 7. CSS architecture

- **Tokens first**: all color, type, spacing, radius, shadow, and motion values
  live in `:root` custom properties; components only reference tokens.
- **Variant classes**: `.card--blue / --red / --gold` change *only* the media
  tint and tag color — one modifier, two declarations, no cascade fights.
- **Layout via `gap`**: grids and flex rows own the spacing; no per-child
  margins to collapse.
- **Single-theme by choice**: the brand is warm-light; the background and every
  color are painted explicitly so the page holds on any host.

CSS-in-JS teams can lift the `:root` block verbatim as a theme object.

---

## 8. Accessibility

- Contrast: maroon `#6E1B22` on cream `#FDFBF5` ≈ 9.9:1; body ink `#4E3A32`
  ≈ 9.3:1; muted `#7A6459` ≈ 4.9:1 — all pass WCAG AA (muted text is 14px+).
- Visible `:focus-visible` ring (3px gold, offset 2px) on every interactive
  element; skip-link to the product grid.
- Search: real `<form role="search">` + associated (visually hidden) `<label>`;
  filter feedback via `aria-live="polite"`, plus an explicit no-results message.
- Cart state is announced through the button's updating `aria-label`; the
  count badge itself is `aria-hidden` to avoid double-reading.
- Images carry full descriptive `alt`; decorative SVGs are `aria-hidden`.
- Keyboard: card lift on `:focus-within`, ripple centers itself when triggered
  by keyboard (no pointer coordinates), "Added ✓" state is text, not color-only.
- `prefers-reduced-motion` kills transforms, ripple, and badge bump.

### Responsive breakpoints

| Range | Layout |
|---|---|
| < 640px | 1-column grid; search bar wraps to its own header row |
| 640–959px | 2-column grid |
| ≥ 960px | 3-column grid; full header row |

---

## 9. React component outline (optional migration)

```jsx
// types
// Product = { id, name, tag, description, price, image, accent: 'blue'|'red'|'gold' }

function SearchBar({ query, onChange }) {
  // <form role="search"> + labeled <input type="search">
  // controlled input; parent filters the product list
}

function AddToCartButton({ onAdd }) {
  // local state: 'idle' | 'added'
  // spawns ripple on pointer click; setTimeout back to 'idle' after 1.4s
  // disabled while 'added'; respects useReducedMotion()
}

function ProductCard({ product, onAdd }) {
  // <article className={`card card--${product.accent}`}>
  // figure > img, tag, h3, desc, price + <AddToCartButton />
}

function ProductPage() {
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const visible = PRODUCTS.filter(p => matches(p, query));
  // Header(SearchBar, CartBadge) → Hero → grid of ProductCard → Footer
  // aria-live region announces `visible.length`
}
```

State stays local (`useState`); no store needed at this scale. The CSS token
block converts 1:1 into a theme object or Tailwind config if preferred.
