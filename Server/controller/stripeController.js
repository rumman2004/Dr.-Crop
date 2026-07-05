import Stripe from "stripe";
import User from "../models/User.js";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const CREDIT_PACKAGES = {
  starter: {
    name: "Starter Top-Up",
    description: "50 Scans",
    credits: 50,
    priceCents: 4900, // ₹49.00 (Minimum allowed by Stripe)
  },
  basic: {
    name: "Basic Top-Up",
    description: "120 Scans",
    credits: 120,
    priceCents: 9900, // ₹99.00
  },
  pro: {
    name: "Pro Top-Up",
    description: "250 Scans",
    credits: 250,
    priceCents: 19900, // ₹199.00
  },
  max: {
    name: "Max Top-Up",
    description: "800 Scans",
    credits: 800,
    priceCents: 49900, // ₹499.00
  },
};

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { packageId } = req.body;
    const selectedPackage = CREDIT_PACKAGES[packageId];

    if (!selectedPackage) {
      const error = new Error("Invalid package selected.");
      error.statusCode = 400;
      throw error;
    }

    if (!stripe) {
      const error = new Error("Stripe API keys are missing on the server.");
      error.statusCode = 500;
      throw error;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      client_reference_id: req.user._id.toString(),
      metadata: {
        userId: req.user._id.toString(),
        packageId,
        creditsToAdd: String(selectedPackage.credits),
      },
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: selectedPackage.name,
              description: selectedPackage.description,
            },
            unit_amount: selectedPackage.priceCents,
          },
          quantity: 1,
        },
      ],
      // Redirect URLs. The session id is appended so the success page can
      // verify the payment and grant credits without depending on the webhook.
      success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/payment-cancel`,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    next(error);
  }
};

/**
 * Grant the credits for a paid checkout session. Safe to call more than once
 * for the same session (from the webhook AND the success-redirect verify) —
 * the session id is recorded on the user so credits are only ever added once.
 * Returns the up-to-date user, or null if the session is unpaid/unknown.
 */
const grantCreditsForSession = async (session) => {
  if (!session || session.payment_status !== "paid") {
    return null;
  }

  const userId = session.metadata?.userId;
  const creditsToAdd = parseInt(session.metadata?.creditsToAdd, 10);

  if (!userId || !Number.isFinite(creditsToAdd) || creditsToAdd <= 0) {
    return null;
  }

  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  // Idempotency guard: skip if this session already granted credits.
  if (user.processedPaymentSessions.includes(session.id)) {
    return user;
  }

  user.credits += creditsToAdd;
  user.processedPaymentSessions.push(session.id);
  if (session.customer && !user.stripeCustomerId) {
    user.stripeCustomerId = session.customer;
  }
  await user.save();

  console.log(`✅ Added ${creditsToAdd} credits to user ${userId} (session ${session.id})`);
  return user;
};

export const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!stripe) {
      throw new Error("Stripe API keys are missing on the server.");
    }
    if (!endpointSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured.");
    }
    // req.body must be raw buffer for stripe webhook verification
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    try {
      await grantCreditsForSession(event.data.object);
    } catch (dbError) {
      console.error("Error updating user credits after webhook:", dbError);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

/**
 * Verify a checkout session on the success redirect and grant credits.
 * Works in every environment without a webhook. The session must belong to
 * the authenticated user, preventing anyone from crediting another account.
 */
export const verifySession = async (req, res, next) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      const error = new Error("A checkout session id is required.");
      error.statusCode = 400;
      throw error;
    }

    if (!stripe) {
      const error = new Error("Stripe API keys are missing on the server.");
      error.statusCode = 500;
      throw error;
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.metadata?.userId !== req.user._id.toString()) {
      const error = new Error("This checkout session does not belong to you.");
      error.statusCode = 403;
      throw error;
    }

    if (session.payment_status !== "paid") {
      const error = new Error("Payment for this session is not complete yet.");
      error.statusCode = 402;
      throw error;
    }

    const user = await grantCreditsForSession(session);

    res.json({
      success: true,
      credits: user ? user.credits : req.user.credits,
    });
  } catch (error) {
    next(error);
  }
};
