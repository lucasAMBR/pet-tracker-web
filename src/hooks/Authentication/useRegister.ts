import { useMutation } from "@tanstack/react-query"
import { authenticationService } from "@/services/AuthenticationService"

export const useRegister = () => {
    return useMutation({
        mutationFn: authenticationService.registerNewUser,
    })
}