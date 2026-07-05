import Groq from "groq-sdk";

import { mergeAnalysis, extractJson } from "../utils/analysisFormatter.js";
import { buildOpenAIRefinementPrompt } from "../utils/buildPrompt.js";

let groqClient;

const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY?.trim();

  if (!apiKey) {
    const error = new Error("GROQ_API_KEY is missing.");
    error.statusCode = 500;
    throw error;
  }

  if (!groqClient) {
    groqClient = new Groq({ apiKey });
  }

  return groqClient;
};

export const refineAnalysisWithGroq = async (analysis) => {
  const completion = await getGroqClient().chat.completions.create({
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You improve agricultural diagnosis text for farmers. Return valid JSON only.",
      },
      {
        role: "user",
        content: buildOpenAIRefinementPrompt(analysis),
      },
    ],
  });

  const rawText = completion.choices?.[0]?.message?.content;
  return mergeAnalysis(analysis, extractJson(rawText));
};
