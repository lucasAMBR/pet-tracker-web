import { DiseaseStatusEnum } from "@/types/enums/DiseaseStatusEnum";
import z from "zod";

export const UpdatePetDiseaseSchema = z.object({
    name: z.string("The name must be a string").min(3, "The name must have at least 3 charecters").optional(),
    diagnosis_status: z.enum(DiseaseStatusEnum, "The status must be: Confirmed, Suspected, Resolved or Monitoring").optional(),
    diagnosis_date: z.date().refine(
        (diagnosis_date) => diagnosis_date < new Date()
    ).optional(),
    resolved_date: z.date().optional(),
    clinical_notes: z.string().optional()
})

export type UpdatePetDiseaseSchemaType = z.infer<typeof UpdatePetDiseaseSchema>;

