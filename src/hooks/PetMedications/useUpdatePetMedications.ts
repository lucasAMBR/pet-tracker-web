import { PetMedicationService } from "@/services/PetMedicationService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useUpdatePetMedications = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PetMedicationService.updatePetMedications,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['treatments']});
        }
    })
}