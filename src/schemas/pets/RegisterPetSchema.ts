import { SexEnum } from "@/types/enums/SexEnum";
import { SizeEnum } from "@/types/enums/SizeEnum";
import { SpeciesEnum } from "@/types/enums/specieEnum";
import z from "zod";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 2MB em bytes

const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];


export const RegisterPetSchema = z.object({
    name: z.string("Name must be a string")
        .min(2, "The name must have at least two characters")
        .max(100, "The name have a maximum limit of 100 characters"),
    specie_id: z
        .number(),
    sex: z.enum(SexEnum, "The sex must be male or female"),
    breed: z.string("Breed must be a string")
        .min(3, "The pet breed must have at least 3 characters")
        .max(50, "The pet breed had a maximum limit of 50 chracters"),
    size: z.enum(SizeEnum, "The size must be: Small, Medium ou Large"),
    weight: z.number("The pet weight must be a number").positive(),
    color: z.string("Color must be a string")
        .min(3, "The pet color must have at least 3 characters")
        .max(100, "The color field had a limit of 100 characters"),
    birthday: z.date(),
    image: z
            .instanceof(FileList)
            .refine((files) => {
                if (files.length === 0) return true;
    
                return files[0]?.size <= MAX_FILE_SIZE_BYTES;
            }, `The pet pic have a maximum size of ${MAX_FILE_SIZE_MB}MB`)
            .refine((files) => {
                if (files.length === 0) return true;
    
                return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
            }, "Please insert a valid image format: PNG, JPG ou WEBP"),
    is_neutred: z.boolean()
});

export type RegisterPetSchemaType = z.infer<typeof RegisterPetSchema>