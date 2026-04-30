"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema, type SurveySchema } from "@/lib/validation";
import { submitSurvey } from "@/lib/api";
import { useRouter } from "next/navigation";
import type { Path } from "react-hook-form";

const steps = ["Informations générales", "Habitudes de vie", "Santé mentale", "Support & Performance"];

const defaults: SurveySchema = {
  age: 20,
  gender: "Préfère ne pas dire",
  department: "Informatique",
  departmentOther: "",
  studyLevel: "L1",
  residence: "Résidence universitaire",
  residenceOther: "",
  sleepHours: 7,
  socialMediaHours: 3,
  sportFrequency: "1-2 fois/semaine",
  studyHours: 2,
  stressLevel: 5,
  anxietyLevel: 5,
  motivationLevel: 5,
  sleepQuality: "Moyenne",
  lonelinessLevel: 5,
  negativeThoughtsFrequency: "Parfois",
  consultedPsychologist: false,
  familySupport: 6,
  friendsSupport: 6,
  workloadPerception: "Modérée",
  semesterAverage: 12,
  absencesCount: 0,
  comment: ""
};

const stepFields: Path<SurveySchema>[][] = [
  ["age", "gender", "department", "departmentOther", "studyLevel", "residence", "residenceOther"],
  ["sleepHours", "socialMediaHours", "sportFrequency", "studyHours"],
  ["stressLevel", "anxietyLevel", "motivationLevel", "sleepQuality", "lonelinessLevel", "negativeThoughtsFrequency"],
  ["consultedPsychologist", "familySupport", "friendsSupport", "workloadPerception", "semesterAverage", "absencesCount", "comment"]
];

type Option = { label: string; value: string };

