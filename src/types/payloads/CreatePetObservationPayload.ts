import { CreatePetObservationSchemaType } from "@/schemas/petObservations/CreatePetObservationSchema"

export type CreatePetObservationPayload = {
    pet_id: number,
    observation_data: CreatePetObservationSchemaType
}