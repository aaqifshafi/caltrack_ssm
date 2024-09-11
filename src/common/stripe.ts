// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// export async function handleCheckout(priceId: string) {
//   const stripe = await stripePromise;

//   // Create a Checkout Session with the priceId
//   const response = await fetch("/create-checkout-session", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ priceId }),
//   });

//   const sessionId = await response.text();

//   if (stripe) {
//     await stripe.redirectToCheckout({ sessionId });
//   }
// }
