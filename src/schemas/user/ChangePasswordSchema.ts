import z from "zod";

export const ChangePasswordSchema = z.object({
	old_password: z
		.string()
		.min(8, "The password must have at least 8 characters"),
	new_password: z
		.string()
		.min(8, "The new password must have at least 8 characters"),
	new_password_confirmation: z
		.string()
		.min(8, "The password must have at least 8 characters"),
});

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
