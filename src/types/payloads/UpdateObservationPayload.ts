import { CreatePetObservationSchemaType } from "@/schemas/petObservations/CreatePetObservationSchema"

export type UpdatePetObservationPayload = {
    observation_id: number,
    observation_data: CreatePetObservationSchemaType
}