import { PetDiseasesService } from "@/services/PetDiseasesService"
import { useQuery } from "@tanstack/react-query"

export const usePetChronicDiseases = (petId: number) => {
    return useQuery({
        queryKey: ['petDisease', petId],
        queryFn: ()  => PetDiseasesService.getChronicDiseases(petId),
        enabled: !!petId
    })
}