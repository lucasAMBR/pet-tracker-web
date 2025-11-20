import { PetMedicationService } from "@/services/PetMedicationService"
import { useQuery } from "@tanstack/react-query"

export const useListPetPeriodicTreatments = (
    pet_id: number, 
    index_type: string
) => {
    return useQuery({
        queryKey: ['treatments', 'periodic', pet_id, index_type],
        queryFn: () => PetMedicationService.getPetPeriodicMedications(pet_id, index_type)
    })
}