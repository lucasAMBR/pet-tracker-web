import { api } from "@/lib/axios";
import { RegisterFormSchemaType } from "@/schemas/register/RegisterFormSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@/types/User/User";
import { format } from "date-fns";

const registerNewUser = async( 
    userData: RegisterFormSchemaType 
): Promise<ApiResponse<User>> => {
    try{
        const payload = {
            ...userData,
            birthday: format(userData.birthday, "yyyy-MM-dd")
        }
        const response = await api.post("/auth/register", payload);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const authenticationService = {
    registerNewUser
}