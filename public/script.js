// Products data in Hebrew - Shavuot 2025 Menu - Updated based on menu image
const products = [
  // חגיגיות - Festive Cakes
  {
    id: 1,
    category: 'חגיגיות',
    title: 'גבינה באסקית',
    description: 'קרם גבינה שמנת ומסקרפונה עשיר אפוי | ללא גלוטן | קוטר 20',
    price: 176,
  },
  {
    id: 2,
    category: 'חגיגיות',
    title: 'גבינה ניו-יורק',
    description: 'ברטון אוורירי, מלית גבינה אפויה, שמנת חמוצה ופירות טריים | קוטר 20',
    price: 176,
  },
  {
    id: 3,
    category: 'חגיגיות',
    title: 'גבינה פירורים',
    description: 'בצק פריך, מוס גבינה קלאסי, פירורי חמאה זהובים | קוטר 20',
    price: 154,
  },

  // פסים - Pastries
  {
    id: 4,
    category: 'פסים',
    title: 'פרסבורגר גבינה',
    description: 'בצק פרסבורגר חמאתי, מלית גבינה נימוחה',
    price: 84,
  },
  {
    id: 5,
    category: 'פסים',
    title: 'גבינה פקאן',
    description: 'פריך פקאנים, מלית גבינה אפויה, קראמבל פקאן',
    price: 78,
  },
  {
    id: 6,
    category: 'פסים',
    title: 'גבינה סבלה קקאו',
    description: 'בצק פריך קקאו שקדים, גבינה אפויה, סבלה עוגיות שוקולד',
    price: 72,
  },

  // מיוחדים לחג - Holiday Specials
  {
    id: 7,
    category: 'מיוחדים לחג',
    title: "בלינצ'ס גבינה פירורים",
    description: "בלינצ'ס דקיקים במילוי עשיר של גבינה מתוקה ופירורי חמאה | 8 יחידות",
    price: 52,
  },
  {
    id: 8,
    category: 'מיוחדים לחג',
    title: 'פחזניות קראמבל וניל',
    description: 'פחזניות אווריריות מלאות בקרם דיפלומט וניל מדגסקר | 12 יחידות',
    price: 74,
  },

  // מלוחים - Savory
  {
    id: 12,
    category: 'מלוחים',
    title: 'קיש בטטה',
    description: 'בטטה צלויה, אגוזי מלך ובצל ירוק | קוטר 20',
    price: 84,
  },
  {
    id: 13,
    category: 'מלוחים',
    title: 'קיש ים תיכוני',
    description: 'פלפל קלוי, חציל קלוי ובולגרית מעודנת | קוטר 20',
    price: 84,
  },
  {
    id: 14,
    category: 'מלוחים',
    title: 'קיש בצל פרמזן',
    description: 'בצל מקורמל ופרמזן | קוטר 20',
    price: 84,
  },
  {
    id: 15,
    category: 'מלוחים',
    title: 'קיש עגבניות שרי צלויות ',
    description: 'עגבניות שרי צלויות, בזילקום ומוצרלה | קוטר 20',
    price: 84,
  },
  {
    id: 16,
    category: 'מלוחים',
    title: 'מאפה עלים גבינות ותרד',
    description: 'שכבות בצק עלים חמאתי, במילוי גבינות מלוחות ותרד צלוי',
    price: 98,
  },
  {
    id: 17,
    category: 'מלוחים',
    title: 'מארז מאפי קרואסון בשלושה טעמים',
    description: 'פולנטה פטיסרי | בטטה מוצרלה | פלפל זעתר בולגרית | 15 יחידות',
    price: 114,
  },
  {
    id: 18,
    category: 'מלוחים',
    title: "מארז בלינצ'ס גבינות",
    description: "בלינצ'ס דקיקים במילוי גבינות מלוחות, עגבניות מיובשות ובצל ירוק | 8 יחידות",
    price: 58,
  },
];

