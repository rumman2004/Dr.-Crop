import { createPartFromText, GoogleGenAI } from "@google/genai";

import Journal from "../models/Journal.js";

/* ── Gemini client singleton ── */
let geminiClient;
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw Object.assign(new Error("GEMINI_API_KEY is missing."), { statusCode: 500 });
  if (!geminiClient) geminiClient = new GoogleGenAI({ apiKey });
  return geminiClient;
};

/* ── Topic pool to keep entries diverse ── */
const TOPICS = [
  "A specific crop disease and its global economic impact",
  "How climate change is shifting the geography of crop pathogens",
  "The science behind biological pest control alternatives",
  "Soil health and its relationship to plant disease resistance",
  "Advances in AI and computer vision for crop disease detection",
  "The history and evolution of a major plant disease epidemic",
  "Water management practices that reduce fungal disease risk",
  "Seed treatment technologies and disease prevention",
  "Crop rotation strategies for breaking disease cycles",
  "The role of mycorrhizal fungi in plant immune defence",
  "Post-harvest disease losses in developing countries",
  "Precision agriculture and early-warning disease systems",
  "Pesticide resistance in crop pathogens and management strategies",
  "The impact of monoculture on disease vulnerability",
  "Indigenous farming knowledge and natural disease management",
  "How plant genetics and breeding combat crop diseases",
  "Pollinator health and its connection to crop disease ecology",
  "Urban farming challenges — diseases unique to controlled environments",
  "The economics of crop insurance and disease risk management",
  "Emerging viral diseases threatening staple food crops",
];

/* ── Today's date string (YYYY-MM-DD) ── */
const todayDate = () => new Date().toISOString().split("T")[0];

/* ── Pick a topic deterministically based on date ── */
const pickTopic = (dateStr) => {
  const seed = dateStr.split("-").join("");
  const index = parseInt(seed, 10) % TOPICS.length;
  return TOPICS[index];
};

/* ── Generate a single journal entry via Gemini ── */
const generateEntry = async (dateStr) => {
  const topic = pickTopic(dateStr);

  const prompt = `You are an agricultural science writer for Dr. Crop, an AI crop disease diagnosis app. 
Write a single journal article about: "${topic}"

Requirements:
- Write for an audience of farmers, agronomists, and agricultural students
- Include real statistics, pathogen names, and research references where appropriate
- Be informative, factual, and engaging — not promotional
- The article should feel like a mini research brief (400–600 words for the body)

Return ONLY valid JSON in this exact format:
{
  "title": "Article title (compelling, specific)",
  "tag": "One of: Research, Climate, Disease Biology, Food Security, Innovation, Sustainable Farming, Pest Management, Global Impact, Tropical Agriculture",
  "summary": "A 1-2 sentence summary of the article",
  "body": "The full article body text (400-600 words, plain text, no markdown)",
  "readTime": "N min read"
}`;

  const response = await getGeminiClient().models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: [createPartFromText(prompt)],
    config: {
      responseMimeType: "application/json",
      temperature: 0.7,
    },
  });

  /* Parse the response */
  let raw = response.text?.trim();
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  const parsed = JSON.parse(raw);

  return {
    title: parsed.title,
    tag: parsed.tag,
    summary: parsed.summary,
    body: parsed.body,
    readTime: parsed.readTime || "5 min read",
    source: "AI Generated",
    generatedDate: dateStr,
  };
};

/* ═══════════════════════════════════════
   CONTROLLER HANDLERS
   ═══════════════════════════════════════ */

/**
 * GET /api/journals
 * Returns all journal entries (newest first).
 * If today's entry doesn't exist yet, generates it on-the-fly.
 */
export const getJournals = async (req, res, next) => {
  try {
    const today = todayDate();

    /* Check if today's entry exists */
    const todayExists = await Journal.findOne({ generatedDate: today });

    if (!todayExists) {
      try {
        const entry = await generateEntry(today);
        await Journal.create(entry);
        console.log(`[Journal] Generated entry for ${today}: "${entry.title}"`);
      } catch (genErr) {
        /* Log but don't fail the request — still return existing entries */
        console.error(`[Journal] Generation failed for ${today}:`, genErr.message);
      }
    }

    /* Fetch all entries, newest first */
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [entries, total] = await Promise.all([
      Journal.find().sort({ generatedDate: -1 }).skip(skip).limit(limit).lean(),
      Journal.countDocuments(),
    ]);

    res.json({
      success: true,
      entries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/journals/generate
 * Force-generate today's entry (admin/debug endpoint).
 */
export const forceGenerate = async (req, res, next) => {
  try {
    const today = todayDate();
    const existing = await Journal.findOne({ generatedDate: today });

    if (existing) {
      return res.json({ success: true, message: "Already exists", entry: existing });
    }

    const entry = await generateEntry(today);
    const saved = await Journal.create(entry);

    res.json({ success: true, entry: saved });
  } catch (err) {
    next(err);
  }
};
