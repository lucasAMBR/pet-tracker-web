import { UpdatePetDiseaseSchemaType } from "@/schemas/PetDiseases/UpdatePetDiseaseSchema"

export type diseaseUpdatePayload = {
    disease_id: number,
    new_disease_data: UpdatePetDiseaseSchemaType
}