import { api } from "@/lib/axios";
import { RegisterPhoneSchemaType } from "@/schemas/phones/RegisterPhoneSchema";
import { UpdatePhoneSchemaType } from "@/schemas/phones/UpdatePhoneSchema";
import { ApiResponse } from "@/types/ApiResponse";

const RegisterPhone = async (
	phoneData: RegisterPhoneSchemaType,
): Promise<ApiResponse<Phone>> => {
	try {
		const response = await api.post("/phones", phoneData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const GetLoggedUserPhone = async (): Promise<ApiResponse<Phone[]>> => {
	try {
		const response = await api.get("/phones");
		return response.data;
	} catch (error) {
		throw error;
	}
};

const UpdateUserPhones = async (phoneList: UpdatePhoneSchemaType) => {
	try {
		const response = await api.put("/phones/update-phones", phoneList);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const phoneService = {
	RegisterPhone,
	GetLoggedUserPhone,
	UpdateUserPhones,
};
