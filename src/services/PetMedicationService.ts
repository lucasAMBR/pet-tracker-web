import { api } from "@/lib/axios"
import { CreatePetDiseaseSchemaType } from "@/schemas/PetDiseases/CreatePetDiseaseSchema"
import { RegisterPetMedicationsSchemaType } from "@/schemas/petMedications/RegisterPetMedicationsSchema";
import { ApiResponse } from "@/types/ApiResponse";

const registerNewMedication = async(
    medication_data: RegisterPetMedicationsSchemaType
): Promise<ApiResponse<PetMedication>> => {
    try{
        const response = await api.post('/pet-medications', medication_data);

        return response.data
    }catch(error){
        throw error
    }
}

const getPetContinuousMedications = async(
    pet_id: number, 
    index_type: string
): Promise<ApiResponse<PetMedication[]>> => {
    try{
        const response = await api.get(`/pet-medications/continuous/${pet_id}?index_type=${index_type}`);

        return response.data
    }catch(error){
        throw error
    }
}

const getPetPeriodicMedications = async(
    pet_id: number, 
    index_type: string
): Promise<ApiResponse<PetMedication[]>> => {
    try{
        const response = await api.get(`/pet-medications/periodic/${pet_id}?index_type=${index_type}`);

        return response.data
    }catch(error){
        throw error
    }
}

const getPetUniqueDoseMedications = async(
    pet_id: number, 
    index_type: string
): Promise<ApiResponse<PetMedication[]>> => {
    try{
        const response = await api.get(`/pet-medications/unique/${pet_id}?index_type=${index_type}`);

        return response.data
    }catch(error){
        throw error
    }
}

const deletePetMedications = async (
    medication_id: number
):Promise<ApiResponse<void>> => {
    try{
        const response = await api.delete(`/pet-medications/${medication_id}`);
        
        return response.data;
    }catch(error){
        throw error
    }
}

export const PetMedicationService = {
    registerNewMedication,
    getPetContinuousMedications,
    getPetPeriodicMedications,
    getPetUniqueDoseMedications,
    deletePetMedications
}