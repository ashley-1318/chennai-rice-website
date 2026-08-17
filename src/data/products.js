// The four 10 kg packs. `tags` drives the filter chips; `search` is the extra
// haystack the original markup carried in data-name.

export const PRODUCTS = [
  {
    id: "rajabhogam-premium",
    variant: "premium",
    tag: "Black & Gold",
    name: "Rajabhogam Premium",
    description: "Our finest pack — aged, hand-graded premium grains.",
    price: 995,
    image: "/assets/pack-premium.png",
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
    image: "/assets/pack-red.png",
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
    image: "/assets/pack-gold.png",
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
    image: "/assets/pack-akshaya.png",
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
