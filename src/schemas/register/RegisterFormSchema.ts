import { z } from "zod";

export const RegisterFormSchema = z.object({
	name: z
		.string()
		.min(3, "The name field must have at least 3 characters")
		.max(100, "The name field must have a maximum of 100 characters"),
	email: z.email(),
	cpf: z
		.string()
		.min(11, "The cpf field must have at least 11 characters")
		.max(14, "The cpf field must have a maximum of 14 characters"),
	password: z.string().min(8, "The password must have at least 8 characters"),
	birthday: z.date(),
	terms: z.literal(
		true,
		"You must accept the terms and conditions to continue",
	),
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;
