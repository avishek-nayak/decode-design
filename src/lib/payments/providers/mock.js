/**
 * Mock payment provider.
 *
 * Simulates a gateway round-trip so the checkout flow can be built, reviewed
 * and demoed without committing to Razorpay, Stripe or anyone else. It never
 * touches a network and never handles card data.
 */

const store = new Map();

export async function createCheckout({ planId, amount, currency, customer }) {
  await delay(900);

  const checkoutId = `mock_${Math.random().toString(36).slice(2, 10)}`;

  store.set(checkoutId, {
    checkoutId,
    planId,
    amount,
    currency,
    customer,
    status: 'succeeded',
    createdAt: new Date().toISOString(),
  });

  return { checkoutId, status: 'succeeded', redirectUrl: null };
}

export async function getCheckoutStatus(checkoutId) {
  await delay(200);
  return { status: store.get(checkoutId)?.status ?? 'unknown' };
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
