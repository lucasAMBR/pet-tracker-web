import { phoneService } from "@/services/PhoneService";
import { useQuery } from "@tanstack/react-query";

export const useLoggedUserPhones = () => {
	return useQuery({
		queryKey: ["loggedUserPhones"],
		queryFn: phoneService.GetLoggedUserPhone,
	});
};
