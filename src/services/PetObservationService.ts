import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/ApiResponse";
import { CreatePetObservationPayload } from "@/types/payloads/CreatePetObservationPayload";
import { UpdatePetObservationPayload } from "@/types/payloads/UpdateObservationPayload";
import { PetObservation } from "@/types/petObservations/PetObservations";

const createPetObservation = async({
    pet_id, 
    observation_data
}: CreatePetObservationPayload): Promise<ApiResponse<PetObservation>> => {
    try{
        const response = await api.post(`/pet-observations/${pet_id}`, observation_data);

        return response.data;
    }catch(error){
        throw error;
    }
}

const getPetObservation = async(
    pet_id: number
): Promise<ApiResponse<PetObservation[]>> => {
    try{
        const response = await api.get(`/pet-observations/${pet_id}`);

        return response.data;
    }catch(error){
        throw error;
    }
}

const deletePetObservation = async(
    observation_id: number
):Promise<ApiResponse<void>> => {
        try{
        const response = await api.delete(`/pet-observations/${observation_id}`);

        return response.data;
    }catch(error){
        throw error;
    }
}

const updatePetObservation = async({
    observation_id, 
    observation_data
}: UpdatePetObservationPayload): Promise<ApiResponse<PetObservation>> => {
    try{
        const response = await api.put(`/pet-observations/${observation_id}`, observation_data);

        return response.data;
    }catch(error){
        throw error;
    }
}

export const PetObservationService = {
    createPetObservation,
    getPetObservation,
    deletePetObservation,
    updatePetObservation
}