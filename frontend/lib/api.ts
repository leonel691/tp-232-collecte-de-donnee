import { API_BASE_URL } from "./constants";
import { SurveyFormValues } from "./types";

export async function submitSurvey(payload: SurveyFormValues) {
  const res = await fetch(`${API_BASE_URL}/survey`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Erreur lors de la soumission");
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API_BASE_URL}/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error("Impossible de charger les statistiques");
  return res.json();
}

export async function adminLogin(password: string) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });
  if (!res.ok) throw new Error("Mot de passe invalide");
  return res.json();
}

export async function getAllResponses(token: string) {
  const res = await fetch(`${API_BASE_URL}/survey`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Accès refusé ou erreur serveur");
  return res.json();
}

export function getExportCsvUrl(token: string) {
  return `${API_BASE_URL}/survey/export/csv?token=${encodeURIComponent(token)}`;
}