// Custom order for categories
const categoryOrder = ['חגיגיות', 'פסים', 'מיוחדים לחג', 'מלוחים'];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const basketSidebar = document.getElementById('basket-sidebar');
const basketItems = document.getElementById('basket-items');
const emptyBasketEl = document.getElementById('empty-basket');
const basketCountEl = document.getElementById('basket-count');
const basketTotalPriceEl = document.getElementById('basket-total-price');
const basketToggle = document.getElementById('basket-toggle');
const closeBasket = document.getElementById('close-basket');
const overlay = document.getElementById('overlay');
const checkoutButton = document.getElementById('checkout-button');
const checkoutModal = document.getElementById('checkout-modal');
const closeModal = document.getElementById('close-modal');
const checkoutForm = document.getElementById('checkout-form');
const thankYouModal = document.getElementById('thank-you-modal');
const closeThankYou = document.getElementById('close-thank-you');
const backToShoppingBtn = document.getElementById('back-to-shopping');
const floatingBasketBtn = document.getElementById('floating-basket-button');
const floatingBasketCountEl = document.getElementById('floating-basket-count');

// Basket State - Using localStorage to persist basket between sessions
let basket = JSON.parse(localStorage.getItem('shavuotBasket')) || [];

// Format price function - display in ILS format
function formatPrice(price) {
  return '₪' + price.toFixed(2);
}

// Get categories in custom order
function getCategories() {
  // Filter only categories that actually have products
  const availableCategories = [...new Set(products.map((product) => product.category))];
  // Return ordered categories (only those that exist in products)
  return categoryOrder.filter((category) => availableCategories.includes(category));
}

// Render Products by Category
function renderProducts() {
  productsContainer.innerHTML = '';

  const categories = getCategories();

  categories.forEach((category) => {
    // Create category section
    const categorySection = document.createElement('section');
    categorySection.className = 'category-section';
    categorySection.setAttribute('data-category', category);

    // Add category header
    const categoryHeader = document.createElement('h3');
    categoryHeader.className = 'category-title';
    categoryHeader.textContent = category;
    categorySection.appendChild(categoryHeader);

    // Create products grid for this category
    const categoryProducts = document.createElement('div');
    categoryProducts.className = 'products-grid';

    // Filter products by category
    const categoryItems = products.filter((product) => product.category === category);

    // Add products to the grid
    // Modify this part of your script.js file
    categoryItems.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.setAttribute('data-product-id', product.id);

      // First create the product info HTML
      const productHtml = `
    <div class="product-info">
      <h4 class="product-title">${product.title}</h4>
<p class="product-description">${fixDescriptionText(product.description)}</p>
      <div class="product-footer">
        <span class="product-price">${formatPrice(product.price)}</span>
<div class="add-to-basket-wrapper" data-id="${product.id}">
  <button class="add-to-basket" data-id="${product.id}">
    <i class="fas fa-plus" aria-hidden="true"></i> הוסף לסל
  </button>
  <div class="quantity-selector hidden">
    <button class="decrease-qty" aria-label="הפחת כמות">-</button>
    <input type="number" value="1" min="1" class="quantity-input" />
    <button class="increase-qty" aria-label="הגדל כמות">+</button>
    <button class="confirm-add" aria-label="אישור הוספה">אישור</button>
  </div>
</div>

      </div>
    </div>
  `;

      // Set the HTML content
      productCard.innerHTML = productHtml;

      // Add recommended class and ribbon to specific products AFTER setting innerHTML
      const recommendedProducts = [2, 4, 18]; // Product IDs for: גבינה ניו-יורק, פרסבורגר גבינה, מארז בלינצ'ס גבינות
      if (recommendedProducts.includes(product.id)) {
        productCard.classList.add('recommended');
        const recommendedRibbon = document.createElement('div');
        recommendedRibbon.className = 'recommended-ribbon';
        productCard.appendChild(recommendedRibbon);
      }

      categoryProducts.appendChild(productCard);
    });

    // Add products grid to the category section
    categorySection.appendChild(categoryProducts);

    // Add the category section to the main container
    productsContainer.appendChild(categorySection);
  });

  // Add event listeners after DOM is updated
  addProductEventListeners();
}

