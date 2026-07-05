import express, { Router } from "express";

import {
  createCheckoutSession,
  handleWebhook,
  verifySession,
} from "../controller/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Create checkout session (requires auth)
router.post("/create-checkout-session", protect, express.json(), createCheckoutSession);

// Verify a session on the success redirect and grant credits (requires auth)
router.post("/verify-session", protect, express.json(), verifySession);

// Webhook for stripe
router.post("/webhook", express.raw({ type: 'application/json' }), handleWebhook);

export default router;
