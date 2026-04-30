import mongoose, { Schema, InferSchemaType } from "mongoose";

const SurveyResponseSchema = new Schema(
  {
    age: { type: Number, required: true, min: 17, max: 40 },
    gender: { type: String, required: true, enum: ["Homme", "Femme", "Préfère ne pas dire"] },
    department: { type: String, required: true },
    departmentOther: { type: String },
    studyLevel: { type: String, required: true, enum: ["L1", "L2", "L3", "Master 1", "Master 2", "Doctorat"] },
    residence: { type: String, required: true, enum: ["Résidence universitaire", "Chez les parents", "Location privée", "Autre"] },
    residenceOther: { type: String },
    sleepHours: { type: Number, required: true, min: 1, max: 12 },
    socialMediaHours: { type: Number, required: true, min: 0, max: 15 },
    sportFrequency: { type: String, required: true, enum: ["Jamais", "1-2 fois/semaine", "3-4 fois/semaine", "Tous les jours"] },
    studyHours: { type: Number, required: true, min: 0, max: 24 },
    stressLevel: { type: Number, required: true, min: 1, max: 10 },
    anxietyLevel: { type: Number, required: true, min: 1, max: 10 },
    motivationLevel: { type: Number, required: true, min: 1, max: 10 },
    sleepQuality: { type: String, required: true, enum: ["Très mauvaise", "Mauvaise", "Moyenne", "Bonne", "Excellente"] },
    lonelinessLevel: { type: Number, required: true, min: 1, max: 10 },
    negativeThoughtsFrequency: { type: String, required: true, enum: ["Jamais", "Rarement", "Parfois", "Souvent", "Très souvent"] },
    consultedPsychologist: { type: Boolean, required: true },
    familySupport: { type: Number, required: true, min: 1, max: 10 },
    friendsSupport: { type: Number, required: true, min: 1, max: 10 },
    workloadPerception: { type: String, required: true, enum: ["Légère", "Modérée", "Lourde", "Très lourde"] },
    semesterAverage: { type: Number, required: true, min: 0, max: 20 },
    absencesCount: { type: Number, required: true, min: 0 },
    comment: { type: String, default: "" }
  },
  { timestamps: true }
);

export type SurveyResponse = InferSchemaType<typeof SurveyResponseSchema>;
export const SurveyResponseModel = mongoose.model("SurveyResponse", SurveyResponseSchema);
