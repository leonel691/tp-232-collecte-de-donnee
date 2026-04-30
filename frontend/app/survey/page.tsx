import MultiStepSurveyForm from "@/components/survey/MultiStepSurveyForm";
import AuroraSurface from "@/components/AuroraSurface";

export default function SurveyPage() {
  return (
    <AuroraSurface>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <div className="mc-fade-up">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Enquête Étudiante</h1>
          <p className="mt-2 text-sm text-white/75 sm:text-base">
            Merci pour votre contribution anonyme au bien-être étudiant.
          </p>
        </div>

        <div className="mt-6 mc-pop mc-glass mc-ring rounded-[1.25rem] p-1">
          <MultiStepSurveyForm />
        </div>
      </main>
    </AuroraSurface>
  );
}
