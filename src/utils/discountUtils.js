// Discount configuration
const DISCOUNT_CONFIG = {
  isActive: true,
  percentage: 40, // 40% off
  endDate: new Date("2025-11-31T23:59:59"), // Change this date!
};

// Check if discount is still active
export const isDiscountActive = () => {
  const now = new Date().getTime();
  const endTime = DISCOUNT_CONFIG.endDate.getTime();
  return DISCOUNT_CONFIG.isActive && now < endTime;
};

// Get discount percentage
export const getDiscountPercentage = () => {
  return isDiscountActive() ? DISCOUNT_CONFIG.percentage : 0;
};

// Calculate discounted price
export const getDiscountedPrice = (originalPrice) => {
  if (!isDiscountActive()) return originalPrice;

  const discount = DISCOUNT_CONFIG.percentage / 100;
  const discountedPrice = originalPrice - originalPrice * discount;
  return Math.round(discountedPrice);
};

// Get price object with both original and discounted
export const getPriceWithDiscount = (originalPrice) => {
  return {
    original: originalPrice,
    discounted: getDiscountedPrice(originalPrice),
    savings: originalPrice - getDiscountedPrice(originalPrice),
    hasDiscount: isDiscountActive(),
    percentage: getDiscountPercentage(),
  };
};

// Original prices (without discount)
export const ORIGINAL_PRICES = {
  frontend: {
    oneTime: 50000,
    part: { upfront: 30000, later: 20000 },
  },
  backend: {
    oneTime: 70000,
    part: { upfront: 42000, later: 28000 },
  },
  fullstack: {
    oneTime: 100000,
    part: { upfront: 60000, later: 40000 },
  },
};

// Get current prices (with discount if active)
export const getCurrentPrices = () => {
  const prices = {};

  for (const [course, coursePrices] of Object.entries(ORIGINAL_PRICES)) {
    prices[course] = {
      oneTime: getDiscountedPrice(coursePrices.oneTime),
      part: {
        upfront: getDiscountedPrice(coursePrices.part.upfront),
        later: getDiscountedPrice(coursePrices.part.later),
      },
    };
  }

  return prices;
};

export default {
  isDiscountActive,
  getDiscountPercentage,
  getDiscountedPrice,
  getPriceWithDiscount,
  getCurrentPrices,
  ORIGINAL_PRICES,
};
