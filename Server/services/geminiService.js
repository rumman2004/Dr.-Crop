import {
  createPartFromBase64,
  createPartFromText,
  GoogleGenAI,
} from "@google/genai";

import { normalizeAnalysis, extractJson } from "../utils/analysisFormatter.js";
import { buildCropAnalysisPrompt } from "../utils/buildPrompt.js";

let geminiClient;

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    const error = new Error("GEMINI_API_KEY is missing.");
    error.statusCode = 500;
    throw error;
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }

  return geminiClient;
};

export const analyzeImageWithGemini = async ({ buffer, mimeType }) => {
  const base64Image = buffer.toString("base64");

  const response = await getGeminiClient().models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: [
      createPartFromText(buildCropAnalysisPrompt()),
      createPartFromBase64(base64Image, mimeType),
    ],
    config: {
      responseMimeType: "application/json",
      temperature: 0.15,
    },
  });

  return normalizeAnalysis(extractJson(response.text));
};
