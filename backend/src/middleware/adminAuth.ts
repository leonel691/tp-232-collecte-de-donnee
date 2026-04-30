import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || "";
  const headerToken = authHeader.replace("Bearer ", "");
  const queryToken = typeof req.query.token === "string" ? req.query.token : "";
  const token = headerToken || queryToken;
  if (token && token === env.ADMIN_PASSWORD) return next();
  return res.status(401).json({ success: false, message: "Accès admin non autorisé." });
}
