import OpenAI from "openai";

import {
  extractJson,
  mergeAnalysis,
  normalizeAnalysis,
} from "../utils/analysisFormatter.js";
import {
  buildCropAnalysisPrompt,
  buildOpenAIRefinementPrompt,
} from "../utils/buildPrompt.js";

let openaiClient;

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    const error = new Error("OPENAI_API_KEY is missing.");
    error.statusCode = 500;
    throw error;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }

  return openaiClient;
};

export const analyzeImageWithOpenAI = async ({ buffer, mimeType }) => {
  const base64Image = buffer.toString("base64");

  const completion = await getOpenAIClient().chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    temperature: 0.15,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an agricultural crop disease assistant. Return safe, valid JSON only.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: buildCropAnalysisPrompt() },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });

  const rawText = completion.choices?.[0]?.message?.content;
  return normalizeAnalysis(extractJson(rawText));
};

export const refineAnalysisWithOpenAI = async (analysis) => {
  const completion = await getOpenAIClient().chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
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
