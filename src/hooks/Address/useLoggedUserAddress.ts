import { addressService } from "@/services/AddressService";
import { useQuery } from "@tanstack/react-query"

export const useLoggedUserAddress = () => {
    return useQuery({
        queryKey: ['loggedUserAddress'],
        queryFn: addressService.GetLoggedUserAddress
    });
};