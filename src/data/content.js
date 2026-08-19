/* ============================================================
   All page content and asset paths in one place.
   Assets live in /public/assets — replace a file there and it
   updates everywhere. An entry may be a plain path string or
   { src, fallback } (fallback shows until the real file exists).
   ============================================================ */

export const ASSETS = {
  logo: '/assets/logo.png',
  heroVideo: '/assets/hero.mp4',
  wheatLeft: '/assets/decor/wheat-left.png',
  wheatRight: '/assets/decor/wheat-right.png',
  riceBowl: '/assets/decor/rice-bowl.png',
  grainsGold: '/assets/decor/grains-gold.png',
  grainsWhite: '/assets/decor/grains-white.png',
  paddySpray: '/assets/decor/paddy-spray.png',
  grainsFlying: '/assets/decor/grains-flying.png',
}

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Infrastructure', to: '/infrastructure' },
  { label: 'Contact', to: '/contact' },
]

export const NAV_CTA = { label: 'Reach Us', to: '/contact' }

export const HERO = {
  titleLines: ['Rice.', 'The White Gold', 'Among Foods.'],
  subtitle: 'The simplicity of cooking rice is the most culturally satisfying experience.',
  estd: '1980',
}

export const PRODUCTS = [
  {
    num: '01',
    shortName: 'Vada Kolam',
    ghost: ['VADA', 'KOLAM'],
    name: 'VADA KOLAM RICE',
    desc: 'The pride of Tamil Nadu — soft, fluffy, and perfect for everyday meals. Sourced from the fertile Kaveri delta.',
    packSize: '1, 5, 10, 26 KG',
    riceType: 'Vada Kolam Rice',
    idealFor: 'Everyday Meals',
    image: '/assets/products/product-1.png',
    tint: '#F8F3E9',
  },
  {
    num: '02',
    shortName: 'Ponni Rice',
    ghost: ['PONNI', 'RICE'],
    name: 'PONNI RICE',
    desc: 'Aged to perfection for the authentic South Indian table — light, aromatic and easy on every stomach.',
    packSize: '1, 5, 10, 26 KG',
    riceType: 'Ponni Boiled Rice',
    idealFor: 'Daily Meals & Variety Rice',
    image: '/assets/products/product-2.png',
    tint: '#EBF3F8',
  },
  {
    num: '03',
    shortName: 'Basmati Rice',
    ghost: ['BASMATI', 'RICE'],
    name: 'BASMATI RICE',
    desc: 'Long, slender grains with a rich royal aroma — the first choice for biryani and festive cooking.',
    packSize: '1, 5, 10, 26 KG',
    riceType: 'Premium Basmati',
    idealFor: 'Biryani & Pulao',
    image: '/assets/products/product-3.png',
    tint: '#FAF5EC',
  },
  {
    num: '04',
    shortName: 'Raw Rice',
    ghost: ['RAW', 'RICE'],
    name: 'RAW RICE',
    desc: 'Naturally processed raw rice that keeps its wholesome taste — ideal for idli, dosa and sweets.',
    packSize: '1, 5, 10, 26 KG',
    riceType: 'Raw White Rice',
    idealFor: 'Tiffin & Sweets',
    image: { src: '/assets/products/product-4.png', fallback: '/assets/products/product-1.png' },
    tint: '#EDF2F0',
  },
]

/* Count-up stats shown just above the product showcase. */
export const STATS = [
  { target: 50, suffix: '+', label: 'Years of Excellence' },
  { target: 25, suffix: '+', label: 'Rice Varieties' },
  { target: 500, suffix: '+', label: 'Retail Partners' },
  { target: 100, suffix: '%', label: 'Quality Assured' },
]

export const SHOWCASE = {
  introTitle: 'Four Signature Varieties',
  introText: 'Milled, polished and packed with the same care since 1980.',
  ctaTitle: 'Find Your Perfect Grain',
  ctaText: 'Every variety we mill carries the same promise of purity, aroma and trust.',
  ctaButton: 'View All Products',
}

export const FEATURES = [
  { icon: 'sourced', label: ['Carefully', 'Sourced'] },
  { icon: 'processed', label: ['Hygienically', 'Processed'] },
  { icon: 'quality', label: ['Premium', 'Quality'] },
  { icon: 'grains', label: ['Uniform', 'Grains'] },
  { icon: 'polish', label: ['No Artificial', 'Polish'] },
  { icon: 'aroma', label: ['Rich in Taste', '& Aroma'] },
]

