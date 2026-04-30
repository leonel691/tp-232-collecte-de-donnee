import { Router } from "express";
import { env } from "../config/env.js";

export const adminRouter = Router();

adminRouter.post("/admin/login", (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password) return res.status(400).json({ success: false, message: "Mot de passe requis." });
  if (password === env.ADMIN_PASSWORD) {
    return res.json({ success: true, token: env.ADMIN_PASSWORD });
  }
  return res.status(401).json({ success: false, message: "Mot de passe incorrect." });
});
