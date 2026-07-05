import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      sparse: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    credits: {
      type: Number,
      default: 5,
    },
    lastCreditReset: {
      type: Date,
      default: Date.now,
    },
    stripeCustomerId: {
      type: String,
      sparse: true,
    },
    // Stripe checkout session ids that have already granted credits.
    // Used to make credit-granting idempotent across the webhook and the
    // success-redirect verification so a payment is never counted twice.
    processedPaymentSessions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

/* ── Hash password before saving ── */
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

/* ── Compare password ── */
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) {
    return false;
  }

  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
