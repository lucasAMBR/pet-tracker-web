import { PetService } from "@/services/PetService"
import { useQuery } from "@tanstack/react-query"

export const useUserPetList = () => {
    return useQuery({
        queryKey: ['userPetList'],
        queryFn: PetService.listAllUserPets
    })
}