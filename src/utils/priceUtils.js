export const GST_RATE = 0.18; // 18%
export const SHIPPING_THRESHOLD = 1000; 
export const SHIPPING_FEE = 50;

/**
 * calculateTotals
 * @param {Array} items - array of cart items { _id, name, price, qty }
 * @param {Object|null} coupon - { code, type: 'percent'|'flat', value }
 * @returns totals object
 */

export function calculateTotals(items = [], coupon = null) {
  // 1. Items Total
  const itemsTotal = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  // 2. Discount (if coupon applied)
  let discount = 0;
  if (coupon) {
    if (coupon.type === "percent") {
      discount = (itemsTotal * coupon.value) / 100;
    } else if (coupon.type === "flat") {
      discount = coupon.value;
    }

    // discount cannot exceed items total
    discount = Math.min(discount, itemsTotal);
  }

  // 3. Amount after discount
  const taxableAmount = itemsTotal - discount;

  // 4. GST Calculation
  const gst = taxableAmount * GST_RATE;

  // 5. Shipping (free if itemsTotal >= threshold)
  const shipping =
    itemsTotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  // 6. Final Total
  const total = taxableAmount + gst + shipping;

  return {
    itemsTotal,
    discount,
    taxableAmount,
    gst,
    shipping,
    total,
  };
}
