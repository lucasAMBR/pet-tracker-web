import { DiseaseStatusEnum } from "@/types/enums/DiseaseStatusEnum";
import z from "zod";

export const CreatePetDiseaseSchema = z.object({
    pet_id: z.number().min(1),
    name: z.string("Name must be a string").min(3, "The name must have at least 3 characters"),
    diagnosis_status: z.enum(DiseaseStatusEnum, "The status must be: Confirmed, Suspected, Resolved or Monitoring"),
    diagnosis_date: z.date(),
    resolved_date:z.date().optional(),
    clinical_notes: z.string().optional(),
    is_chronic: z.boolean()
})

export type CreatePetDiseaseSchemaType = z.infer<typeof CreatePetDiseaseSchema>;
