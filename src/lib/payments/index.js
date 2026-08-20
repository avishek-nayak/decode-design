/**
 * Provider-agnostic payment surface.
 *
 * The checkout page only ever calls the two functions below. Adding a real
 * gateway later means writing `providers/razorpay.js` (or stripe.js) that
 * exports the same two functions, registering it in `providers` here, and
 * setting VITE_PAYMENT_PROVIDER in the environment. Checkout.jsx does not
 * change.
 *
 * Amounts are always in MINOR units (paise, cents) — which is what every
 * gateway actually expects, so nothing has to be converted at the boundary.
 */

import * as mock from './providers/mock';

const providers = {
  mock,
  // razorpay: () => import('./providers/razorpay'),
  // stripe:   () => import('./providers/stripe'),
};

const providerName = import.meta.env.VITE_PAYMENT_PROVIDER || 'mock';

function activeProvider() {
  const provider = providers[providerName];

  if (!provider) {
    throw new Error(
      `Unknown payment provider "${providerName}". Set VITE_PAYMENT_PROVIDER to one of: ${Object.keys(providers).join(', ')}.`,
    );
  }

  return provider;
}

/** True while no real gateway is wired up — the UI says so rather than lying. */
export const isMockPayments = providerName === 'mock';

export const paymentProviderName = providerName;

/**
 * @param {{ planId: string, amount: number, currency: string, customer: object }} input
 * @returns {Promise<{ checkoutId: string, status: string, redirectUrl: string|null }>}
 */
export function createCheckout(input) {
  return activeProvider().createCheckout(input);
}

/**
 * @param {string} checkoutId
 * @returns {Promise<{ status: string }>}
 */
export function getCheckoutStatus(checkoutId) {
  return activeProvider().getCheckoutStatus(checkoutId);
}
