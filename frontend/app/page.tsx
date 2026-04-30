import Link from "next/link";
import { getStats } from "@/lib/api";
import AuroraSurface from "@/components/AuroraSurface";

export default async function HomePage() {
  let total = 0;
  try {
    const stats = await getStats();
    total = stats.totalResponses ?? 0;
  } catch {
    total = 0;
  }

  return (
    <AuroraSurface className="text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-14 sm:px-6 sm:py-18">
        <div className="mc-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            Enquête anonyme - Santé mentale étudiante
          </div>
        </div>

        <div className="mt-6 grid flex-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 className="mc-fade-up text-4xl font-extrabold tracking-tight sm:text-5xl">
              MindCampus
              <span className="block bg-gradient-to-r from-emerald-200 via-indigo-200 to-violet-200 bg-clip-text text-transparent">
                Comprendre, sans juger.
              </span>
            </h1>
            <p className="mc-fade-up mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              Une collecte douce et anonyme pour mieux analyser le stress, le sommeil et le soutien social des étudiants.
            </p>

            <div className="mc-fade-up mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/survey"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-300/20 transition hover:-translate-y-0.5 hover:bg-emerald-200 active:translate-y-0 sm:text-base"
              >
                Participer à l&apos;enquête
                <span className="transition group-hover:translate-x-0.5">→</span>
              </Link>
              <div className="rounded-2xl bg-white/5 px-4 py-3 text-xs text-white/75 ring-1 ring-white/10 sm:text-sm">
                Durée estimée : <span className="font-semibold text-white/90">2-3 minutes</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="mc-pop mc-glass mc-ring rounded-[1.25rem] p-5 sm:p-6">
              <p className="text-xs text-white/70">Participants enregistrés</p>
              <div className="mt-2 flex items-end gap-3">
                <p className="text-5xl font-extrabold leading-none">{total}</p>
                <p className="pb-1 text-sm text-white/70">réponses</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-white/75">
                <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-white/60">Stress</p>
                  <p className="mt-1 font-semibold text-white/90">1-10</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-white/60">Sommeil</p>
                  <p className="mt-1 font-semibold text-white/90">heures</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-white/60">Soutien</p>
                  <p className="mt-1 font-semibold text-white/90">1-10</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-white/60">
                Aucune donnée personnelle identifiable n&apos;est collectée.
              </p>
            </div>
          </div>
        </div>
      </main>
    </AuroraSurface>
  );
}