// Add event listeners to product buttons
// Add event listeners to product buttons
function addProductEventListeners() {
  const addToBasketWrappers = document.querySelectorAll('.add-to-basket-wrapper');

  addToBasketWrappers.forEach((wrapper) => {
    const button = wrapper.querySelector('.add-to-basket');
    const quantitySelector = wrapper.querySelector('.quantity-selector');
    const input = wrapper.querySelector('.quantity-input');
    const confirmBtn = wrapper.querySelector('.confirm-add');
    const increaseBtn = wrapper.querySelector('.increase-qty');
    const decreaseBtn = wrapper.querySelector('.decrease-qty');

    button.addEventListener('click', () => {
      button.style.display = 'none';
      quantitySelector.classList.remove('hidden');
      // Set initial focus for better UX
      increaseBtn.focus();
    });

    increaseBtn.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
      // Update display immediately for visual feedback
      input.style.fontWeight = 'bold';
      setTimeout(() => {
        input.style.fontWeight = 'normal';
      }, 200);
    });

    decreaseBtn.addEventListener('click', () => {
      const val = parseInt(input.value);
      if (val > 1) {
        input.value = val - 1;
        // Update display immediately for visual feedback
        input.style.fontWeight = 'bold';
        setTimeout(() => {
          input.style.fontWeight = 'normal';
        }, 200);
      }
    });

    confirmBtn.addEventListener('click', () => {
      const quantity = parseInt(input.value);
      const id = parseInt(button.getAttribute('data-id'));

      for (let i = 0; i < quantity; i++) {
        addToBasket(id, false); // false means don't show sidebar
      }

      quantitySelector.classList.add('hidden');
      button.style.display = 'inline-flex';
      input.value = 1;

      // Show a brief toast notification for better feedback
      showToastNotification(`נוסף ${quantity} יח' לסל`);
    });

    // Add touch swipe support to close quantity selector
    let touchStartX = 0;
    let touchEndX = 0;

    quantitySelector.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    quantitySelector.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (Math.abs(touchEndX - touchStartX) > 50) {
          // Swipe gesture detected - cancel and reset
          quantitySelector.classList.add('hidden');
          button.style.display = 'inline-flex';
          input.value = 1;
        }
      },
      { passive: true }
    );
  });
}
function showToastNotification(message) {
  // Create toast element if it doesn't exist
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  // Set message and show toast
  toast.textContent = message;
  toast.classList.add('show');

  // Hide toast after 2 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
// Add to Basket
// Add to Basket
function addToBasket(productId, openSidebar = false) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const itemInBasket = basket.find((item) => item.id === productId);
  if (itemInBasket) {
    itemInBasket.quantity++;
  } else {
    basket.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('shavuotBasket', JSON.stringify(basket));
  updateBasket();

  if (openSidebar) showBasketSidebar();

  // Add pulse animation to both basket icons
  basketToggle.classList.add('pulse');
  if (floatingBasketBtn) floatingBasketBtn.classList.add('pulse');

  // Remove pulse animation after delay
  setTimeout(() => {
    basketToggle.classList.remove('pulse');
    if (floatingBasketBtn) floatingBasketBtn.classList.remove('pulse');
  }, 700);

  announceToScreenReader(`נוסף לסל: ${product.title}`);
}

// Remove from Basket
function removeFromBasket(productId) {
  basket = basket.filter((item) => item.id !== productId);

  // Save to localStorage
  localStorage.setItem('shavuotBasket', JSON.stringify(basket));

  updateBasket();

  // Announce to screen readers
  const product = products.find((p) => p.id === productId);
  if (product) {
    announceToScreenReader(`הוסר מהסל: ${product.title}`);
  }
}

// Update quantity
function updateQuantity(productId, newQuantity) {
  const itemInBasket = basket.find((item) => item.id === productId);

  if (!itemInBasket) return;

  // Ensure the quantity is at least 1
  newQuantity = Math.max(1, newQuantity);
  itemInBasket.quantity = newQuantity;

  // Save to localStorage
  localStorage.setItem('shavuotBasket', JSON.stringify(basket));

  updateBasket();
}

// Announce to screen readers (accessibility improvement)
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'assertive');
  announcement.className = 'visually-hidden';
  announcement.textContent = message;
  document.body.appendChild(announcement);

  // Remove after announcement is processed
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Update Basket UI
// Update Basket UI
function updateBasket() {
  // Update basket count
  const totalItems = basket.reduce((total, item) => total + item.quantity, 0);
  basketCountEl.textContent = totalItems;

  // Update floating basket count too if it exists
  if (floatingBasketCountEl) floatingBasketCountEl.textContent = totalItems;

  // Toggle empty basket message
  if (basket.length === 0) {
    emptyBasketEl.style.display = 'flex';
  } else {
    emptyBasketEl.style.display = 'none';
  }

  // Clear existing basket items except for the empty basket message
  const basketItemsElements = basketItems.querySelectorAll('.basket-item');
  basketItemsElements.forEach((item) => item.remove());

  // Add basket items
  basket.forEach((item) => {
    const basketItem = document.createElement('div');
    basketItem.className = 'basket-item';
    basketItem.setAttribute('data-product-id', item.id);

    // Inside updateBasket function, replace the basketItem.innerHTML = `...` part with this:
    basketItem.innerHTML = `
  <div class="basket-item-info">
    <div class="basket-item-title">${item.title}</div>
    <div class="basket-item-price">${formatPrice(item.price * item.quantity)}</div>
  </div>
  <div class="basket-item-actions">
    <button class="quantity-btn decrease-btn" data-id="${item.id}" aria-label="הפחת כמות ${
      item.title
    }">-</button>
    <span class="item-quantity" aria-live="polite">${item.quantity}</span>
    <button class="quantity-btn increase-btn" data-id="${item.id}" aria-label="הגדל כמות ${
      item.title
    }">+</button>
    <button class="remove-item" data-id="${item.id}" aria-label="הסר ${item.title} מהסל">
      <i class="fas fa-trash-alt" aria-hidden="true"></i>
    </button>
  </div>
`;

    basketItems.appendChild(basketItem);
  });

  // Add event listeners to the new basket items
  addBasketItemEventListeners();

  // Update total price
  const totalPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);
  basketTotalPriceEl.textContent = formatPrice(totalPrice);

  // Disable checkout button if basket is empty
  checkoutButton.disabled = basket.length === 0;
  if (basket.length === 0) {
    checkoutButton.classList.add('disabled');
  } else {
    checkoutButton.classList.remove('disabled');
  }
}

