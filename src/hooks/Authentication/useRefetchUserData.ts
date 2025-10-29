import { authenticationService } from "@/services/AuthenticationService";
import { useQuery } from "@tanstack/react-query";

export const useLoggedUserProfile = () => {
	return useQuery({
		queryKey: ["loggedUserProfile"],
		queryFn: authenticationService.refetchUserData,
	});
};
