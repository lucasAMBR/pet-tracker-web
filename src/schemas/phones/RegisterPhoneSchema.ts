import z from "zod";

export const RegisterPhoneSchema = z.object({
    number: z.string()
        .min(10, "The phone number must have at least 10 characters!")
        .max(11, "The phone number have a maximum lenght of 11")
})

export type RegisterPhoneSchemaType = z.infer<typeof RegisterPhoneSchema>;