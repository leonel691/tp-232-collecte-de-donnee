import type { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err?.name === "ZodError") {
    return res.status(400).json({ success: false, errors: err.errors });
  }
  return res.status(500).json({ success: false, message: err?.message ?? "Erreur serveur" });
}
