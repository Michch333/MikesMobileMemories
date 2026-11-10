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
