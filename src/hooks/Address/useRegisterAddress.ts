import { addressService } from "@/services/AddressService";
import { useMutation } from "@tanstack/react-query";

export const useRegisterAddress = () => {
	return useMutation({
		mutationFn: addressService.RegisterAddress,
	});
};
