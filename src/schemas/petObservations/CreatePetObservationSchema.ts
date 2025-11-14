import z from "zod";

export const CreatePetObservationSchema = z.object({
    description: z.string('description must be a string')
        .min(3, "Description must have at least 3 characters")
        .max(1000, "The maximum descrition length is 500 characters")
})

export type CreatePetObservationSchemaType = z.infer<typeof CreatePetObservationSchema>;