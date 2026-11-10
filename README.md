# Mike's Mobile Memories — Cloudflare Pages Storefront

A zero-build, data-driven storefront built with native ES6 JavaScript modules. Designed to deploy directly to **Cloudflare Pages** and funnel customized product orders into your **Google Form / Google Sheet** using a 5-field universal pre-fill pattern.

---

## Folder Structure

```text
mikes-mobile-memories/
├── index.html               # App shell & layout (never needs editing when adding items)
├── css/
│   └── styles.css           # Dark-mode styling & dynamic artwork preview frames
├── data/
│   ├── config.js            # Your Google Form baseUrl & 5 universal entry.XXXXX IDs
│   └── catalog.js           # YOUR ONLY MAINTENANCE FILE: Add/edit products here
├── js/
│   ├── app.js               # Renders catalog, option pills, live photo preview & pricing
│   └── formBuilder.js       # Calculates 6% MI sales tax & builds the Google Form URL
└── assets/
    └── products/            # Drop your product sample photos here (.jpg, .png, .webp, .svg)
```

---

## Step 1: One-Time Google Form Setup

To avoid having to update your Google Form every time you invent a new product, set up your Google Form with **5 Short Answer questions** at the top:

1. **Selected Product** (Short Answer)
2. **Selected Options / Specs** (Short Answer)
3. **Quantity** (Short Answer)
4. **Estimated Price Summary** (Short Answer)
5. **Custom Notes** (Short Answer)
6. **Upload Your Photo / Artwork** (File Upload)
7. **Customer Name, Email & Phone** (Short Answer)

### How to Grab Your 5 `entry.XXXXXXX` IDs:
1. Open your Google Form in edit mode and click the **three vertical dots** (top-right) -> **Get pre-filled link**.
2. Type `PRODUCT`, `OPTIONS`, `QTY`, `PRICE`, and `NOTES` into the first 5 boxes and click **Get Link** -> **Copy Link**.
3. Paste that link into a notepad—it will look like:
   `https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?usp=pp_url&entry.12345=PRODUCT&entry.67890=OPTIONS...`
4. Copy the base URL and those 5 `entry.XXXXXXX` numbers into `data/config.js`.

---

## Step 2: How to Add or Edit Products Later

1. Drop your product photo into `assets/products/` (e.g., `golf-marker.jpg`).
2. Open `data/catalog.js` and copy/paste an item block inside the `PRODUCTS` array.
3. Set `previewShape` to `'circle'`, `'square'`, `'rounded'`, or `'rect'` to match the product's shape.
4. Add as many `optionGroups` or `bulkTiers` as you want—the storefront will build the buttons and calculate pricing + 6% Michigan Sales Tax automatically!
