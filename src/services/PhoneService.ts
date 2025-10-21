import { api } from "@/lib/axios"
import { RegisterPhoneSchemaType } from "@/schemas/phones/RegisterPhoneSchema"
import { ApiResponse } from "@/types/ApiResponse"

const RegisterPhone = async(
    phoneData: RegisterPhoneSchemaType
): Promise<ApiResponse<Phone>> => {
    try{
        const response = await api.post('/phones', phoneData);
        return response.data;
    }catch (error){
        throw error;
    }
}

export const phoneService = {
    RegisterPhone
}