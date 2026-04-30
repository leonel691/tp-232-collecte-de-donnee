import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { surveyRouter } from "./routes/survey.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { statsRouter } from "./routes/stats.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(cors({ origin: env.FRONTEND_URL ?? "*" }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", adminRouter);
app.use("/api", surveyRouter);
app.use("/api", statsRouter);

app.use(errorHandler);
