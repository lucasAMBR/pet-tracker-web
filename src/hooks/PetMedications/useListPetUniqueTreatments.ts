import { PetMedicationService } from "@/services/PetMedicationService"
import { useQuery } from "@tanstack/react-query"

export const useListPetUniqueTreatments = (
    pet_id: number, 
    index_type: string
) => {
    return useQuery({
        queryKey: ['treatments', 'unique', pet_id, index_type],
        queryFn: () => PetMedicationService.getPetUniqueDoseMedications(pet_id, index_type)
    })
}