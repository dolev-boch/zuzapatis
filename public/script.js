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
        <button class="add-to-basket" data-id="${product.id}" aria-label="הוסף ${
        product.title
      } לסל">
          <i class="fas fa-plus" aria-hidden="true"></i> הוסף לסל
        </button>
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
function addProductEventListeners() {
  const addToBasketBtns = document.querySelectorAll('.add-to-basket');

  addToBasketBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.getAttribute('data-id'));
      addToBasket(productId);
    });
  });
}

// Add to Basket
function addToBasket(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const itemInBasket = basket.find((item) => item.id === productId);

  if (itemInBasket) {
    itemInBasket.quantity++;
  } else {
    basket.push({
      ...product,
      quantity: 1,
    });
  }

  // Save to localStorage
  localStorage.setItem('shavuotBasket', JSON.stringify(basket));

  updateBasket();
  showBasketSidebar();

  // Add animation to basket icon
  basketToggle.classList.add('pulse');
  setTimeout(() => {
    basketToggle.classList.remove('pulse');
  }, 700);

  // Announce to screen readers
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
function updateBasket() {
  // Update basket count
  const totalItems = basket.reduce((total, item) => total + item.quantity, 0);
  basketCountEl.textContent = totalItems;

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
function showBasketSidebar() {
  basketSidebar.classList.add('show');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';

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
  const webhookUrl = 'https://hook.eu2.make.com/sq44pfhp3uqrdmj7on6zp4osy0ci4duy';

  // Prepare the data to be sent to the webhook
  const orderData = {
    customer: {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email') || undefined,
      phone: formData.get('phone') || undefined,
      address: formData.get('address') || undefined,
      notes: formData.get('notes') || undefined,
    },
    order: basket.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    })),
    orderDate: new Date().toISOString(),
    totalAmount: basket.reduce((total, item) => total + item.price * item.quantity, 0),
  };

  console.log('Order data ready to send to webhook:', orderData);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Order successfully submitted:', data);

    // Clear basket after successful order
    clearBasket();

    // UI updates after successful submission
    hideCheckoutModal();
    showThankYouModal();
  } catch (error) {
    console.error('Error submitting order:', error);
    alert('אירעה שגיאה בשליחת ההזמנה. אנא נסו שוב מאוחר יותר או צרו קשר טלפונית.');
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
  const email = formData.get('email').trim();
  const phone = formData.get('phone').trim();

  if (!firstName || !lastName) {
    return {
      valid: false,
      message: 'יש למלא את כל שדות החובה',
    };
  }

  // Validate email format if provided
  if (email && !isValidEmail(email)) {
    return {
      valid: false,
      message: 'אנא הזן כתובת אימייל תקינה',
    };
  }

  // Validate phone format if provided
  if (phone && !isValidPhone(phone)) {
    return {
      valid: false,
      message: 'אנא הזן מספר טלפון תקין',
    };
  }

  return {
    valid: true,
  };
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
  // Simple Israeli phone validation
  const phoneRegex = /^0(5\d|[23489])\d{7}$/;
  return phoneRegex.test(phone.replace(/[- ]/g, ''));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Render products
  renderProducts();

  // Initialize basket
  updateBasket();

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
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(checkoutForm);

    // Validate form
    const validation = validateForm(formData);

    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    // Submit order
    submitOrder(formData);

    // Hide checkout modal and show thank you modal
    hideCheckoutModal();
    showThankYouModal();
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
