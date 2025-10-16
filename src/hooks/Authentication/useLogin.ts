import { authenticationService } from "@/services/AuthenticationService"
import { useMutation } from "@tanstack/react-query"

export const useLogin = () => {
    return useMutation({
        mutationFn: authenticationService.login
    })
}