export const TESTIMONIALS = [
  {
    name: 'Anitha Krishnan',
    city: 'Chennai',
    quote:
      "Chennai Rice has become our family's favourite. The aroma and taste are simply unmatched!",
    avatar: '/assets/testimonials/avatar-1.jpg',
  },
  {
    name: 'Gopal Reddy',
    city: 'Coimbatore',
    quote:
      'We have been using Chennai Rice for years. Consistent quality and excellent taste every time.',
    avatar: '/assets/testimonials/avatar-2.jpg',
  },
  {
    name: 'Meena Iyer',
    city: 'Bangalore',
    quote: 'Fluffy, soft and perfect for all our dishes. I highly recommend Chennai Rice.',
    avatar: '/assets/testimonials/avatar-3.jpg',
  },
  {
    name: 'Ramesh Kumar',
    city: 'Trichy',
    quote: 'From everyday meals to festive feasts, Chennai Rice never disappoints!',
    avatar: '/assets/testimonials/avatar-4.jpg',
  },
  {
    name: 'Lakshmi Sundaram',
    city: 'Madurai',
    quote: 'Every grain cooks evenly. My family can taste the difference at every meal.',
    avatar: '/assets/testimonials/avatar-5.jpg',
  },
  {
    name: 'Karthik Raja',
    city: 'Salem',
    quote: 'Clean, well sorted and never sticky. This is the only brand I buy now.',
    avatar: '/assets/testimonials/avatar-6.jpg',
  },
  {
    name: 'Saroja Devi',
    city: 'Thanjavur',
    quote: 'I have cooked rice for forty years. This is the quality I remember from childhood.',
    avatar: '/assets/testimonials/avatar-7.jpg',
  },
  {
    name: 'Vignesh Balaji',
    city: 'Erode',
    quote: 'Great value and dependable quality. Our kitchen switched and never looked back.',
    avatar: '/assets/testimonials/avatar-8.jpg',
  },
]

export const CELEB_HEAD = {
  label: 'Brand Ambassadors',
  title: 'Trusted by the Best',
}

export const CELEBS = [
  {
    name: 'KUSHBOO',
    quote: "I trust Chennai Rice for my family. It's pure, healthy and full of goodness.",
    signature: 'Kushboo',
    image: '/assets/celebs/kushboo.png',
  },
  {
    name: 'CHEF DHAMO',
    quote: 'As a chef, I choose only the best. Chennai Rice brings out the best in every dish.',
    signature: 'Chef Dhamo',
    image: '/assets/celebs/chef-dhamo.png',
    // his shot is a half-body crop, so it needs more height to read
    // at the same visual size as the others
    scale: 1.18,
  },
]

export const FOOTER = {
  brandName: 'CHENNAI RICE',
  brandSub: 'INDUSTRIES INDIA (P) LTD.',
  estd: '1980',
  motto: 'From Our Fields to Your Family',

  footerLinks: [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'About Us', to: '/about' },
    { label: 'Infrastructure', to: '/infrastructure' },
    { label: 'Contact', to: '/contact' },
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Privacy Policy', to: '/privacy' },
  ],

  newsletter: {
    title: 'Stay Connected',
    text: 'Subscribe to get special offers, recipes, and the latest updates from Chennai Rice.',
    placeholder: 'Enter your email',
  },

  columns: [
    {
      head: 'Company',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Our Team', to: '/our-team' },
        { label: 'Careers', to: '/careers' },
        { label: 'Contact Us', to: '/contact' },
      ],
    },
    {
      head: 'Products',
      links: [
        { label: 'Our Rice', to: '/products' },
        { label: 'Quality', to: '/quality' },
        { label: 'Varieties', to: '/products' },
        { label: 'Packaging', to: '/packaging' },
      ],
    },
    {
      head: 'Resources',
      links: [
        { label: 'Recipes', to: '/recipes' },
        { label: 'Blogs', to: '/blog' },
        { label: 'CSR', to: '/csr' },
        { label: 'Downloads', to: '/downloads' },
      ],
    },
    {
      head: 'Support',
      links: [
        { label: 'FAQs', to: '/faqs' },
        { label: 'Track Order', to: '/track-order' },
        { label: 'Shipping & Delivery', to: '/shipping' },
        { label: 'Terms & Conditions', to: '/terms' },
      ],
    },
  ],

  phone: '+91 12345 67890',
  email: 'info@chennairice.com',
  address: ['123, Rice Mill Road,', 'Chennai - 600 001, Tamil Nadu, India'],
  copyright: '© 2026 Chennai Rice Industries India (P) Ltd. All Rights Reserved.',
}

