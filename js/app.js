import { PRODUCTS } from '../data/catalog.js';
import { calculateOrderPricing, buildGoogleFormUrl } from './formBuilder.js';

const state = {
  activeCategory: 'Featured',
  selectedProduct: null,
  selectedChoices: {},
  quantity: 1,
  customNotes: '',
  previewFileName: ''
};

export function initStore() {
  const activeProducts = PRODUCTS.filter(p => p.active);
  renderCategoryFilters(activeProducts);
  
  // Show featured items on initial load (fall back to all products if none are marked featured)
  const initialFiltered = activeProducts.some(p => p.featured)
    ? activeProducts.filter(p => p.featured)
    : activeProducts;
    
  renderProductGrid(initialFiltered);
  
  if (initialFiltered.length > 0) {
    selectProduct(initialFiltered[0]);
  }
  bindGlobalEvents();
}

function renderCategoryFilters(products) {
  // Check if any products are actually marked as featured
  const hasFeatured = products.some(p => p.featured);
  
  // Build category list: put 'Featured' first if featured items exist, then 'All', then unique categories
  const baseCategories = [...new Set(products.map(p => p.category))];
  const categories = [];
  
  if (hasFeatured) categories.push('Featured');
  categories.push('All', ...baseCategories);

  const container = document.getElementById('category-filters');
  container.innerHTML = categories.map(cat => `
    <button type="button" class="filter-btn ${state.activeCategory === cat ? 'active' : ''}" data-category="${cat}">
      ${cat === 'Featured' ? '⭐ Featured' : cat}
    </button>
  `).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.category;
      renderCategoryFilters(products);
      
      // Filter logic
      let filtered = products;
      if (state.activeCategory === 'Featured') {
        filtered = products.filter(p => p.featured);
      } else if (state.activeCategory !== 'All') {
        filtered = products.filter(p => p.category === state.activeCategory);
      }
      
      renderProductGrid(filtered);
    });
  });
}

function renderProductGrid(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = products.map(product => `
    <article class="product-card ${state.selectedProduct?.id === product.id ? 'selected' : ''}" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="card-img">
      <div class="card-body">
        <span class="category-badge">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="card-footer">
          <span class="price-tag">From $${product.basePrice.toFixed(2)}</span>
          <span class="select-btn">Customize &rarr;</span>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const product = PRODUCTS.find(p => p.id === card.dataset.id);
      if (product) selectProduct(product);
    });
  });
}

function selectProduct(product) {
  state.selectedProduct = product;
  state.quantity = 1;
  document.getElementById('qty-input').value = '1';
  state.selectedChoices = {};

  (product.optionGroups || []).forEach(group => {
    state.selectedChoices[group.id] = group.choices[0];
  });

  document.querySelectorAll('.product-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.id === product.id);
  });

  renderCustomizerPanel();
}

function renderCustomizerPanel() {
  const p = state.selectedProduct;
  if (!p) return;

  document.getElementById('customizer-title').textContent = p.name;
  document.getElementById('customizer-desc').textContent = p.description;

  // Update preview frame shape ('circle', 'rect', 'rounded', 'square')
  const previewFrame = document.getElementById('artwork-preview-frame');
  previewFrame.className = `preview-frame shape-${p.previewShape || 'square'}`;

  // Show bulk discount hints if applicable
  const bulkHint = document.getElementById('bulk-tiers-hint');
  if (p.bulkTiers && p.bulkTiers.length > 0) {
    bulkHint.innerHTML = p.bulkTiers
      .map(t => `Order ${t.minQty}+: <strong>-$${t.discountPerUnit.toFixed(2)}/ea</strong>`)
      .join('<br>');
  } else {
    bulkHint.innerHTML = '';
  }

  // Render dynamic option groups
  const optionsContainer = document.getElementById('dynamic-options-container');
  optionsContainer.innerHTML = (p.optionGroups || []).map(group => `
    <div class="option-group">
      <label>${group.label}</label>
      <div class="choices-grid">
        ${group.choices.map((choice, idx) => {
          const isSelected = state.selectedChoices[group.id]?.label === choice.label;
          const modText = choice.priceMod > 0 ? ` (+$${choice.priceMod.toFixed(2)})` : '';
          return `
            <button type="button" class="choice-pill ${isSelected ? 'active' : ''}"
                    data-group="${group.id}" data-index="${idx}">
              ${choice.label}${modText}
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');

  optionsContainer.querySelectorAll('.choice-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const group = p.optionGroups.find(g => g.id === pill.dataset.group);
      state.selectedChoices[group.id] = group.choices[Number(pill.dataset.index)];
      renderCustomizerPanel();
    });
  });

  updatePricingDisplay();
}

function updatePricingDisplay() {
  if (!state.selectedProduct) return;
  const pricing = calculateOrderPricing(state.selectedProduct, state.selectedChoices, state.quantity);
  document.getElementById('summary-qty').textContent = state.quantity.toString();
  document.getElementById('unit-price-val').textContent = `$${pricing.unitPrice.toFixed(2)}`;
  document.getElementById('subtotal-val').textContent = `$${pricing.subtotal.toFixed(2)}`;
  document.getElementById('tax-val').textContent = `$${pricing.tax.toFixed(2)}`;
  document.getElementById('total-val').textContent = `$${pricing.total.toFixed(2)}`;

  const discountBadge = document.getElementById('bulk-discount-badge');
  if (pricing.bulkDiscount > 0) {
    discountBadge.style.display = 'block';
    discountBadge.textContent = `Volume Discount Active: -$${pricing.bulkDiscount.toFixed(2)} off per unit!`;
  } else {
    discountBadge.style.display = 'none';
  }
}

function bindGlobalEvents() {
  document.getElementById('qty-input').addEventListener('input', (e) => {
    state.quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    updatePricingDisplay();
  });

  document.getElementById('custom-notes').addEventListener('input', (e) => {
    state.customNotes = e.target.value;
  });

  const photoInput = document.getElementById('photo-upload');
  const previewImg = document.getElementById('preview-img');
  const placeholder = document.getElementById('preview-placeholder');
  const clearBtn = document.getElementById('clear-photo-btn');

  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    state.previewFileName = file.name;
    const reader = new FileReader();
    reader.onload = (ev) => {
      previewImg.src = ev.target.result;
      previewImg.style.display = 'block';
      placeholder.style.display = 'none';
      clearBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  });

  clearBtn.addEventListener('click', () => {
    photoInput.value = '';
    state.previewFileName = '';
    previewImg.src = '';
    previewImg.style.display = 'none';
    placeholder.style.display = 'flex';
    clearBtn.style.display = 'none';
  });

  document.getElementById('proceed-checkout-btn').addEventListener('click', () => {
    if (!state.selectedProduct) return;
    const url = buildGoogleFormUrl(
      state.selectedProduct,
      state.selectedChoices,
      state.quantity,
      state.customNotes,
      state.previewFileName
    );
    window.open(url, '_blank');
  });

  // Setup guide drawer toggles
  const setupDrawer = document.getElementById('setup-guide-drawer');
  document.getElementById('toggle-setup-btn').addEventListener('click', () => {
    setupDrawer.classList.toggle('hidden');
  });
  document.getElementById('close-setup-btn').addEventListener('click', () => {
    setupDrawer.classList.add('hidden');
  });
}

document.addEventListener('DOMContentLoaded', initStore);
