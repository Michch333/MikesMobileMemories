import { STORE_CONFIG } from '../data/config.js';

/**
 * Calculates unit price, volume discounts, subtotal, 6% Michigan sales tax, and grand total.
 */
export function calculateOrderPricing(product, selectedChoices, quantity) {
  const optionsExtra = Object.values(selectedChoices).reduce(
    (sum, choice) => sum + (choice?.priceMod || 0),
    0
  );

  let bulkDiscount = 0;
  if (product.bulkTiers && product.bulkTiers.length > 0) {
    const applicableTiers = product.bulkTiers.filter(t => quantity >= t.minQty);
    if (applicableTiers.length > 0) {
      bulkDiscount = Math.max(...applicableTiers.map(t => t.discountPerUnit));
    }
  }

  const unitPrice = Math.max(0, product.basePrice + optionsExtra - bulkDiscount);
  const subtotal = unitPrice * quantity;
  const tax = subtotal * STORE_CONFIG.salesTaxRate;
  const total = subtotal + tax;

  return { unitPrice, bulkDiscount, subtotal, tax, total };
}

/**
 * Serializes any product and its dynamic option groups into the 5 universal Google Form fields.
 */
export function buildGoogleFormUrl(product, selectedChoices, quantity, customNotes, uploadedFileName) {
  const { entries, baseUrl } = STORE_CONFIG.googleForm;
  const pricing = calculateOrderPricing(product, selectedChoices, quantity);

  const optionsText = (product.optionGroups || [])
    .map(group => `${group.label}: ${selectedChoices[group.id]?.label || 'Default'}`)
    .join(" | ");

  const priceSummaryText =
    `$${pricing.unitPrice.toFixed(2)}/ea | Subtotal: $${pricing.subtotal.toFixed(2)} | ` +
    `MI 6% Tax: $${pricing.tax.toFixed(2)} | Est. Total: $${pricing.total.toFixed(2)}`;

  const notesWithFile = [
    customNotes ? `Notes: ${customNotes.trim()}` : "",
    uploadedFileName ? `Previewed Artwork File: ${uploadedFileName}` : ""
  ].filter(Boolean).join(" | ");

  const params = new URLSearchParams({
    usp: "pp_url",
    [entries.productName]: `${product.name} [${product.id}]`,
    [entries.optionsSummary]: optionsText || "Standard Configuration",
    [entries.quantity]: quantity.toString(),
    [entries.priceSummary]: priceSummaryText,
    [entries.customNotes]: notesWithFile || "None"
  });

  return `${baseUrl}?${params.toString()}`;
}
