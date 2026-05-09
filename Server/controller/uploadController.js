import mongoose from "mongoose";

import ScanHistory from "../models/ScanHistory.js";
import { uploadImageBuffer } from "../services/cloudinaryService.js";
import { analyzeImageWithGemini } from "../services/geminiService.js";
import {
  analyzeImageWithOpenAI,
  refineAnalysisWithOpenAI,
} from "../services/openaiService.js";

const createScanPayload = ({
  analysis,
  uploadResult,
  aiProviders,
  warnings,
}) => ({
  imageUrl: uploadResult?.secure_url,
  imagePublicId: uploadResult?.public_id,
  cropName: analysis.cropName,
  diseaseName: analysis.diseaseName,
  confidence: analysis.confidence,
  riskLevel: analysis.riskLevel,
  isHealthy: analysis.isHealthy,
  summary: analysis.summary,
  symptoms: analysis.symptoms,
  causes: analysis.causes,
  treatment: analysis.treatment,
  prevention: analysis.prevention,
  nextSteps: analysis.nextSteps,
  disclaimer: analysis.disclaimer,
  aiProviders,
  warnings,
  rawAnalysis: analysis,
});

export const analyzeCrop = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Please upload a crop image.");
      error.statusCode = 400;
      throw error;
    }

    const warnings = [];
    let uploadResult = null;

    try {
      uploadResult = await uploadImageBuffer(req.file);
    } catch (error) {
      console.warn("Cloudinary upload skipped:", error.message);
      warnings.push("Image storage was unavailable, but analysis continued.");
    }

    let analysis;
    const aiProviders = {
      primary: "gemini",
      refinement: null,
    };

    try {
      analysis = await analyzeImageWithGemini({
        buffer: req.file.buffer,
        mimeType: req.file.mimetype,
      });
    } catch (error) {
      console.warn("Gemini analysis failed:", error.message);
      warnings.push("Gemini analysis was unavailable; OpenAI was used instead.");
      aiProviders.primary = "openai";

      analysis = await analyzeImageWithOpenAI({
        buffer: req.file.buffer,
        mimeType: req.file.mimetype,
      });
    }

    if (process.env.OPENAI_API_KEY && aiProviders.primary !== "openai") {
      try {
        analysis = await refineAnalysisWithOpenAI(analysis);
        aiProviders.refinement = "openai";
      } catch (error) {
        console.warn("OpenAI refinement skipped:", error.message);
        warnings.push("OpenAI explanation refinement was unavailable.");
      }
    }

    const scan = await ScanHistory.create(
      createScanPayload({ analysis, uploadResult, aiProviders, warnings }),
    );

    res.status(201).json({
      success: true,
      scan,
      analysis,
      warnings,
    });
  } catch (error) {
    next(error);
  }
};

export const getScanHistory = async (req, res, next) => {
  try {
    const requestedLimit = Number(req.query.limit) || 20;
    const limit = Math.min(Math.max(requestedLimit, 1), 50);

    const scans = await ScanHistory.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json({
      success: true,
      count: scans.length,
      scans,
    });
  } catch (error) {
    next(error);
  }
};

export const getScanById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error("Invalid scan id.");
      error.statusCode = 400;
      throw error;
    }

    const scan = await ScanHistory.findById(req.params.id).lean();

    if (!scan) {
      const error = new Error("Scan not found.");
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      scan,
    });
  } catch (error) {
    next(error);
  }
};
