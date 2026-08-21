// The four packs. `tags` drives the filter chips; `search` is the extra
// haystack the original markup carried in data-name.
//
// Only the 10 kg price is a real, confirmed figure. 5 kg and 25 kg are
// derived from it by simple per-kg scaling as an editable placeholder —
// swap in exact real prices for those sizes here as soon as they're known.
const scalePrice = (price10kg, kg) => Math.round((price10kg / 10) * kg);

function withPackSizes(price10kg) {
  return [
    { kg: 5, price: scalePrice(price10kg, 5) },
    { kg: 10, price: price10kg },
    { kg: 25, price: scalePrice(price10kg, 25) },
  ];
}

export const PRODUCTS = [
  {
    id: "rajabhogam-premium",
    variant: "premium",
    tag: "Black & Gold",
    name: "Rajabhogam Premium",
    description: "Our finest pack — aged, hand-graded premium grains.",
    price: 995,
    packSizes: withPackSizes(995),
    image: "/assets/shop/pack-premium.png",
    alt: "Special Rajabhogam Kitchidi Ponni Rice in the premium black and gold 10 kg pack",
    width: 456,
    height: 748,
    tags: ["premium", "ponni"],
    search: "special rajabhogam premium kitchidi ponni rice black gold aged",
    flag: "★ Premium"
  },
  {
    id: "raja-bogam-ponni",
    variant: "red",
    tag: "Classic Red",
    name: "Raja Bogam Ponni",
    description: "The everyday family pack — soft bite, clean aroma.",
    price: 795,
    packSizes: withPackSizes(795),
    image: "/assets/shop/pack-red.png",
    alt: "Raja Bogam Ponni rice in the classic red 10 kg pack",
    width: 515,
    height: 820,
    tags: ["ponni"],
    search: "raja bogam rajabhogam ponni rice classic red everyday family pack"
  },
  {
    id: "vada-kolam",
    variant: "gold",
    tag: "Golden",
    name: "Vada Kolam",
    description: "Fine slender grains that cook light and fluffy.",
    price: 895,
    packSizes: withPackSizes(895),
    image: "/assets/shop/pack-gold.png",
    alt: "Vada Kolam rice in the golden 10 kg pack",
    width: 490,
    height: 820,
    tags: ["kolam"],
    search: "vada kolam kitchidi ponni rice golden fine slender grains"
  },
  {
    id: "akshaya-ponni",
    variant: "orange",
    tag: "Orange",
    name: "Akshaya Ponni",
    description: "Full-bodied Ponni grains for generous everyday meals.",
    price: 845,
    packSizes: withPackSizes(845),
    image: "/assets/shop/pack-akshaya.png",
    alt: "Akshaya Ponni rice in the orange 10 kg pack",
    width: 492,
    height: 820,
    tags: ["ponni"],
    search: "akshaya ponni akashaya kitchidi ponni rice orange everyday"
  }
];

export const FILTERS = [
  { id: "all", label: "All packs" },
  { id: "premium", label: "Premium" },
  { id: "ponni", label: "Ponni" },
  { id: "kolam", label: "Kolam" }
];

// The closing 3D lineup shows every pack in range order.
export const LINEUP = PRODUCTS.map((p) => ({
  id: p.id,
  image: p.image,
  alt: `${p.name} pack`,
  width: p.width,
  height: p.height
}));
