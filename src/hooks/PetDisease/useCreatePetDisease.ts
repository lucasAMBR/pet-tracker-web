import { PetDiseasesService } from "@/services/PetDiseasesService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreatePetDisease = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetDiseasesService.createPetDisease,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['petDisease']})
        }
    })
}