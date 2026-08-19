/* ============================================================
   Infrastructure page — centralized content & figures.
   Update numbers here and they change everywhere on the page.
   Only figures explicitly supplied are included; nothing here is
   invented (no land area, employee counts, machine brands,
   certifications, moisture/purity %, yields or export volumes).
   ============================================================ */

export const INFRA_ASSETS = {
  heroImage: '/assets/infrastructure/hero-aerial.png',
  facilityAerial: '/assets/infrastructure/facility-aerial.png',
  paddyMacro: '/assets/infrastructure/paddy-macro.png',
  paddySelection: '/assets/infrastructure/paddy-selection.png',
  qualityInspection: '/assets/infrastructure/quality-inspection.png',
  procurement: '/assets/infrastructure/procurement.png',
  transportation: '/assets/infrastructure/transportation.png',
  siloAerial: '/assets/infrastructure/silo-aerial.jpg',
  warehouse: '/assets/infrastructure/warehouse.jpg',
  truck: '/assets/infrastructure/truck.jpg',
  fieldLandscape: '/assets/infrastructure/field-landscape.jpg',
  processing: {
    'raw-paddy': '/assets/infrastructure/process-raw-paddy.jpg',
    'pre-cleaning': '/assets/infrastructure/process-pre-cleaning.jpg',
    destoning: '/assets/infrastructure/process-destoning.jpg',
    husking: '/assets/infrastructure/process-husking.jpg',
    separation: '/assets/infrastructure/process-separation.jpg',
    whitening: '/assets/infrastructure/process-whitening.jpg',
    grading: '/assets/infrastructure/process-grading.jpg',
    'colour-sorting': '/assets/infrastructure/process-colour-sorting.jpg',
    'quality-check': '/assets/infrastructure/process-quality-check.jpg',
    packaging: '/assets/infrastructure/process-packaging.jpg',
  },
  fallback: '/assets/shop/factory-placeholder.svg',
}

/* -------------------- capacity & storage (current, reported) -------------------- */

export const FACILITY_CAPACITY = {
  value: '210,240',
  unit: 'TONNES / YEAR',
  label: 'Current Processing Capacity',
  status: 'Current',
}

export const STORAGE_CAPACITY = {
  value: '61,500',
  unit: 'MT',
  label: 'Paddy Storage',
  status: 'Current',
}

export const SILO_COUNT = {
  value: '21',
  unit: 'SILOS',
  label: 'Silos',
  status: 'Current',
}

export const NASIYANUR_SILOS = {
  value: '3',
  unit: 'SILOS',
  location: 'Nasiyanur',
}

export const SIPCOT_SILOS = {
  value: '18',
  unit: 'SILOS',
  location: 'SIPCOT',
}

/* -------------------- expansion (planned, not current) -------------------- */

export const PLANNED_CAPACITY = {
  value: '420,480',
  unit: 'MTPA',
  label: 'Planned Capacity',
  status: 'Planned / Expansion',
  description:
    'Processing capacity is expanding toward 420,480 MTPA through a new facility in the SIPCOT Industrial Area.',
}

/* -------------------- section 02: paddy to processing -------------------- */

export const SOURCING_STEPS = [
  {
    num: '01',
    title: 'Paddy Selection',
    text: 'Paddy is sourced from growing regions known for the varieties Chennai Rice processes, chosen batch by batch before it ever reaches the mill.',
    image: 'paddySelection',
  },
  {
    num: '02',
    title: 'Quality Inspection',
    text: 'Incoming paddy is inspected on arrival, so only lots that meet our intake standard move forward into procurement.',
    image: 'qualityInspection',
  },
  {
    num: '03',
    title: 'Controlled Procurement',
    text: 'Procurement is managed to keep varieties separate and traceable from the point of purchase through to storage.',
    image: 'procurement',
  },
  {
    num: '04',
    title: 'Transportation',
    text: 'Paddy is moved to our facility under controlled handling, protecting grain condition before it enters storage and processing.',
    image: 'transportation',
  },
]

/* -------------------- section 03: quality -------------------- */

export const QUALITY_CARDS = [
  {
    title: 'Moisture Control',
    text: 'Paddy moisture is monitored before storage and processing to support consistent milling outcomes.',
  },
  {
    title: 'Grain Quality',
    text: 'Grain condition is assessed at intake, so only paddy meeting our standard is carried forward.',
  },
  {
    title: 'Purity',
    text: 'Foreign matter and admixture are checked and removed through cleaning and sorting stages.',
  },
  {
    title: 'Consistency',
    text: 'Process controls are applied uniformly across batches to keep outcomes consistent pack to pack.',
  },
]

