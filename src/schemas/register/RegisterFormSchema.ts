import { z } from "zod";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 2MB em bytes

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
	image: z
		.instanceof(FileList)
		.refine((files) => {
			if (files.length === 0) return true; 
			
	        return files[0]?.size <= MAX_FILE_SIZE_BYTES;
		}, 
		`The profile pic have a maximum size of ${MAX_FILE_SIZE_MB}MB`
		)
		.refine((files) => {
			if(files.length === 0) return true;
			
			return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
		},
		"Please insert a valid image format: PNG, JPG ou WEBP"
	)
});

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;
