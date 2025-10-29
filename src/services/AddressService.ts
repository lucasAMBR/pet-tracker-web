import { api } from "@/lib/axios";
import { RegisterAddressSchemaType } from "@/schemas/addresses/RegisterAddressSchema";
import { UpdateAddressSchemaType } from "@/schemas/addresses/UpdateAddressSchema";
import { ApiResponse } from "@/types/ApiResponse";

const RegisterAddress = async (
	addressData: RegisterAddressSchemaType,
): Promise<ApiResponse<Address>> => {
	try {
		const response = await api.post("/addresses", addressData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const GetLoggedUserAddress = async (): Promise<ApiResponse<Address>> => {
	try {
		const response = await api.get("/addresses");
		return response.data;
	} catch (error) {
		throw error;
	}
};

const UpdateAddress = async (
	id: number,
	updateData: UpdateAddressSchemaType,
): Promise<ApiResponse<Address>> => {
	try {
		const response = await api.put(`/addresses/${id}`, updateData);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const addressService = {
	RegisterAddress,
	GetLoggedUserAddress,
	UpdateAddress,
};
