import { loadStripe, Stripe } from "@stripe/stripe-js";
import { getAuth } from "firebase/auth";
import { UserRoles } from "../common/enums";
import { updateUserRole } from "./user.services";

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

// Get Stripe instance
const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export interface CheckoutOptions {
  priceId: string;
  successUrl?: string;
  cancelUrl?: string;
}

export const handleCheckout = async ({
  priceId,
  successUrl = `${window.location.origin}/sucess`,
  cancelUrl = `${window.location.origin}/cancel`,
}: CheckoutOptions): Promise<void> => {
  const stripe = await getStripe();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!stripe) {
    console.error("Stripe failed to load");
    return;
  }

  if (!user) {
    console.error("User not logged in");
    return;
  }

  const userEmail = user.email;
  if (!userEmail) {
    console.error("User email is not available");
    return;
  }

  try {
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      successUrl: `${successUrl}?price_id=${priceId}`,
      cancelUrl,
      clientReferenceId: user.uid,
      customerEmail: userEmail,
    });
    if (error) {
      console.error("Stripe Checkout Error:", error);
      throw error;
    }
  } catch (error) {
    console.error("Failed to initiate checkout:", error);
    throw error;
  }
};

export const handleSubscriptionSuccess = async (
  userHandle: string,
  priceId: string
) => {
  let newRole: UserRoles;

  switch (priceId) {
    case "price_1PxsI1SCxQSEp1cmt9xU5NiF": // Premium
      newRole = UserRoles.Premium;
      break;
    case "price_1PxrP7SCxQSEp1cmFWrd0hje": // Ultra Premium
      newRole = UserRoles.UltraPremium;
      break;
    default:
      console.error("Unknown price ID:", priceId);
      return;
  }

  try {
    // Update the user role
    await updateUserRole(userHandle, newRole);
    console.log("User role updated successfully");
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};
