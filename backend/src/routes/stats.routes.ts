import { Router } from "express";
import { SurveyResponseModel } from "../models/SurveyResponse.js";
import { computeDescriptiveStats } from "../services/stats.service.js";
import { runAdvancedAnalyses } from "../services/analysis.service.js";

export const statsRouter = Router();

statsRouter.get("/stats", async (_req, res, next) => {
  try {
    const rows = await SurveyResponseModel.find().lean();
    res.json({
      totalResponses: rows.length,
      descriptive: computeDescriptiveStats(rows as any),
      advanced: runAdvancedAnalyses(rows as any)
    });
  } catch (err) {
    next(err);
  }
});
