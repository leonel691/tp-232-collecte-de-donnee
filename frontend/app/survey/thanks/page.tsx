import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-gradient-to-br from-indigo-900 to-emerald-800 p-6 text-white">
      <div className="max-w-xl rounded-2xl bg-white/10 p-8 text-center backdrop-blur">
        <h1 className="text-3xl font-bold">Merci pour votre participation</h1>
        <p className="mt-3 text-slate-100">Votre réponse a été enregistrée de façon anonyme. Vous contribuez à améliorer le bien-être étudiant.</p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-emerald-300 px-5 py-2 font-semibold text-slate-900">Retour à l'accueil</Link>
      </div>
    </main>
  );
}
