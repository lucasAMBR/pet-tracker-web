import { PetService } from "@/services/PetService"
import { useMutation } from "@tanstack/react-query"

export const useRegisterPet = () => {
    return useMutation({
        mutationFn: PetService.registerNewPet   
    })
}