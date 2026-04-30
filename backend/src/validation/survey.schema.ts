import { z } from "zod";

export const surveySchema = z.object({
  age: z.number().int().min(17).max(40),
  gender: z.enum(["Homme", "Femme", "Préfère ne pas dire"]),
  department: z.enum(["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie", "Économie", "Droit", "Médecine", "Lettres", "Autre"]),
  departmentOther: z.string().optional(),
  studyLevel: z.enum(["L1", "L2", "L3", "Master 1", "Master 2", "Doctorat"]),
  residence: z.enum(["Résidence universitaire", "Chez les parents", "Location privée", "Autre"]),
  residenceOther: z.string().optional(),
  sleepHours: z.number().min(1).max(12),
  socialMediaHours: z.number().min(0).max(15),
  sportFrequency: z.enum(["Jamais", "1-2 fois/semaine", "3-4 fois/semaine", "Tous les jours"]),
  studyHours: z.number().min(0).max(24),
  stressLevel: z.number().min(1).max(10),
  anxietyLevel: z.number().min(1).max(10),
  motivationLevel: z.number().min(1).max(10),
  sleepQuality: z.enum(["Très mauvaise", "Mauvaise", "Moyenne", "Bonne", "Excellente"]),
  lonelinessLevel: z.number().min(1).max(10),
  negativeThoughtsFrequency: z.enum(["Jamais", "Rarement", "Parfois", "Souvent", "Très souvent"]),
  consultedPsychologist: z.boolean(),
  familySupport: z.number().min(1).max(10),
  friendsSupport: z.number().min(1).max(10),
  workloadPerception: z.enum(["Légère", "Modérée", "Lourde", "Très lourde"]),
  semesterAverage: z.number().min(0).max(20),
  absencesCount: z.number().int().min(0),
  comment: z.string().max(1000).optional()
}).superRefine((data, ctx) => {
  if (data.department === "Autre" && !data.departmentOther?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["departmentOther"],
      message: "Veuillez préciser la filière."
    });
  }

  if (data.residence === "Autre" && !data.residenceOther?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["residenceOther"],
      message: "Veuillez préciser la résidence."
    });
  }
});

export type SurveyPayload = z.infer<typeof surveySchema>;
