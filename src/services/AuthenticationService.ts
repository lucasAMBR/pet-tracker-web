import { api } from "@/lib/axios";
import { LoginFormSchemaType } from "@/schemas/login/LoginFormSchema";
import { RegisterFormSchemaType } from "@/schemas/register/RegisterFormSchema";
import { ChangePasswordSchemaType } from "@/schemas/user/ChangePasswordSchema";
import { UpdateUserSchemaType } from "@/schemas/user/UpdateUserSchema";
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

		const formData = new FormData();

		formData.append("name", userData.name);
		formData.append("email", userData.email);
		formData.append("password", userData.password);
		formData.append("cpf", userData.cpf);
		formData.append("birthday", payload.birthday);

		if (userData.image && userData.image.length > 0) {
			formData.append("image", userData.image[0]);
		}

		const response = await api.post("/auth/register", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
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
			_skipAuthRedirect: true,
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

const refetchUserData = async (): Promise<ApiResponse<User>> => {
	try {
		const response = await api.get("/users/me");

		return response.data;
	} catch (error) {
		throw error;
	}
};

const updateUserData = async (
	updateData: UpdateUserSchemaType,
): Promise<ApiResponse<User>> => {
	try {
		const formData = new FormData();

		Object.keys(updateData).forEach((key) => {
			const value = updateData[key as keyof typeof updateData];

			if (key === "image") {
				if (value && (value as FileList).length > 0) {
					formData.append("image", (value as FileList)[0]);
				}
			} else if (value !== undefined && value !== null) {
				formData.append(key, value as string);
			}
		});

		const response = await api.post("/users/update", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

const changePassword = async (
	updatedPassword: ChangePasswordSchemaType,
): Promise<ApiResponse<null>> => {
	try {
		const response = await api.patch("/auth/change-password", updatedPassword);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const authenticationService = {
	registerNewUser,
	login,
	refetchUserData,
	updateUserData,
	changePassword,
};
