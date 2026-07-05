import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tag: { type: String, required: true },
    summary: { type: String, required: true },
    body: { type: String, required: true },
    readTime: { type: String, default: "5 min read" },
    source: { type: String, default: "AI Generated" },
    generatedDate: {
      type: String,
      required: true,
      unique: true, // One entry per date
    },
  },
  { timestamps: true },
);

/* Index for fast lookups and uniqueness */
journalSchema.index({ generatedDate: -1 });

const Journal = mongoose.model("Journal", journalSchema);
export default Journal;
