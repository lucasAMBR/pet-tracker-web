import { phoneService } from "@/services/PhoneService";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePhone = () => {
	return useMutation({
		mutationFn: phoneService.UpdateUserPhones,
	});
};
