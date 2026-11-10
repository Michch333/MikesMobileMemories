/**
 * PRODUCT CATALOG — YOUR SINGLE MAINTENANCE FILE
 * To add a new product:
 *   1. Drop a sample photo into /assets/products/
 *   2. Copy/paste a product block below and adjust its options & pricing.
 *   3. Save and deploy! The UI, filters, pricing, and Google Form link update automatically.
 *
 * Supported previewShape values: 'circle' | 'square' | 'rounded' | 'rect'
 */
export const PRODUCTS = [
  {
    id: "uv-challenge-coin",
    name: "Custom 40mm UV Challenge Coin",
    category: "Medallions & Awards",
    basePrice: 12.00,
    featured: false,
    active: true,
    description: "Heavyweight 40mm metal core with full-color raised UV print and protective clear acrylic lens capsule.",
    image: "./assets/products/coin-sample.jpg",
    previewShape: "circle",
    bulkTiers: [
      { minQty: 10, discountPerUnit: 2.00 },
      { minQty: 20, discountPerUnit: 3.50 }
    ],
    optionGroups: [
      {
        id: "core_finish",
        label: "Metal Core Finish",
        choices: [
          { label: "Antique Bronze", priceMod: 0 },
          { label: "Brushed Silver", priceMod: 0 }
        ]
      },
      {
        id: "print_sides",
        label: "UV Print Coverage",
        choices: [
          { label: "Single-Sided", priceMod: 0 },
          { label: "Double-Sided (+Back Design)", priceMod: 1.00 }
        ]
      },
      {
        id: "texture",
        label: "Tactile UV Finish",
        choices: [
          { label: "Standard Matte", priceMod: 0 },
          { label: "Slight raised texture", priceMod: 1.00 },
          { label: "Large raised 3D finish", priceMod: 2.50 }
        ]
      }
    ]
  },
  {
    id: "christmas-ornament",
    name: "Custom Holiday Ornament",
    category: "Seasonal & Keepsakes",
    basePrice: 15.00,
    featured: true,
    active: true,
    description: "Vibrant, permanent UV-cured keepsake ornament with custom winter background or cutout framing.",
    image: "./assets/products/ornament-sample.jpeg",
    previewShape: "rounded",
    bulkTiers: [
      { minQty: 5, discountPerUnit: 2.00 },
      { minQty: 15, discountPerUnit: 3.50 }
    ],
    optionGroups: [
      {
        id: "material",
        label: "Blank Style",
        choices: [
          { label: "Flat Clear Acrylic (3\")", priceMod: 0 },
          { label: "Round Bulb", priceMod: 0 },
          { label: "Round Glass Bulb", priceMod: 5.00 }
        ]
      },
      {
        id: "layering",
        label: "Print Style",
        choices: [
          { label: "Solid Photo (Not see through)", priceMod: 0 },
          { label: "Clear Background", priceMod: 1.50 }
        ]
      },
      {
        id: "ribbon",
        label: "Hanging Ribbon",
        choices: [
          { label: "Gold Ribbon", priceMod: 0 },
          { label: "White Ribbon", priceMod: 0 },
          { label: "Red Ribbon", priceMod: 0 }
        ]
      }
    ]
  },
  {
    id: "custom-magnet",
    name: "Custom Photo Magnet",
    category: "Home & Desk Decor",
    basePrice: 8.00,
    featured: true,
    active: true,
    description: "Custom magnet of a photo / design of your choice! Comes with a strong magnet that can hold up on any metal surface.",
    image: "./assets/products/magnet-sample.jpeg",
    previewShape: "rect",
    bulkTiers: [
      { minQty: 5, discountPerUnit: 2.00 },
      { minQty: 25, discountPerUnit: 5 }
    ],
    optionGroups: [
      {
        id: "dimensions",
        label: "Size/Type",
        choices: [
          { label: "2\" x 2\" Square", priceMod: 0 },
          { label: "3\" x 3\" Round", priceMod: 1.00 },
          { label: "4\" x 6\" Photo Size", priceMod: 10.00 }
        ]
      },
      {
        id: "orientation",
        label: "Orientation",
        choices: [
          { label: "Landscape (Horizontal)", priceMod: 0 },
          { label: "Portrait (Vertical)", priceMod: 0 }
        ]
      }
    ]
  },
  {
    id: "rock-slate-plaque",
    name: "Chiseled Rock Coaster Set",
    category: "Home & Desk Decor",
    basePrice: 30.00,
    featured: false,
    active: true,
    description: "Set of rock coasters with natural texture and durable construction.",
    image: "./assets/products/coaster-sample.jpeg",
    previewShape: "square",
    bulkTiers: [],
    optionGroups: [
      {
        id: "size",
        label: "Dimensions",
        choices: [
          { label: "4\" x 4\" Round", priceMod: 0 },
          { label: "4\" x 4\" Square", priceMod: 0 }
        ]
      }
    ]
  },
  {
    id: "custom-deck-cards",
    name: "Custom Deck of Playing Cards",
    category: "Seasonal & Keepsakes",
    basePrice: 35.00,
    featured: false,
    active: true,
    description: "Custom deck of playing cards with custom face cards of your loved ones!",
    image: "./assets/products/deck-cards-sample.jpeg",
    previewShape: "square",
    bulkTiers: [],
    optionGroups: []
  },
  {
    id: "stained-glass-photo",
    name: "Stained Glass Style Memory",
    category: "Home & Desk Decor",
    basePrice: 10.00,
    featured: false,
    active: true,
    description: "Stained glass style photo with custom UV printed photo / design.",
    image: "./assets/products/stained-glass-sample.jpg",
    previewShape: "round",
    bulkTiers: [],
    optionGroups: [
      {
        id: "size",
        label: "Dimensions",
        choices: [
          { label: "2\" x 2\" Square", priceMod: 0 },
          { label: "3\" x 3\" Round", priceMod: 0 },
          { label: "4\" x 6\" Photo Size", priceMod: 8.00 },
          { label: "12\" x 16\" Large Size", priceMod: 25.00 }
        ]
      }
    ]
  },
  {
    id: "custom-nails",
    name: "Custom Press On Nails",
    category: "Seasonal & Keepsakes",
    basePrice: 18.00,
    featured: true,
    active: true,
    description: "Custom press-on nails with unique designs. Great for upcoming events, holidays, or personal style statements.",
    image: "./assets/products/nails-sample.jpeg",
    previewShape: "round",
    bulkTiers: [],
    optionGroups: [
      {
        id: "size",
        label: "Dimensions",
        choices: [
          { label: "Child", priceMod: 0 },
          { label: "Small", priceMod: 0 },
          { label: "Medium", priceMod: 0 },
          { label: "Large", priceMod: 0 }
        ]
      }
    ]
  }
];