// Add event listeners to basket item buttons
function addBasketItemEventListeners() {
  // Get all buttons in the basket
  const decreaseBtns = basketItems.querySelectorAll('.decrease-btn');
  const increaseBtns = basketItems.querySelectorAll('.increase-btn');
  const removeBtns = basketItems.querySelectorAll('.remove-item');

  // Add event listeners to decrease buttons
  decreaseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.getAttribute('data-id'));
      const item = basket.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
      } else {
        removeFromBasket(productId);
      }
    });
  });

  // Add event listeners to increase buttons
  increaseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.getAttribute('data-id'));
      const item = basket.find((item) => item.id === productId);
      if (item) {
        updateQuantity(productId, item.quantity + 1);
      }
    });
  });

  // Add event listeners to remove buttons
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.getAttribute('data-id'));
      removeFromBasket(productId);
    });
  });
}

// Show Basket Sidebar
// Show Basket Sidebar
function showBasketSidebar() {
  basketSidebar.classList.add('show');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  // Hide floating basket when sidebar is open
  if (floatingBasketBtn) floatingBasketBtn.classList.add('hidden');

  // Focus trap for accessibility
  setTimeout(() => {
    closeBasket.focus();
  }, 100);
}

// Hide Basket Sidebar
function hideBasketSidebar() {
  basketSidebar.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = '';

  // Show floating basket when sidebar is closed
  if (floatingBasketBtn) floatingBasketBtn.classList.remove('hidden');
}

// Show Checkout Modal
function showCheckoutModal() {
  checkoutModal.classList.add('show');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  // Focus trap for accessibility
  setTimeout(() => {
    closeModal.focus();
  }, 100);
}

