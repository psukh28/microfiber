/**
 * Check if a value is null, undefined, or empty string
 * @param {any} value - Value to check
 * @returns {boolean} True if value is null/undefined/empty
 */
export function isEmpty(value) {
  return value === null || value === undefined || value === '';
}

/**
 * Get a safe display value, returning fallback for null/empty values
 * @param {any} value - Value to display
 * @param {string} fallback - Fallback text for empty values
 * @returns {string} Safe display value
 */
export function safeDisplay(value, fallback = 'Not specified') {
  if (isEmpty(value)) {
    return fallback;
  }
  return String(value);
}

/**
 * Safely join array values with separator, handling null/empty arrays
 * @param {Array} array - Array to join
 * @param {string} separator - Separator string
 * @param {string} fallback - Fallback for empty arrays
 * @returns {string} Joined string or fallback
 */
export function safeJoin(array, separator = ', ', fallback = 'Not specified') {
  if (!Array.isArray(array) || array.length === 0) {
    return fallback;
  }
  return array.filter(item => !isEmpty(item)).join(separator) || fallback;
}

/**
 * Validate product data and return cleaned object
 * @param {Object} product - Product object to validate
 * @returns {Object} Validated product object
 */
export function validateProduct(product) {
  if (!product || typeof product !== 'object') {
    throw new Error('Invalid product data');
  }

  return {
    sku: safeDisplay(product.sku, null),
    name: safeDisplay(product.name, 'Unnamed Product'),
    summary: safeDisplay(product.summary, ''),
    size: safeDisplay(product.size, null),
    fabric: safeDisplay(product.fabric, null),
    gsm: typeof product.gsm === 'number' ? product.gsm : null,
    colors: Array.isArray(product.colors) ? product.colors.filter(c => !isEmpty(c)) : [],
    packing: safeDisplay(product.packing, null),
    carton_dimensions: safeDisplay(product.carton_dimensions, null),
    cbm: typeof product.cbm === 'number' ? product.cbm : null,
    unit_price_thb_no_vat: typeof product.unit_price_thb_no_vat === 'number' ? product.unit_price_thb_no_vat : null,
    hs_code: safeDisplay(product.hs_code, null)
  };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export function isValidEmail(email) {
  if (isEmpty(email)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate required form fields
 * @param {Object} formData - Form data object
 * @returns {Object} Validation result with isValid and errors
 */
export function validateRFQForm(formData) {
  const errors = {};
  
  if (isEmpty(formData.company)) {
    errors.company = 'Company name is required';
  }
  
  if (isEmpty(formData.name)) {
    errors.name = 'Contact name is required';
  }
  
  if (isEmpty(formData.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}