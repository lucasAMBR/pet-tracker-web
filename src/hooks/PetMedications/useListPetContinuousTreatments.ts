import { PetMedicationService } from "@/services/PetMedicationService"
import { useQuery } from "@tanstack/react-query"

export const useListPetContinuousTreatments = (
    pet_id: number, 
    index_type: string
) => {
    return useQuery({
        queryKey: ['treatments', 'continuous', pet_id, index_type],
        queryFn: () => PetMedicationService.getPetContinuousMedications(pet_id, index_type)
    })
}