// Hide Checkout Modal
function hideCheckoutModal() {
  checkoutModal.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

// Show Thank You Modal
function showThankYouModal() {
  thankYouModal.classList.add('show');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  // Focus trap for accessibility
  setTimeout(() => {
    closeThankYou.focus();
  }, 100);
}

// Hide Thank You Modal
function hideThankYouModal() {
  thankYouModal.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}
// Submit Order to Webhook
async function submitOrder(formData) {
  const formspreeUrl = 'https://formspree.io/f/mdkgvekr';

  const orderData = {
    customer: {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      notes: formData.get('notes') || '',
    },
    order: basket.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      total: item.price * item.quantity,
    })),
    totalAmount: basket.reduce((total, item) => total + item.price * item.quantity, 0),
  };

  // Create object with all possible products (set to 0 by default)
  const productQuantities = {
    'גבינה-באסקית': 0,
    'גבינה-ניו-יורק': 0,
    'גבינה-פירורים': 0,
    'פרסבורגר-גבינה': 0,
    'גבינה-פקאן': 0,
    'גבינה-סבלה-קקאו': 0,
    'בלינצס-גבינה-פירורים': 0,
    'פחזניות-קראמבל-וניל': 0,
    'קיש-בטטה': 0,
    'קיש-ים-תיכוני': 0,
    'קיש-בצל-פרמזן': 0,
    'קיש-עגבניות-שרי-צלויות': 0,
    'מאפה-עלים-גבינות-ותרד': 0,
    'מארז-מאפי-קרואסון-בשלושה-טעמים': 0,
    'מארז-בלינצס-גבינות': 0,
  };

  // Create mapping from original titles to form field names (handle Hebrew properly)
  const titleMapping = {
    'גבינה באסקית': 'גבינה-באסקית',
    'גבינה ניו-יורק': 'גבינה-ניו-יורק',
    'גבינה פירורים': 'גבינה-פירורים',
    'פרסבורגר גבינה': 'פרסבורגר-גבינה',
    'גבינה פקאן': 'גבינה-פקאן',
    'גבינה סבלה קקאו': 'גבינה-סבלה-קקאו',
    "בלינצ'ס גבינה פירורים": 'בלינצס-גבינה-פירורים',
    'פחזניות קראמבל וניל': 'פחזניות-קראמבל-וניל',
    'קיש בטטה': 'קיש-בטטה',
    'קיש ים תיכוני': 'קיש-ים-תיכוני',
    'קיש בצל פרמזן': 'קיש-בצל-פרמזן',
    'קיש עגבניות שרי צלויות ': 'קיש-עגבניות-שרי-צלויות',
    'מאפה עלים גבינות ותרד': 'מאפה-עלים-גבינות-ותרד',
    'מארז מאפי קרואסון בשלושה טעמים': 'מארז-מאפי-קרואסון-בשלושה-טעמים',
    "מארז בלינצ'ס גבינות": 'מארז-בלינצס-גבינות',
  };

  // Fill in actual quantities from basket
  orderData.order.forEach((item) => {
    const mappedTitle = titleMapping[item.title];
    if (mappedTitle && productQuantities.hasOwnProperty(mappedTitle)) {
      productQuantities[mappedTitle] = item.quantity;
    }
  });

  // Prepare data for Formspree
  const submissionData = {
    'שם-מלא': `${orderData.customer.firstName} ${orderData.customer.lastName}`,
    'טלפון-נייד': orderData.customer.phone,
    'הערות-הזמנה': orderData.customer.notes || 'ללא הערות',
    'סה-כ-סכום': `₪${orderData.totalAmount}`,
    'תאריך-הזמנה': new Date().toLocaleDateString('he-IL'),
    _subject: `הזמנה חדשה שבועות - ${orderData.customer.firstName} ${orderData.customer.lastName}`,
    ...productQuantities, // Spread all product quantities
  };

  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    clearBasket();
    hideCheckoutModal();
    showThankYouModal();
  } catch (error) {
    console.error('Error submitting order:', error);
    alert('המערכת נתקלה בשגיאה, צרו איתנו קשר טלפוני 04-842-2355');
  }
}

// Clear basket
function clearBasket() {
  basket = [];
  localStorage.setItem('shavuotBasket', JSON.stringify(basket));
  updateBasket();
}