/* -------------------- section 04: processing sequence -------------------- */

export const PROCESSING_STAGES = [
  { id: 'raw-paddy', num: '01', title: 'Raw Paddy', text: 'Paddy arrives from storage and enters the processing line.' },
  { id: 'pre-cleaning', num: '02', title: 'Pre-Cleaning', text: 'Coarse impurities and foreign matter are removed before milling begins.' },
  { id: 'destoning', num: '03', title: 'Destoning', text: 'Stones and dense debris are separated out from the grain stream.' },
  { id: 'husking', num: '04', title: 'Husking', text: 'The husk is removed from the paddy to reveal brown rice.' },
  { id: 'separation', num: '05', title: 'Separation', text: 'Husked and un-husked grain are separated for re-processing where needed.' },
  { id: 'whitening', num: '06', title: 'Whitening / Polishing', text: 'The bran layer is removed and the grain is polished.' },
  { id: 'grading', num: '07', title: 'Grading', text: 'Grains are graded by size and length.' },
  { id: 'colour-sorting', num: '08', title: 'Colour Sorting', text: 'Optical sorting removes discoloured and off-type grains.' },
  { id: 'quality-check', num: '09', title: 'Quality Check', text: 'A quality check is carried out before the batch proceeds to packaging.' },
  { id: 'packaging', num: '10', title: 'Packaging', text: 'Finished rice is packed and prepared for dispatch.' },
]

/* -------------------- section 06: silo storage -------------------- */

export const SILO_LOCATIONS = [
  { value: '3', unit: 'SILOS', location: 'Nasiyanur' },
  { value: '18', unit: 'SILOS', location: 'SIPCOT' },
  { value: '61,500', unit: 'MT', location: 'Total Storage' },
]

/* -------------------- section 07: packaging showcase -------------------- */
/* Mapped to real project assets already in /public/assets — no new
   packaging artwork created or modified. */

export const PACKAGING_PRODUCTS = [
  {
    name: 'White Ponni Rice',
    image: '/assets/products/product-2.png',
    fallback: '/assets/shop/pack-red.png',
  },
  {
    name: 'Idly Rice',
    image: { src: '/assets/products/product-4.png', fallback: '/assets/products/product-1.png' },
  },
  {
    name: 'Special Rajabhogam',
    image: '/assets/shop/pack-premium.png',
  },
]

/* -------------------- section 08: warehouse & logistics -------------------- */

export const LOGISTICS_FLOW = ['Processing', 'Warehouse', 'Distribution', 'Retail', 'Your Home']

/* -------------------- section 09: quality control -------------------- */

export const QC_CARDS = [
  { num: '01', title: 'Incoming Quality', text: 'Paddy is checked as it arrives, before it enters storage.' },
  { num: '02', title: 'Processing Quality', text: 'Grain is monitored as it moves through each processing stage.' },
  { num: '03', title: 'Grain Quality', text: 'Milled grain is assessed for size, shape and appearance.' },
  { num: '04', title: 'Final Quality', text: 'Packed rice is checked before it leaves the facility.' },
]

/* -------------------- section 10: infrastructure numbers -------------------- */

export const INFRA_NUMBERS = [
  { value: '1950s', unit: '', label: 'Heritage', status: 'Reported' },
  { value: '210,240', unit: 'MTPA', label: 'Current Capacity', status: 'Current' },
  { value: '61,500', unit: 'MT', label: 'Storage', status: 'Current' },
  { value: '21', unit: '', label: 'Silos', status: 'Current' },
  { value: '420,480', unit: 'MTPA', label: 'Planned Capacity', status: 'Planned' },
]

/* -------------------- misc copy -------------------- */

export const INFRA_HERO = {
  label: 'Chennai Rice Infrastructure',
  titleLines: ['Built for Quality.', 'Engineered for Every Grain.'],
  subtitle:
    'From carefully selected paddy to perfectly packed rice, our infrastructure combines modern processing, controlled storage and efficient distribution to preserve quality at every stage.',
  cta: 'Explore Our Infrastructure',
}

export const INFRA_FINAL_CTA = {
  title: 'From Our Fields to Your Family',
  text: 'Behind every pack of Chennai Rice is a journey of sourcing, precision, quality and care.',
  cta: 'Discover Our Products',
  to: '/products',
}
