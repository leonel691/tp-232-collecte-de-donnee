import * as ss from "simple-statistics";
import { SurveyResponse } from "../models/SurveyResponse.js";

const metrics = ["stressLevel", "anxietyLevel", "sleepHours", "motivationLevel", "lonelinessLevel", "familySupport", "friendsSupport", "semesterAverage"] as const;

function summary(values: number[]) {
  if (!values.length) return { mean: 0, median: 0, stdDev: 0, min: 0, max: 0 };
  return {
    mean: Number(ss.mean(values).toFixed(3)),
    median: Number(ss.median(values).toFixed(3)),
    stdDev: Number(ss.standardDeviation(values).toFixed(3)),
    min: Math.min(...values),
    max: Math.max(...values)
  };
}

export function computeDescriptiveStats(rows: SurveyResponse[]) {
  const result: Record<string, ReturnType<typeof summary>> = {};
  for (const metric of metrics) {
    const values = rows.map((r) => Number(r[metric] ?? 0));
    result[metric] = summary(values);
  }
  return result;
}
