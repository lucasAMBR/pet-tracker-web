import z from "zod";

export const PhoneSchema = z.object({
    id: z.int(),
    number: z.string()
        .min(10, "The phone number must have at least 10 characters!")
        .max(11, "The phone number have a maximum lenght of 11")
})

export const UpdatePhoneSchema = z.object({
    phones: z.array(PhoneSchema)
})

export type UpdatePhoneSchemaType = z.infer<typeof UpdatePhoneSchema>;