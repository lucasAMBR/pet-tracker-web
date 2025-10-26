import { authenticationService } from "@/services/AuthenticationService";
import { useMutation } from "@tanstack/react-query";

export const useRefetchUserData = () => {
	return useMutation({
		mutationFn: authenticationService.refetchUserData,
	});
};
