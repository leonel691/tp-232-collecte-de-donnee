"use client";

import { useEffect, useMemo, useState } from "react";
import { adminLogin, getAllResponses, getExportCsvUrl, getStats } from "@/lib/api";
import { ADMIN_STORAGE_KEY } from "@/lib/constants";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import AuroraSurface from "@/components/AuroraSurface";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (!token) return;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [s, r] = await Promise.all([getStats(), getAllResponses(token)]);
        setStats(s);
        setRows(r);
      } catch (e: any) {
        setError(e.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const stressHistogram = useMemo(() => {
    const bins = Array.from({ length: 10 }, (_, i) => ({ level: i + 1, count: 0 }));
    for (const row of rows) {
      const idx = Math.max(1, Math.min(10, Number(row.stressLevel || 1))) - 1;
      bins[idx].count += 1;
    }
    return bins;
  }, [rows]);

  async function login() {
    try {
      const res = await adminLogin(password);
      localStorage.setItem(ADMIN_STORAGE_KEY, res.token);
      setToken(res.token);
    } catch (e: any) {
      setError(e.message || "Connexion échouée");
    }
  }

  function logout() {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setToken(null);
  }

  if (!token) {
    return (
      <AuroraSurface>
        <main className="flex min-h-full flex-1 items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md mc-fade-up">
            <div className="mc-glass mc-ring rounded-[1.25rem] p-6 text-white sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Espace administrateur</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Accès Admin</h1>
              <p className="mt-2 text-sm text-white/75">
                Cet espace est réservé à l’analyse des réponses. Entrez le mot de passe admin pour continuer.
              </p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-white/80">Mot de passe</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className={`w-full rounded-xl border bg-white/10 p-3 text-white outline-none placeholder:text-white/40 transition ${
                  error
                    ? "border-red-300/70 focus:border-red-200 focus:ring-2 focus:ring-red-200/20"
                    : "border-white/15 focus:border-white/30 focus:ring-2 focus:ring-white/15"
                }`}
                placeholder="Entrez le mot de passe admin"
              />
            </label>

            {error && (
              <div className="mt-3 rounded-xl border border-red-300/40 bg-red-500/10 p-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <button
              onClick={login}
              className="mt-5 w-full rounded-xl bg-white/90 px-4 py-3 font-semibold text-slate-900 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
            >
              Connexion
            </button>

            <p className="mt-4 text-center text-xs text-white/60">
              Astuce : accédez au dashboard via l’URL <span className="font-mono text-white/80">/admin</span>.
            </p>
            </div>
          </div>
        </main>
      </AuroraSurface>
    );
  }

  return (
    <AuroraSurface>
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Dashboard MindCampus</h1>
        <div className="flex flex-wrap gap-2">
          <a
            href={getExportCsvUrl(token)}
            className="rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-slate-900 shadow-lg shadow-emerald-400/15 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            target="_blank"
            rel="noreferrer"
          >
            Exporter CSV
          </a>
          <button onClick={logout} className="rounded-xl bg-white/10 px-4 py-2 font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15">
            Déconnexion
          </button>
        </div>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="mc-glass mc-ring rounded-[1.25rem] p-4 text-white">
            <p className="text-xs text-white/65">Total réponses</p>
            <p className="mt-1 text-3xl font-extrabold">{stats.totalResponses}</p>
          </div>
          <div className="mc-glass mc-ring rounded-[1.25rem] p-4 text-white">
            <p className="text-xs text-white/65">Stress moyen</p>
            <p className="mt-1 text-3xl font-extrabold">{stats.descriptive?.stressLevel?.mean}</p>
          </div>
          <div className="mc-glass mc-ring rounded-[1.25rem] p-4 text-white">
            <p className="text-xs text-white/65">Anxiété moyenne</p>
            <p className="mt-1 text-3xl font-extrabold">{stats.descriptive?.anxietyLevel?.mean}</p>
          </div>
          <div className="mc-glass mc-ring rounded-[1.25rem] p-4 text-white">
            <p className="text-xs text-white/65">Sommeil moyen</p>
            <p className="mt-1 text-3xl font-extrabold">{stats.descriptive?.sleepHours?.mean}h</p>
          </div>
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="mc-glass mc-ring h-72 rounded-[1.25rem] p-4 text-white sm:h-80">
          <h2 className="mb-3 font-semibold text-white/90">Corrélation Sommeil vs Stress</h2>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="sleepHours" name="Sommeil" />
              <YAxis dataKey="stressLevel" name="Stress" />
              <Tooltip />
              <Scatter data={rows} fill="#6366f1" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="mc-glass mc-ring h-72 rounded-[1.25rem] p-4 text-white sm:h-80">
          <h2 className="mb-3 font-semibold text-white/90">Distribution du Stress</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stressHistogram}>
              <CartesianGrid />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4338CA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mc-glass mc-ring rounded-[1.25rem] p-4 text-white">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-white/90">Analyses avancées (INF232)</h2>
          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
          >
            {showAdvanced ? "Masquer l'analyse avancée" : "Afficher l'analyse avancée"}
          </button>
        </div>
        {showAdvanced && (
          <pre className="max-h-[28rem] overflow-auto rounded-xl bg-slate-950/80 p-3 text-xs text-green-200 ring-1 ring-white/10">
            {JSON.stringify(stats?.advanced, null, 2)}
          </pre>
        )}
      </section>

      <section className="mc-glass mc-ring rounded-[1.25rem] p-4 text-white">
        <h2 className="mb-3 text-xl font-semibold text-white/90">Réponses brutes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/70">
                <th className="p-2 text-left">#</th><th className="p-2 text-left">Âge</th><th className="p-2 text-left">Genre</th><th className="p-2 text-left">Filière</th><th className="p-2 text-left">Stress</th><th className="p-2 text-left">Anxiété</th><th className="p-2 text-left">Sommeil</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row._id || idx} className="border-b border-white/10">
                  <td className="p-2 font-medium text-white/55">{idx + 1}</td><td className="p-2">{row.age}</td><td className="p-2">{row.gender}</td><td className="p-2">{row.department}</td><td className="p-2">{row.stressLevel}</td><td className="p-2">{row.anxietyLevel}</td><td className="p-2">{row.sleepHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </main>
    </AuroraSurface>
  );
}