function ChoiceCards({
  label,
  options,
  value,
  onChange,
  columns = "md:grid-cols-2"
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (next: string) => void;
  columns?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <div className={`grid grid-cols-1 gap-3 ${columns}`}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                selected
                  ? "scale-[1.01] border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md"
                  : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-sm"
              }`}
            >
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="space-y-2 rounded-xl border border-slate-200 p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-indigo-700">{value}/10</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </label>
  );
}

export default function MultiStepSurveyForm() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const form = useForm<SurveySchema>({ resolver: zodResolver(surveySchema), defaultValues: defaults });
  const isLast = useMemo(() => step === steps.length - 1, [step]);
  const selectedDepartment = form.watch("department");
  const selectedResidence = form.watch("residence");

  const next = async () => {
    const ok = await form.trigger(stepFields[step]);
    if (!ok) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = form.handleSubmit(async (values) => {
    await submitSurvey(values);
    router.push("/survey/thanks");
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6 rounded-[1.2rem] bg-white/85 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur sm:p-7">
      <div className="h-2 w-full rounded bg-slate-100/80">
        <div
          className="h-2 rounded bg-gradient-to-r from-indigo-500 via-emerald-400 to-violet-500 transition-all"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-700">
          Étape <span className="font-semibold">{step + 1}</span> / {steps.length} - {steps[step]}
        </p>
        <div className="hidden gap-1 sm:flex">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full transition ${
                i <= step ? "bg-slate-900/70" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div key={step} className="mc-fade-up">
        {step === 0 && (
          <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Âge</p>
            <input
              type="number"
              {...form.register("age", { valueAsNumber: true })}
              className="w-full rounded-xl border border-slate-200 p-3"
              placeholder="Ex: 20 ans"
            />
          </div>

          <ChoiceCards
            label="Genre"
            value={form.watch("gender")}
            onChange={(value) => form.setValue("gender", value as SurveySchema["gender"], { shouldValidate: true })}
            options={[{ label: "Homme", value: "Homme" }, { label: "Femme", value: "Femme" }, { label: "Préfère ne pas dire", value: "Préfère ne pas dire" }]}
          />

          <ChoiceCards
            label="Filière"
            value={selectedDepartment}
            onChange={(value) => form.setValue("department", value as SurveySchema["department"], { shouldValidate: true })}
            options={[
              { label: "Informatique", value: "Informatique" },
              { label: "Mathématiques", value: "Mathématiques" },
              { label: "Physique", value: "Physique" },
              { label: "Chimie", value: "Chimie" },
              { label: "Biologie", value: "Biologie" },
              { label: "Économie", value: "Économie" },
              { label: "Droit", value: "Droit" },
              { label: "Médecine", value: "Médecine" },
              { label: "Lettres", value: "Lettres" },
              { label: "Autre", value: "Autre" }
            ]}
            columns="md:grid-cols-3"
          />

          {selectedDepartment === "Autre" && (
            <input
              type="text"
              {...form.register("departmentOther")}
              className="w-full rounded-xl border border-slate-200 p-3"
              placeholder="Précisez votre filière"
            />
          )}

          <ChoiceCards
            label="Niveau d'études"
            value={form.watch("studyLevel")}
            onChange={(value) => form.setValue("studyLevel", value as SurveySchema["studyLevel"], { shouldValidate: true })}
            options={[{ label: "L1", value: "L1" }, { label: "L2", value: "L2" }, { label: "L3", value: "L3" }, { label: "Master 1", value: "Master 1" }, { label: "Master 2", value: "Master 2" }, { label: "Doctorat", value: "Doctorat" }]}
            columns="md:grid-cols-3"
          />

          <ChoiceCards
            label="Situation de résidence"
            value={form.watch("residence")}
            onChange={(value) => form.setValue("residence", value as SurveySchema["residence"], { shouldValidate: true })}
            options={[
              { label: "Résidence universitaire", value: "Résidence universitaire" },
              { label: "Chez les parents", value: "Chez les parents" },
              { label: "Location privée", value: "Location privée" },
              { label: "Autre", value: "Autre" }
            ]}
          />

          {selectedResidence === "Autre" && (
            <input
              type="text"
              {...form.register("residenceOther")}
              className="w-full rounded-xl border border-slate-200 p-3"
              placeholder="Précisez votre situation de résidence"
            />
          )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Heures de sommeil par nuit</span>
              <input
                type="number"
                step="0.1"
                {...form.register("sleepHours", { valueAsNumber: true })}
                className="w-full rounded-xl border border-slate-200 p-3"
                placeholder="Ex: 7.5 h / nuit"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Heures sur les réseaux sociaux par jour</span>
              <input
                type="number"
                step="0.1"
                {...form.register("socialMediaHours", { valueAsNumber: true })}
                className="w-full rounded-xl border border-slate-200 p-3"
                placeholder="Ex: 3 h / jour"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Temps d'étude personnel par jour</span>
              <input
                type="number"
                step="0.1"
                {...form.register("studyHours", { valueAsNumber: true })}
                className="w-full rounded-xl border border-slate-200 p-3"
                placeholder="Ex: 2 h / jour"
              />
            </label>
          </div>

          <ChoiceCards
            label="Fréquence sportive"
            value={form.watch("sportFrequency")}
            onChange={(value) => form.setValue("sportFrequency", value as SurveySchema["sportFrequency"], { shouldValidate: true })}
            options={[
              { label: "Jamais", value: "Jamais" },
              { label: "1-2 fois/semaine", value: "1-2 fois/semaine" },
              { label: "3-4 fois/semaine", value: "3-4 fois/semaine" },
              { label: "Tous les jours", value: "Tous les jours" }
            ]}
          />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SliderField label="Niveau de stress" value={form.watch("stressLevel")} onChange={(n) => form.setValue("stressLevel", n, { shouldValidate: true })} />
            <SliderField label="Niveau d'anxiété" value={form.watch("anxietyLevel")} onChange={(n) => form.setValue("anxietyLevel", n, { shouldValidate: true })} />
            <SliderField label="Niveau de motivation" value={form.watch("motivationLevel")} onChange={(n) => form.setValue("motivationLevel", n, { shouldValidate: true })} />
            <SliderField label="Sentiment de solitude" value={form.watch("lonelinessLevel")} onChange={(n) => form.setValue("lonelinessLevel", n, { shouldValidate: true })} />
          </div>

          <ChoiceCards
            label="Qualité du sommeil"
            value={form.watch("sleepQuality")}
            onChange={(value) => form.setValue("sleepQuality", value as SurveySchema["sleepQuality"], { shouldValidate: true })}
            options={[
              { label: "Très mauvaise", value: "Très mauvaise" },
              { label: "Mauvaise", value: "Mauvaise" },
              { label: "Moyenne", value: "Moyenne" },
              { label: "Bonne", value: "Bonne" },
              { label: "Excellente", value: "Excellente" }
            ]}
          />

          <ChoiceCards
            label="Fréquence des pensées négatives"
            value={form.watch("negativeThoughtsFrequency")}
            onChange={(value) => form.setValue("negativeThoughtsFrequency", value as SurveySchema["negativeThoughtsFrequency"], { shouldValidate: true })}
            options={[
              { label: "Jamais", value: "Jamais" },
              { label: "Rarement", value: "Rarement" },
              { label: "Parfois", value: "Parfois" },
              { label: "Souvent", value: "Souvent" },
              { label: "Très souvent", value: "Très souvent" }
            ]}
          />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
          <ChoiceCards
            label="Avez-vous déjà consulté un psychologue ?"
            value={String(form.watch("consultedPsychologist"))}
            onChange={(value) => form.setValue("consultedPsychologist", value === "true", { shouldValidate: true })}
            options={[{ label: "Oui", value: "true" }, { label: "Non", value: "false" }]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <SliderField
              label="Niveau de soutien familial"
              value={form.watch("familySupport")}
              onChange={(n) => form.setValue("familySupport", n, { shouldValidate: true })}
            />
            <SliderField
              label="Niveau de soutien des amis"
              value={form.watch("friendsSupport")}
              onChange={(n) => form.setValue("friendsSupport", n, { shouldValidate: true })}
            />
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Moyenne générale du dernier semestre (sur 20)</span>
              <input
                type="number"
                step="0.01"
                {...form.register("semesterAverage", { valueAsNumber: true })}
                className="w-full rounded-xl border border-slate-200 p-3"
                placeholder="Ex: 13.75 / 20"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Nombre d'absences ce semestre</span>
              <input
                type="number"
                {...form.register("absencesCount", { valueAsNumber: true })}
                className="w-full rounded-xl border border-slate-200 p-3"
                placeholder="Ex: 2 absences"
              />
            </label>
          </div>

          <ChoiceCards
            label="Perception de la charge de travail"
            value={form.watch("workloadPerception")}
            onChange={(value) => form.setValue("workloadPerception", value as SurveySchema["workloadPerception"], { shouldValidate: true })}
            options={[
              { label: "Légère", value: "Légère" },
              { label: "Modérée", value: "Modérée" },
              { label: "Lourde", value: "Lourde" },
              { label: "Très lourde", value: "Très lourde" }
            ]}
          />

          <textarea {...form.register("comment")} className="w-full rounded-xl border border-slate-200 p-3" placeholder="Commentaire (optionnel)" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 sm:text-base"
        >
          Retour
        </button>
        {!isLast ? (
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-500 active:translate-y-0 sm:text-base"
          >
            Suivant
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={form.formState.isSubmitting}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-0 disabled:opacity-70 sm:text-base"
          >
            {form.formState.isSubmitting ? "Envoi..." : "Soumettre"}
          </button>
        )}
      </div>
    </form>
  );
}
