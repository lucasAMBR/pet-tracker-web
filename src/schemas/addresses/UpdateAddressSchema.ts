import z from "zod";

export const UpdateAddressSchema = z.object({
	cep: z
		.string()
		.min(8, "The CEP value must have at least 8 characters")
		.max(9, "The CEP value has a maximum value of 9 characters"),
	street: z.string().min(1, "Street is required"),
	district: z.string().min(1, "District is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	number: z.string().min(1, "Number is required"),
	complement: z.string().optional(),
});

export type UpdateAddressSchemaType = z.infer<typeof UpdateAddressSchema>;
