const DEFAULT_DISCLAIMER =
  "This AI result is advisory. Confirm severe infections and chemical use with a local agricultural expert.";

const toStringValue = (value, fallback = "") => {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  return String(value);
};

const toArray = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => toStringValue(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n|;|\u2022/)
      .map((item) => item.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);
  }

  return [];
};

const toBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value.toLowerCase() === "yes";
  }

  return false;
};

export const extractJson = (value) => {
  if (!value) {
    throw new Error("AI response was empty.");
  }

  if (typeof value === "object") {
    return value;
  }

  const withoutCodeFence = value
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(withoutCodeFence);
  } catch {
    const jsonMatch = withoutCodeFence.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("AI response did not contain valid JSON.");
    }

    return JSON.parse(jsonMatch[0]);
  }
};

export const normalizeAnalysis = (input = {}) => {
  const treatment = input.treatment || input.treatments || {};

  return {
    cropName: toStringValue(input.cropName || input.crop, "Unknown crop"),
    diseaseName: toStringValue(
      input.diseaseName || input.disease || input.condition,
      "Unknown condition",
    ),
    confidence: toStringValue(input.confidence, "Unknown"),
    riskLevel: toStringValue(input.riskLevel || input.severity, "Unknown"),
    isHealthy: toBoolean(input.isHealthy || input.healthy),
    summary: toStringValue(input.summary || input.about),
    symptoms: toArray(input.symptoms),
    causes: toArray(input.causes || input.cause),
    treatment: {
      immediate: toArray(treatment.immediate || input.immediateActions),
      organic: toArray(treatment.organic || input.organicTreatment),
      chemical: toArray(treatment.chemical || input.chemicalTreatment),
      cultural: toArray(treatment.cultural || input.culturalTreatment),
    },
    prevention: toArray(input.prevention || input.preventiveMeasures),
    nextSteps: toArray(input.nextSteps || input.followUp),
    disclaimer: toStringValue(input.disclaimer, DEFAULT_DISCLAIMER),
  };
};

export const mergeAnalysis = (baseAnalysis, refinement) => {
  const base = normalizeAnalysis(baseAnalysis);
  const refined = normalizeAnalysis({ ...base, ...refinement });

  return {
    ...base,
    ...refined,
    treatment: {
      immediate:
        refined.treatment.immediate.length > 0
          ? refined.treatment.immediate
          : base.treatment.immediate,
      organic:
        refined.treatment.organic.length > 0
          ? refined.treatment.organic
          : base.treatment.organic,
      chemical:
        refined.treatment.chemical.length > 0
          ? refined.treatment.chemical
          : base.treatment.chemical,
      cultural:
        refined.treatment.cultural.length > 0
          ? refined.treatment.cultural
          : base.treatment.cultural,
    },
  };
};
