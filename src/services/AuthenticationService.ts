import { api } from "@/lib/axios";
import { LoginFormSchemaType } from "@/schemas/login/LoginFormSchema";
import { RegisterFormSchemaType } from "@/schemas/register/RegisterFormSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { LoginResponse } from "@/types/LoginResponse/LoginResponse";
import { User } from "@/types/User/User";
import { format } from "date-fns";

const registerNewUser = async (
	userData: RegisterFormSchemaType,
): Promise<ApiResponse<User>> => {
	try {
		const payload = {
			...userData,
			birthday: format(userData.birthday, "yyyy-MM-dd"),
		};
		const response = await api.post("/auth/register", payload);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const login = async (
	userCredentials: LoginFormSchemaType,
): Promise<ApiResponse<LoginResponse>> => {
	try {
		const response = await api.post("/auth/login", userCredentials, {
			_skipAuthRedirect: true
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const authenticationService = {
	registerNewUser,
	login,
};
