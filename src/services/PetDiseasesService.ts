import { api } from "@/lib/axios"
import { CreatePetDiseaseSchemaType } from "@/schemas/PetDiseases/CreatePetDiseaseSchema";
import { UpdatePetDiseaseSchemaType } from "@/schemas/PetDiseases/UpdatePetDiseaseSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { diseaseUpdatePayload } from "@/types/payloads/UpdateDiseasePayload";
import { format } from "date-fns";

const createPetDisease = async(disease_data: CreatePetDiseaseSchemaType): Promise<ApiResponse<PetDisease>> => {
    const apiPayload = {
        ...disease_data,
        diagnosis_date: format(disease_data.diagnosis_date as Date, 'yyyy-MM-dd'),
        resolved_date: format(disease_data.resolved_date as Date, 'yyyy-MM-dd'),
    };
    try{
        const response = await api.post('/pet-diseases', apiPayload);

        return response.data;
    }catch (error){
        throw error;
    }
}

const getChronicDiseases = async(pet_id: number): Promise<ApiResponse<PetDisease[]>> => {
    try{
        const response = await api.get(`/pet-diseases/chronic/${pet_id}`);
        
        return response.data;
    } catch(error){
        throw error;
    }
}

const getNormalDiseases = async(pet_id: number): Promise<ApiResponse<PetDisease[]>> => {
    try{
        const response = await api.get(`/pet-diseases/normal/${pet_id}`);
        
        return response.data;
    } catch(error){
        throw error;
    }
}

const updatePetDiseasesById = async({disease_id, new_disease_data}: diseaseUpdatePayload): Promise<ApiResponse<PetDisease>> => {
    const apiPayload = {
        ...new_disease_data,
        diagnosis_date: format(new_disease_data.diagnosis_date as Date, 'yyyy-MM-dd'),
    };
    try{
        const response = await api.patch(`/pet-diseases/${disease_id}`, apiPayload);

        return response.data;
    }catch(error){
        throw error;
    }
}

const deletePetDiseaseById = async(disease_id: number): Promise<ApiResponse<void>> => {
    try{
        const response = await api.delete(`/pet-diseases/${disease_id}`);

        return response.data;
    }catch(error){
        throw error;
    }
}

export const PetDiseasesService = {
    createPetDisease,
    getChronicDiseases,
    getNormalDiseases,
    updatePetDiseasesById,
    deletePetDiseaseById
}

