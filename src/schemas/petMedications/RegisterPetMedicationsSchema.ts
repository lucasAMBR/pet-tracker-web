import { medicationTypeEnum } from "@/types/enums/MedicationTypeEnum";
import { TreatmentTypeEnum } from "@/types/enums/TreatmentTypeEnum";
import { Description } from "@radix-ui/react-dialog";
import z from "zod";

export const RegisterPetMedicationsSchema = z.object({
    pet_id: z.number("Pet identifier must be a number"),
    name: z.string("Medication name must be a string")
        .min(2, "The medication name must have at least 2 characters")
        .max(255, "Name maximum value is 255 characters"),
    start_date: z.date(),
    type: z.enum(medicationTypeEnum, 'The medication type value must be in the especified list'),
    treatment_type: z.enum(TreatmentTypeEnum, "The Treatment type be one of those on the list"),
    end_date: z.preprocess(
        (value) => {
            if (value === "" || value === null) return undefined;
                return value;
            },
                z.date().optional()
            ),
    dosage_form: z.string(),
    dosing_interval: z.number().positive().int().optional(),
    interval_unit: z.enum(['hours', 'minutes'], 'The interval unit value must be in the especified list').optional(),
    description: z.string().optional()
}).refine((data) => {
    const typesToRequiredDate = ['periodic', 'unique'];

    if(typesToRequiredDate.includes(data.treatment_type) && !data.end_date){
        return false;
    }

    return true
}, {
    message: "End date is required for periodic or unique treatments",
    path: ["end_date"],
});

export type RegisterPetMedicationsSchemaType = z.infer<typeof RegisterPetMedicationsSchema>;