import { CohereClient } from "cohere-ai";

import { mergeAnalysis, extractJson } from "../utils/analysisFormatter.js";
import { buildOpenAIRefinementPrompt } from "../utils/buildPrompt.js";

let cohereClient;

const getCohereClient = () => {
  const apiKey = process.env.COHERE_API_KEY?.trim();

  if (!apiKey) {
    const error = new Error("COHERE_API_KEY is missing.");
    error.statusCode = 500;
    throw error;
  }

  if (!cohereClient) {
    cohereClient = new CohereClient({ token: apiKey });
  }

  return cohereClient;
};

export const refineAnalysisWithCohere = async (analysis) => {
  const response = await getCohereClient().chat({
    model: process.env.COHERE_MODEL || "command-r-plus-08-2024",
    temperature: 0.2,
    message: buildOpenAIRefinementPrompt(analysis),
    preamble: "You improve agricultural diagnosis text for farmers. Return valid JSON only.",
  });

  const rawText = response.text;
  return mergeAnalysis(analysis, extractJson(rawText));
};
