import { z } from "zod";

export const surveySchema = z.object({
  age: z.coerce.number().int().min(17).max(40),
  gender: z.enum(["Homme", "Femme", "Préfère ne pas dire"]),
  department: z.enum(["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie", "Économie", "Droit", "Médecine", "Lettres", "Autre"]),
  departmentOther: z.string().optional(),
  studyLevel: z.enum(["L1", "L2", "L3", "Master 1", "Master 2", "Doctorat"]),
  residence: z.enum(["Résidence universitaire", "Chez les parents", "Location privée", "Autre"]),
  residenceOther: z.string().optional(),
  sleepHours: z.coerce.number().min(1).max(12),
  socialMediaHours: z.coerce.number().min(0).max(15),
  sportFrequency: z.enum(["Jamais", "1-2 fois/semaine", "3-4 fois/semaine", "Tous les jours"]),
  studyHours: z.coerce.number().min(0).max(24),
  stressLevel: z.coerce.number().min(1).max(10),
  anxietyLevel: z.coerce.number().min(1).max(10),
  motivationLevel: z.coerce.number().min(1).max(10),
  sleepQuality: z.enum(["Très mauvaise", "Mauvaise", "Moyenne", "Bonne", "Excellente"]),
  lonelinessLevel: z.coerce.number().min(1).max(10),
  negativeThoughtsFrequency: z.enum(["Jamais", "Rarement", "Parfois", "Souvent", "Très souvent"]),
  consultedPsychologist: z.boolean(),
  familySupport: z.coerce.number().min(1).max(10),
  friendsSupport: z.coerce.number().min(1).max(10),
  workloadPerception: z.enum(["Légère", "Modérée", "Lourde", "Très lourde"]),
  semesterAverage: z.coerce.number().min(0).max(20),
  absencesCount: z.coerce.number().int().min(0),
  comment: z.string().max(1000).optional()
}).superRefine((data, ctx) => {
  if (data.department === "Autre" && !data.departmentOther?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["departmentOther"],
      message: "Veuillez préciser votre filière."
    });
  }

  if (data.residence === "Autre" && !data.residenceOther?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["residenceOther"],
      message: "Veuillez préciser votre situation de résidence."
    });
  }
});

export type SurveySchema = z.infer<typeof surveySchema>;
