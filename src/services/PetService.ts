import { api } from "@/lib/axios";
import { RegisterPetSchemaType } from "@/schemas/pets/RegisterPetSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { Pet } from "@/types/Pets/Pet";
import { format } from "date-fns";

const registerNewPet = async(
    petData: RegisterPetSchemaType
): Promise<ApiResponse<Pet>> => {
    try{
        const payload = {
            ...petData,
            birthday: format(petData.birthday, "yyyy-MM-dd"),
        };

        const formData = new FormData();

        formData.append("name", petData.name);
        formData.append("specie_id", petData.specie_id.toString());
        formData.append("sex", petData.sex);
        formData.append("breed", petData.breed);
        formData.append("size", petData.size);
        formData.append("weight", petData.weight.toString());
        formData.append("color", petData.color);
        formData.append("birthday", payload.birthday);
        formData.append("is_neutred", petData.is_neutred ? "1" : "0");
        formData.append("status", "safe");

        if (petData.image && petData.image.length > 0) {
            formData.append("image", petData.image[0]);
        }

        const response = await api.post("/pets", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }catch (error){
        throw error;
    }
}

const listAllUserPets = async(): Promise<ApiResponse<Pet[]>> => {
    try{
        const response = api.get("/pets");
        return (await response).data
    }catch(error){
        throw error;
    }
}

const showPetDetailsByPetId = async(petId: number): Promise<ApiResponse<Pet>> => {
    try{
        const response = await api.get(`/pets/${petId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

const showPetDetailsByCollarId = async(collarId: string): Promise<ApiResponse<Pet>> => {
    try{
        const response = await api.get(`/collars/${collarId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const PetService = {
    registerNewPet,
    listAllUserPets,
    showPetDetailsByCollarId,
    showPetDetailsByPetId
}