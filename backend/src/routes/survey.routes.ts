import { Router } from "express";
import { SurveyResponseModel } from "../models/SurveyResponse.js";
import { surveySchema } from "../validation/survey.schema.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { responsesToCsv } from "../services/csv.service.js";

export const surveyRouter = Router();

surveyRouter.post("/survey", async (req, res, next) => {
  try {
    const parsed = surveySchema.parse(req.body);
    const created = await SurveyResponseModel.create(parsed);
    res.status(201).json({ success: true, id: created._id });
  } catch (err) {
    next(err);
  }
});

surveyRouter.get("/survey", adminAuth, async (_req, res, next) => {
  try {
    const rows = await SurveyResponseModel.find().sort({ createdAt: -1 }).lean();
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

surveyRouter.get("/survey/export/csv", adminAuth, async (_req, res, next) => {
  try {
    const rows = await SurveyResponseModel.find().sort({ createdAt: -1 }).lean();
    const csv = responsesToCsv(rows as any[]);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=mindcampus-responses.csv");
    res.send(csv);
  } catch (err) {
    next(err);
  }
});