// Form validation
function validateForm(formData) {
  const firstName = formData.get('firstName').trim();
  const lastName = formData.get('lastName').trim();
  const phone = formData.get('phone').trim();

  clearValidationErrors(); // Clear existing errors

  let isValid = true;

  if (!firstName) {
    addValidationError('firstName', 'נא למלא שם פרטי');
    isValid = false;
  }

  if (!lastName) {
    addValidationError('lastName', 'נא למלא שם משפחה');
    isValid = false;
  }

  if (!phone) {
    addValidationError('phone', 'נא למלא מספר טלפון');
    isValid = false;
  } else if (!isValidPhone(phone)) {
    addValidationError('phone', 'מספר הטלפון אינו תקין');
    isValid = false;
  }

  return { valid: isValid };
}
function addValidationError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'validation-error';
  errorDiv.textContent = message;

  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');

  // Insert error after the field
  if (field.nextElementSibling && field.nextElementSibling.className === 'validation-error') {
    field.nextElementSibling.textContent = message;
  } else {
    field.parentNode.insertBefore(errorDiv, field.nextElementSibling);
  }

  // Add field focus listener to clear error on input
  field.addEventListener(
    'input',
    function onInput() {
      clearFieldError(fieldId);
      field.removeEventListener('input', onInput);
    },
    { once: true }
  );
}

// Clear validation errors
function clearValidationErrors() {
  const errorFields = document.querySelectorAll('.error');
  const errorMessages = document.querySelectorAll('.validation-error');

  errorFields.forEach((field) => {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
  });

  errorMessages.forEach((msg) => msg.remove());
}

