import { authenticationService } from "@/services/AuthenticationService";
import { useMutation } from "@tanstack/react-query";

export const usePasswordChange = () => {
	return useMutation({
		mutationFn: authenticationService.changePassword,
	});
};
