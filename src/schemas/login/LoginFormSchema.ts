import z, { email, string } from "zod";

export const LoginFormSchema = z.object({
    email: email(),
    password: string().min(8, "The password must have at least 8 characters")
})

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;