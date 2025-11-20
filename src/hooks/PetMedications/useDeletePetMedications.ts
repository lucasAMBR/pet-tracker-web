import { PetMedicationService } from "@/services/PetMedicationService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useDeletePetMedications = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetMedicationService.deletePetMedications,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['treatments']});
        }
    })
}