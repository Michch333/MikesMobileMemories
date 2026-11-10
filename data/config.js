/**
 * BUSINESS & GOOGLE FORM CONFIGURATION
 * Update your Google Form baseUrl and the 5 universal entry.XXXXXXX IDs here once.
 * You DO NOT need to change this file when adding or updating products in catalog.js!
 */
export const STORE_CONFIG = {
  businessName: "Mike's Mobile Memories",
  salesTaxRate: 0.06, // 6% Michigan Sales Tax

  googleForm: {
    // 1. Paste your Google Form's "/viewform" URL here:
    baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf9oeblNOIipCm28SdsSKpERR6rE3_GU6YDuPxHznnmYmm4fw/viewform?",

    // 2. Paste your 5 universal Short Answer field IDs from "Get pre-filled link":
    entries: {
      productName: "entry.2103335064",    // Field 1: Selected Product
      optionsSummary: "entry.446061417", // Field 2: Selected Options / Specs
      quantity: "entry.1323473689",       // Field 3: Quantity
      priceSummary: "entry.1652848702",   // Field 4: Estimated Price Breakdown (w/ 6% MI Tax)
      customNotes: "entry.118222082"     // Field 5: Custom Notes & Previewed Filename
    }
  }
};
