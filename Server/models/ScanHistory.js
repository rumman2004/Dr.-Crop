import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema(
  {
    immediate: [String],
    organic: [String],
    chemical: [String],
    cultural: [String],
  },
  { _id: false },
);

const scanHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    imageUrl: String,
    imagePublicId: String,
    cropName: {
      type: String,
      default: "Unknown crop",
    },
    diseaseName: {
      type: String,
      default: "Unknown condition",
    },
    confidence: {
      type: String,
      default: "Unknown",
    },
    riskLevel: {
      type: String,
      default: "Unknown",
    },
    isHealthy: {
      type: Boolean,
      default: false,
    },
    summary: {
      type: String,
      default: "",
    },
    symptoms: [String],
    causes: [String],
    treatment: treatmentSchema,
    prevention: [String],
    nextSteps: [String],
    disclaimer: String,
    aiProviders: {
      primary: String,
      refinement: String,
    },
    warnings: [String],
    rawAnalysis: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

export default mongoose.model("ScanHistory", scanHistorySchema);
