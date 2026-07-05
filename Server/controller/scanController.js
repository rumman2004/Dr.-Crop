import mongoose from "mongoose";

import ScanHistory from "../models/ScanHistory.js";
import { uploadImageBuffer } from "../services/cloudinaryService.js";
import { refineAnalysisWithCohere } from "../services/cohereService.js";
import { analyzeImageWithGemini } from "../services/geminiService.js";
import { refineAnalysisWithGroq } from "../services/groqService.js";
import { mergeEnsembleAnalyses } from "../utils/analysisFormatter.js";
import {
  analyzeImageWithOpenAI,
  refineAnalysisWithOpenAI,
} from "../services/openaiService.js";

const createScanPayload = ({
  userId,
  analysis,
  uploadResult,
  aiProviders,
  warnings,
}) => ({
  userId,
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
    if (!req.user || req.user.credits <= 0) {
      const error = new Error("Insufficient credits. Please wait until tomorrow for your free credits.");
      error.statusCode = 403;
      throw error;
    }

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

    const aiProviders = {
      primary: [],
      refinement: [],
    };

    const analysisPromises = [];
    const providerNames = [];

    if (process.env.GEMINI_API_KEY) {
      analysisPromises.push(
        analyzeImageWithGemini({ buffer: req.file.buffer, mimeType: req.file.mimetype })
      );
      providerNames.push("gemini");
    }

    if (process.env.OPENAI_API_KEY) {
      analysisPromises.push(
        analyzeImageWithOpenAI({ buffer: req.file.buffer, mimeType: req.file.mimetype })
      );
      providerNames.push("openai");
    }

    if (analysisPromises.length === 0) {
      const error = new Error("No AI API keys are configured. Please check your .env file.");
      error.statusCode = 500;
      throw error;
    }

    const results = await Promise.allSettled(analysisPromises);
    const successfulAnalyses = [];

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        successfulAnalyses.push(result.value);
        aiProviders.primary.push(providerNames[index]);
        console.log(`[Dr. Crop] ✅ Image successfully analyzed using: ${providerNames[index]}`);
      } else {
        console.warn(`[Dr. Crop] ⚠️ Analysis failed for ${providerNames[index]}:`, result.reason.message);
      }
    });

    if (successfulAnalyses.length === 0) {
      const error = new Error("All configured AI models failed to process the image. Please try again later.");
      error.statusCode = 503;
      throw error;
    }

    let analysis = mergeEnsembleAnalyses(successfulAnalyses);

    const refinementPromises = [];
    const refinementNames = [];

    if (process.env.OPENAI_API_KEY) {
      refinementPromises.push(refineAnalysisWithOpenAI(analysis));
      refinementNames.push("openai");
    }

    if (process.env.GROQ_API_KEY) {
      refinementPromises.push(refineAnalysisWithGroq(analysis));
      refinementNames.push("groq");
    }

    if (process.env.COHERE_API_KEY) {
      refinementPromises.push(refineAnalysisWithCohere(analysis));
      refinementNames.push("cohere");
    }

    if (refinementPromises.length > 0) {
      const refinementResults = await Promise.allSettled(refinementPromises);
      const successfulRefinements = [];

      refinementResults.forEach((result, index) => {
        if (result.status === "fulfilled") {
          successfulRefinements.push(result.value);
          aiProviders.refinement.push(refinementNames[index]);
          console.log(`[Dr. Crop] ✅ Refinement successfully applied using: ${refinementNames[index]}`);
        } else {
          console.warn(`[Dr. Crop] ⚠️ Refinement failed for ${refinementNames[index]}:`, result.reason.message);
        }
      });

      if (successfulRefinements.length > 0) {
        analysis = mergeEnsembleAnalyses([analysis, ...successfulRefinements]);
      } else {
        warnings.push("Explanation refinement was unavailable.");
      }
    }

    const finalAiProviders = {
      primary: aiProviders.primary.join(", "),
      refinement: aiProviders.refinement.length > 0 ? aiProviders.refinement.join(", ") : null,
    };

    const scan = await ScanHistory.create(
      createScanPayload({
        userId: req.user._id,
        analysis,
        uploadResult,
        aiProviders: finalAiProviders,
        warnings,
      }),
    );

    req.user.credits -= 1;
    await req.user.save();

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

    const scans = await ScanHistory.find({ userId: req.user._id })
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

    const scan = await ScanHistory.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).lean();

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

export const deleteScan = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const error = new Error("Invalid scan id.");
      error.statusCode = 400;
      throw error;
    }

    const scan = await ScanHistory.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!scan) {
      const error = new Error("Scan not found.");
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      message: "Scan deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
