import { User } from "@/types/User/User";

export type LoginResponse = {
	user: User;
	token: string;
};
