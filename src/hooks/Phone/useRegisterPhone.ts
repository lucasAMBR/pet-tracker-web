import { phoneService } from "@/services/PhoneService"
import { useMutation } from "@tanstack/react-query"

export const useRegisterPhone = () => {
    return useMutation({
        mutationFn: phoneService.RegisterPhone
    });
}