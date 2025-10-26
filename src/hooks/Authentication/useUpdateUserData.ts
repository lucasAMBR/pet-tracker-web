import { authenticationService } from "@/services/AuthenticationService";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserData = () => {
	return useMutation({
		mutationFn: authenticationService.updateUserData,
	});
};