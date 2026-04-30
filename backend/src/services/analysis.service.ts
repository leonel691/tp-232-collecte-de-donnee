import * as ss from "simple-statistics";
import { kmeans } from "ml-kmeans";
import { SurveyResponse } from "../models/SurveyResponse.js";

function linearRegressionSimple(x: number[], y: number[]) {
  const lr = ss.linearRegression(x.map((xi, i) => [xi, y[i]]));
  const line = ss.linearRegressionLine(lr);
  const r2 = ss.rSquared(x.map((xi, i) => [xi, y[i]]), line);
  return { ...lr, r2: Number(r2.toFixed(4)) };
}

export function runAdvancedAnalyses(rows: SurveyResponse[]) {
  const sleep = rows.map((r) => r.sleepHours);
  const stress = rows.map((r) => r.stressLevel);
  const simple = linearRegressionSimple(sleep, stress);

  const predictors = rows.map((r) => [r.sleepHours, r.socialMediaHours, r.motivationLevel, r.familySupport, r.friendsSupport, r.studyHours]);
  const burnoutTarget: number[] = rows.map((r) => (r.stressLevel >= 8 && r.anxietyLevel >= 7 && r.motivationLevel <= 4 ? 1 : 0));
  const points2D = rows.map((r) => [r.sleepHours, r.stressLevel]);
  const km = points2D.length >= 3 ? kmeans(points2D, 3, {}) : null;

  return {
    simpleRegression: simple,
    multipleRegression: {
      note: "Implémentation de base; remplacer par librairie complète pour coefficients exacts.",
      predictorsCount: predictors[0]?.length ?? 0
    },
    pca: {
      note: "Point de départ: brancher ml-pca pour composantes réelles.",
      samplePoints: points2D.slice(0, 100)
    },
    kmeans: km
      ? { centroids: km.centroids, clusters: km.clusters.slice(0, 300) }
      : { centroids: [], clusters: [] },
    classification: {
      label: "burnoutRisk",
      positiveRate: burnoutTarget.length ? Number((burnoutTarget.reduce((a, b) => a + b, 0) / burnoutTarget.length).toFixed(4)) : 0
    }
  };
}
