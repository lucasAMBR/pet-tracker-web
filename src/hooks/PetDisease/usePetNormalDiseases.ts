import { PetDiseasesService } from "@/services/PetDiseasesService"
import { useQuery } from "@tanstack/react-query"

export const usePetNormalDisease = (pet_id: number) => {
    return useQuery({
        queryKey: ['petDisease', 'normal', pet_id],
        queryFn: () => PetDiseasesService.getNormalDiseases(pet_id),
        enabled: !!pet_id
    })
}