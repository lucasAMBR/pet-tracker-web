import { PetObservationService } from "@/services/PetObservationService"
import { useQuery } from "@tanstack/react-query"

export const usePetObservations = (petId: number) => {
    return useQuery({
        queryKey: ['petObservation', petId],
        queryFn: ()  => PetObservationService.getPetObservation(petId),
        enabled: !!petId
    })
}