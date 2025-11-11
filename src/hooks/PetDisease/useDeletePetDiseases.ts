import { PetDiseasesService } from "@/services/PetDiseasesService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeletePetDisease = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetDiseasesService.deletePetDiseaseById,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['petDisease']})
        }
    })
}