// Clear single field error
function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  field.classList.remove('error');
  field.setAttribute('aria-invalid', 'false');

  const errorMsg = field.nextElementSibling;
  if (errorMsg && errorMsg.className === 'validation-error') {
    errorMsg.remove();
  }
}
// Phone validation
function isValidPhone(phone) {
  // Allow for various formats of Israeli phone numbers
  const phoneClean = phone.replace(/[- ()]/g, '');
  const phoneRegex = /^0(5\d|[23489])\d{7}$/;
  return phoneRegex.test(phoneClean);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Render products
  renderProducts();

  // Initialize basket
  updateBasket();
  setTimeout(initSlideshow, 100);

  if (floatingBasketBtn) {
    floatingBasketBtn.addEventListener('click', showBasketSidebar);
    floatingBasketBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showBasketSidebar();
      }
    });
  }
  // Basket toggle
  basketToggle.addEventListener('click', showBasketSidebar);
  basketToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showBasketSidebar();
    }
  });

  // Close basket
  closeBasket.addEventListener('click', hideBasketSidebar);
  closeBasket.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hideBasketSidebar();
    }
  });

  // Checkout button
  checkoutButton.addEventListener('click', () => {
    if (basket.length === 0) return; // Extra check
    hideBasketSidebar();
    showCheckoutModal();
  });

  // Back to shopping button
  backToShoppingBtn.addEventListener('click', hideCheckoutModal);

  // Close checkout modal
  closeModal.addEventListener('click', hideCheckoutModal);
  closeModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hideCheckoutModal();
    }
  });

  // Close thank you modal
  closeThankYou.addEventListener('click', () => {
    hideThankYouModal();
    // Reset form after closing thank you modal
    checkoutForm.reset();
  });

  // Overlay click to close modals and sidebar
  overlay.addEventListener('click', () => {
    hideBasketSidebar();
    hideCheckoutModal();
    hideThankYouModal();
  });

  // Form submit
  // Form submit with improved validation handling
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(checkoutForm);

    // Validate form with improved validation
    const validation = validateForm(formData);

    if (!validation.valid) {
      // Find the first error field and scroll to it
      const firstErrorField = document.querySelector('.error');
      if (firstErrorField) {
        // Smooth scroll to error with offset
        const headerHeight = document.querySelector('header').offsetHeight;
        const offset = headerHeight + 20;

        setTimeout(() => {
          const fieldTop = firstErrorField.getBoundingClientRect().top;
          const scrollPosition = fieldTop + window.pageYOffset - offset;
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });

          // Focus on the error field
          firstErrorField.focus();
        }, 100);
      }
      return;
    }

    // Submit order
    submitOrder(formData);
  });

  // Keyboard navigation for accessibility
  document.addEventListener('keydown', (e) => {
    // Close with Escape key
    if (e.key === 'Escape') {
      if (thankYouModal.classList.contains('show')) {
        hideThankYouModal();
      } else if (checkoutModal.classList.contains('show')) {
        hideCheckoutModal();
      } else if (basketSidebar.classList.contains('show')) {
        hideBasketSidebar();
      }
    }

    // Tab key trap for modals
    if (e.key === 'Tab') {
      if (basketSidebar.classList.contains('show')) {
        trapFocusInElement(basketSidebar, e);
      } else if (checkoutModal.classList.contains('show')) {
        trapFocusInElement(checkoutModal.querySelector('.modal-content'), e);
      } else if (thankYouModal.classList.contains('show')) {
        trapFocusInElement(thankYouModal.querySelector('.modal-content'), e);
      }
    }
  });

  // Focus trap helper
  function trapFocusInElement(element, event) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // If shift+tab pressed on first element, jump to last element
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
    // If tab pressed on last element, jump to first element
    else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  // Add touch swipe support to close sidebar (for mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  basketSidebar.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  basketSidebar.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchEndX - touchStartX > 100) {
      // Right swipe (in RTL this closes the sidebar)
      hideBasketSidebar();
    }
  }

  // Add visibility change detection (for PWA support)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Refresh basket when tab becomes visible again
      updateBasket();
    }
  });

  // Handle offline/online status
  window.addEventListener('online', () => {
    console.log('App is online');
    // You can add visual indicators or enable ordering features
    checkoutButton.disabled = basket.length === 0;
  });

  window.addEventListener('offline', () => {
    console.log('App is offline');
    // Disable checkout when offline
    checkoutButton.disabled = true;
    checkoutButton.classList.add('disabled');
    // You could add a message about being offline
  });
});
function fixDescriptionText(text) {
  return (
    text
      // Add non-breaking space between number and "יחידות"
      .replace(/(\d+)\s?יחידות/g, '$1&nbsp;יחידות')
      // Add non-breaking space between "קוטר" and number
      .replace(/קוטר\s?(\d+)/g, 'קוטר&nbsp;$1')
      // Add space around pipes if missing
      .replace(/\s?\|\s?/g, ' | ')
  );
}
// Add this function to your script.js file
function adjustModalForMobile() {
  const checkoutModal = document.getElementById('checkout-modal');
  const thankYouModal = document.getElementById('thank-you-modal');

  function adjustModal(modal) {
    if (window.innerWidth <= 576) {
      // Mobile view - position from bottom
      modal.style.alignItems = 'flex-end';

      // Adjust height based on content
      const modalContent = modal.querySelector('.modal-content');
      modalContent.style.maxHeight = '85vh';

      // Add bottom safe area
      const formActions = modal.querySelector('.form-actions');
      if (formActions) {
        formActions.style.paddingBottom = `calc(16px + ${
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--safe-area-inset-bottom') || '0px'
        })`;
      }
    } else {
      // Desktop view - center modal
      modal.style.alignItems = 'center';
    }
  }

  if (checkoutModal) adjustModal(checkoutModal);
  if (thankYouModal) adjustModal(thankYouModal);
}

// Call this on page load and window resize
window.addEventListener('resize', adjustModalForMobile);
// === Slideshow Logic ===
let slideIndex = 0;
let slideshowInterval;

function initSlideshow() {
  const slides = document.getElementsByClassName('mySlides');

  if (slides.length === 0) return;

  // Show first slide immediately
  slides[0].classList.add('show');

  // Start automatic slideshow
  slideshowInterval = setInterval(nextSlide, 4000);
}

function nextSlide() {
  const slides = document.getElementsByClassName('mySlides');

  if (slides.length === 0) return;

  // Remove show class from current slide
  slides[slideIndex].classList.remove('show');

  // Move to next slide
  slideIndex = (slideIndex + 1) % slides.length;

  // Show next slide
  slides[slideIndex].classList.add('show');
}
