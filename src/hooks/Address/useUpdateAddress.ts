import { UpdateAddressSchemaType } from "@/schemas/addresses/UpdateAddressSchema"
import { addressService } from "@/services/AddressService"
import { ApiResponse } from "@/types/ApiResponse"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

type UpdateAddressVariables = {
    id: number,
    updateData: UpdateAddressSchemaType
}

type UseUpdateAddressOptions = UseMutationOptions<
    ApiResponse<Address>,
    Error,
    UpdateAddressVariables
>

export const useUpdateAddress = (options?: UseUpdateAddressOptions) => {
    return useMutation({
        mutationFn: async({id, updateData}: UpdateAddressVariables) => {
            return addressService.UpdateAddress(id, updateData);
        }
    })
}